/** @format */

import React from "react";
import { useHistory } from "react-router-dom";

import styleCSS from "./style";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import AppBarComponent from "../../components/appBar";
import TableUser from "../../components/tableUser";
import SnackbarComponent from "../../components/snackbar";

import { showAllTicketsAPI, updateTicketAPI } from "../../API/ticket";

function createData(
  id,
  ticket_name,
  ticket_requested_user,
  created_at,
  user_name
) {
  return { id, ticket_name, ticket_requested_user, created_at, user_name };
}

function UserHome() {
  const classes = styleCSS();
  let history = useHistory();
	const [tickets, setTickets] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      { title: "Nombre del ticket", field: "ticket_name" },
      { title: "Ticket pedido por", field: "ticket_requested_user" },
      { title: "Fecha", field: "created_at", type: "date" },
      {
        title: "Ticket asignado a",
        field: "user_name",
      },
    ],
    data: [],
  });
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorSnackbar, setErrorSnackbar] = React.useState(false);
  const [msgSnackbar, setMsgSnackbar] = React.useState(null);

  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };

  const handleOpenBackDrop = () => {
    setOpenBackDrop(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const data = [];

  const actions = [
    {
      icon: () => <PersonAddIcon />,
      tooltip: "Solicitar ticket",
      onClick: (event, rowData) => {
        if (rowData.user_name === "No asignado") {
          if (rowData.ticket_requested_user.length === 1) {
            handleOpenBackDrop();
            ticketRequest(rowData.id);
          } else {
            setMsgSnackbar("Ya has solicitado el ticket");
            setErrorSnackbar(true);
            setOpenSnackbar(true);
          }
        } else {
          setMsgSnackbar("El ticket ya se encuentra asignado");
          setErrorSnackbar(true);
          setOpenSnackbar(true);
        }
      },
    },
  ];

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))._role.name === "USER") {
      async function getAllTickets() {
        try {
          const token = localStorage.getItem("token");
          const response = await showAllTicketsAPI(token);
          if (response.success) {
            response.data.tickets.map((key) => {
              return data.push(
                createData(
                  key._id,
                  key.name,
                  key._ticketRequestedUser === null
                    ? "-"
                    : key._ticketRequestedUser.name,
                  key.createdAt,
                  key._user === null ? "No asignado" : key._user.name
                )
              );
            });
          }
          setState({ ...state, data });
          setTickets(true);
        } catch (error) {
          console.log(error);
        }
      }

      if (!tickets) getAllTickets();
    } else {
      history.push("/admin");
    }
  }, [data, history, state, tickets]);

  async function ticketRequest(ticketId) {
    try {
      const token = localStorage.getItem("token");
      const response = await updateTicketAPI(token, ticketId, null);
      if (response.success) {
        let found = state.data.find((el) => el.id === response.data._id);
        found.ticket_requested_user = JSON.parse(
          localStorage.getItem("user")
        ).name;
        setMsgSnackbar("Haz solicitado el ticket exitosamente");
        setErrorSnackbar(false);
        setOpenSnackbar(true);
      } else {
        switch (response.code) {
          case 41:
            setMsgSnackbar("Acceso no autorizado");
            break;
          case 102:
            setMsgSnackbar("Error en la conexión al server");
            break;
          default:
            setMsgSnackbar("Error en el server");
            break;
        }
        setErrorSnackbar(true);
        setOpenSnackbar(true);
      }
      handleCloseBackDrop();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AppBarComponent />
      <Container className={classes.root} maxWidth="xl" disableGutters>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.main}
        >
          <Grid item xs={10}>
            {!tickets ? (
              <>
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
              </>
            ) : (
              <TableUser actions={actions} state={state} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackbarComponent
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        msgSnackbar={msgSnackbar}
        errorSnackbar={errorSnackbar}
      />
    </>
  );
}

export default UserHome;
