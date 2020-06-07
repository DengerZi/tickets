/** @format */

import React from "react";
import { useHistory } from "react-router-dom";

import styleCSS from "./style";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import AppBarComponent from "../../components/appBar";
import TableAdmin from "../../components/tableAdmin";
import SnackbarComponent from "../../components/snackbar";

import { getUsersAPI } from "../../API/user";
import {
	showAllTicketsAPI,
	storeTicketAPI,
	updateTicketAPI,
	deleteTicketAPI,
} from "../../API/ticket";

function createData(
	id,
	ticket_name,
	ticket_requested_user,
	created_at,
	user_name,
) {
	return { id, ticket_name, ticket_requested_user, created_at, user_name };
}

function AdminHome() {
	const classes = styleCSS();
	let history = useHistory();
	const [users, setUsers] = React.useState(false);
	const [tickets, setTickets] = React.useState(false);
	const [state, setState] = React.useState({
		columns: [
			{ title: "Nombre del ticket", field: "ticket_name" },
			{
				title: "Ticket pedido por",
				field: "ticket_requested_user",
				editable: "never",
			},
			{ title: "Fecha", field: "created_at", type: "date", editable: "never" },
		],
		data: [],
	});
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [errorSnackbar, setErrorSnackbar] = React.useState(false);
	const [msgSnackbar, setMsgSnackbar] = React.useState(null);

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
	};

	const userList = {
		null: "No asignar",
	};

	const data = [];

	React.useEffect(() => {
		if (JSON.parse(localStorage.getItem("user"))._role.name === "ADMIN") {
			async function getUsers() {
				try {
					const response = await getUsersAPI();
					if (response.success) {
						response.data.map((key) => {
							return (userList[key._id] = key.name);
						});

						setState((prevState) => {
							const columns = [...prevState.columns];
							columns.push({
								title: "Ticket asignado a",
								field: "user_name",
								lookup: userList,
							});
							return { ...prevState, columns };
						});
						setUsers(true);
					}
				} catch (error) {
					console.log(error);
				}
			}

			if (!users) getUsers();
		} else {
			history.push("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (JSON.parse(localStorage.getItem("user"))._role.name === "ADMIN") {
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
									key._user === null ? "null" : key._user._id,
								),
							);
						});
						setState({ ...state, data });
						setTickets(true);
					}
				} catch (error) {
					console.log(error);
				}
			}

			if (!tickets && users) getAllTickets();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, users]);

	const editable = {
		onRowAdd: (newData) =>
			new Promise((resolve) => {
				const token = localStorage.getItem("token");
				const query = {
					name: newData.ticket_name,
					_user: newData.user_name === "null" ? null : newData.user_name,
				};

				storeTicketAPI(token, query)
					.then((response) => {
						resolve();
						if (response.success) {
							newData = {
								...newData,
								ticket_requested_user: "-",
								created_at: new Date(),
							};

							setState((prevState) => {
								const data = [...prevState.data];
								data.push(newData);
								return { ...prevState, data };
							});

							setMsgSnackbar("El ticket ha sido creado exitosamente");
							setErrorSnackbar(false);
							setOpenSnackbar(true);
						} else {
							if (response.code === 422) {
								setMsgSnackbar("El nombre del ticket es requerido");
								setErrorSnackbar(true);
								setOpenSnackbar(true);
							} else {
								setMsgSnackbar("Acceso no autorizado");
								setErrorSnackbar(true);
								setOpenSnackbar(true);
							}
						}
					})
					.catch((err) => console.log(err));
			}),
		onRowUpdate: (newData, oldData) =>
			new Promise((resolve) => {
				const token = localStorage.getItem("token");
				const ticketId = newData.id;
				let query = {
					name: newData.ticket_name,
					_user: newData.user_name === "null" ? null : newData.user_name,
					_ticketRequestedUser: null,
				};

				newData.ticket_requested_user = "-";

				updateTicketAPI(token, ticketId, query)
					.then((response) => {
						resolve();
						if (response.success) {
							if (oldData) {
								setState((prevState) => {
									const data = [...prevState.data];
									data[data.indexOf(oldData)] = newData;
									return { ...prevState, data };
								});

								setMsgSnackbar("El ticket ha sido editado exitosamente");
								setErrorSnackbar(false);
								setOpenSnackbar(true);
							}
						} else {
							setMsgSnackbar("Acceso no autorizado");
							setErrorSnackbar(true);
							setOpenSnackbar(true);
						}
					})
					.catch((err) => console.log(err));
			}),
		onRowDelete: (oldData) =>
			new Promise((resolve) => {
				const token = localStorage.getItem("token");
				deleteTicketAPI(token, oldData.id)
					.then((response) => {
						resolve();
						if (response.success) {
							setState((prevState) => {
								const data = [...prevState.data];
								data.splice(data.indexOf(oldData), 1);
								return { ...prevState, data };
							});
							setMsgSnackbar("El ticket ha sido eliminado exitosamente");
							setErrorSnackbar(false);
							setOpenSnackbar(true);
						} else {
							setMsgSnackbar("Acceso no autorizado");
							setErrorSnackbar(true);
							setOpenSnackbar(true);
						}
					})
					.catch((err) => {
						console.log("err", err);
					});
			}),
	};

	return (
		<>
			<AppBarComponent />
			<Container className={classes.root} maxWidth='xl' disableGutters>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='center'
					className={classes.main}>
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
							<TableAdmin state={state} editable={editable} />
						)}
					</Grid>
				</Grid>
			</Container>
			<SnackbarComponent
				openSnackbar={openSnackbar}
				handleCloseSnackbar={handleCloseSnackbar}
				msgSnackbar={msgSnackbar}
				errorSnackbar={errorSnackbar}
			/>
		</>
	);
}

export default AdminHome;
