/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import styleCSS from "./style";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import AuthenticatorUIForm from "../../components/forms/authenticatorUIForm";
import SnackbarComponent from "../../components/snackbar";

import { loginAPI } from "../../API/auth";

import { loadUser, loadToken } from "../../stores/actions/usersActions";

function Login() {
	const classes = styleCSS();
  let history = useHistory();
  const dispatch = useDispatch();
	const { register, handleSubmit, setError, errors } = useForm();
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

	const initComponent = {
		titleMsg: "Hola, ¡bienvenido de nuevo!",
		title: "Iniciar sesión",
		subtitle: "Crear una cuenta",
		question: "¿Ya tienes cuenta?",
		login: true,
	};

	const secondaryAction = () => {
		history.push("/signup");
	};

	const onSubmit = (data) => {
    handleOpenBackDrop();
    const query = {
      email: data.email,
      password: data.password,
    };
    login(query);
  };
  
  async function login(query) {
    try {
      const response = await loginAPI(query);
      handleCloseBackDrop();
      if (response.success) {
        dispatch(loadToken(response.data.jwt));
        dispatch(loadUser(response.data.user));
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        response.data.user._role.name === 'ADMIN' ?  history.push("/admin") :  history.push("/");
      } else {
        switch (response.code) {
          case 401:
            setError(
              "email",
              "notMatch",
              "Acceso no autorizado"
            );
            setError(
              "password",
              "notMatch",
              "Acceso no autorizado"
            );
            setMsgSnackbar("Acceso no autorizado");
            break;
          case 422:
            setError(
              "email",
              "notMatch",
              "Acceso no autorizado"
            );
            setError(
              "password",
              "notMatch",
              "Acceso no autorizado"
            );
            setMsgSnackbar("Acceso no autorizado");
            break;
          case 102:
            setError("server", "notMatch", "Error en la conexión al server");
            setMsgSnackbar("Error en la conexión al server");
            break;
          default:
            setError("server", "notConnect", "Error en el server");
            setMsgSnackbar("Error en el server");
            break;
        }
        setErrorSnackbar(true);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

	return (
		<Container className={classes.root} maxWidth='xl' disableGutters>
			<Grid
				className={classes.main}
				container
				direction='row'
				justify='center'
				alignItems='center'>
				<Grid item md={3}>
					<AuthenticatorUIForm
						initComponent={initComponent}
						secondaryAction={secondaryAction}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						errors={errors}
					/>
				</Grid>
			</Grid>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackbarComponent
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        msgSnackbar={msgSnackbar}
        errorSnackbar={errorSnackbar}
      />
		</Container>
	);
}

export default Login;
