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

import { signUpAPI } from "../../API/auth";

import { loadUser, loadToken } from "../../stores/actions/usersActions";

function SignUp() {
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
    titleMsg: "¡Empezar!",
    title: "Crear una cuenta",
    subtitle: "Iniciar sesión",
    question: "¿Ya tienes cuenta?",
    login: false,
  };

  const secondaryAction = () => {
    history.push("/login");
  };

  const onSubmit = (data) => {
    handleOpenBackDrop();
    const query = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    signUp(query);
  };

  async function signUp(query) {
    try {
      const response = await signUpAPI(query);
      handleCloseBackDrop();
      if (response.success) {
        dispatch(loadToken(response.data.jwt));
        dispatch(loadUser(response.data.user));
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        history.push("/");
      } else {
        switch (response.code) {
          case 422:
            setError(
              "password",
              "notMatch",
              "La contraseña debe poseer minimo 8 caracteres"
            );
            setMsgSnackbar("La contraseña debe poseer minimo 8 caracteres");
            break;
          case 41:
            setError(
              "email",
              "notMatch",
              "Este correo electrónico ya está registrado"
            );
            setMsgSnackbar("Este correo electrónico ya está registrado");
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
    <Container className={classes.root} maxWidth="xl" disableGutters>
      <Grid
        className={classes.main}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
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

export default SignUp;
