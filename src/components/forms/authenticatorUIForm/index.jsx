/** @format */

import React from "react";
import PropTypes from "prop-types";

import styleCSS from "./style";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function AuthenticatorUIForm(props) {
	const classes = styleCSS();
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Paper>
				<Box className={classes.box}>
					<Typography variant='h4' className={classes.titleMsg}>
						{props.initComponent.titleMsg}
					</Typography>
				</Box>
				<form
					noValidate
					autoComplete='off'
					onSubmit={props.handleSubmit(props.onSubmit)}>
					<Grid
						container
						direction='row'
						justify='center'
						className={classes.main}>
						<Grid item xs={12}>
							<Typography variant='h1'>{props.initComponent.title}</Typography>
							<div className={classes.smallDivider}></div>
						</Grid>
						<Grid item xs={12} className={classes.textFieldItem}>
							<TextField
								label='Correo electrónico'
								type='email'
								name='email'
								autoComplete='on'
								error={props.errors?.email ? true : false}
								helperText={props.errors?.email?.message}
								fullWidth
								inputRef={props.register({
									required: {
										value: true,
										message: "El correo electrónico es requerido",
									},
									pattern: {
										value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										message: "Debe ingresar un correo electrónico válido",
									},
								})}
							/>
						</Grid>
						{!props.initComponent.login && (
							<Grid item xs={12} className={classes.textFieldItem}>
								<TextField
									label='Nombre'
									type='text'
									name='name'
									autoComplete='on'
									error={props.errors?.name ? true : false}
									helperText={props.errors?.name?.message}
									fullWidth
									inputRef={props.register({
										required: {
											value: !props.initComponent.login ? true : false,
											message: "El nombre es requerido",
										},
										maxLength: {
											value: 64,
											message: "Debe contener un máximo de 64 caracteres",
										},
										pattern: {
											value: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
											message: "Solo admite letras",
										},
									})}
								/>
							</Grid>
						)}
						<Grid item xs={12} className={classes.textFieldItem}>
							<FormControl
								className={classes.textField}
								error={props.errors?.password ? true : false}>
								<InputLabel htmlFor='standard-adornment-password'>
									Contraseña
								</InputLabel>
								<Input
									id='standard-adornment-password'
									type={showPassword ? "text" : "password"}
									name='password'
									autoComplete='off'
									fullWidth
									inputRef={props.register({
										required: {
											value: true,
											message: "La contraseña es requerida",
										},
										minLength: {
											value: 8,
											message: "Debe contener un mínimo de 8 caracteres",
										},
										maxLength: {
											value: 64,
											message: "Debe contener un máximo de 64 caracteres",
										},
									})}
									endAdornment={
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
								{props.errors.password && (
									<FormHelperText>
										{props.errors?.password?.message}
									</FormHelperText>
								)}
								{!props.errors.password && (
									<FormHelperText id='min-characters'>
										Mínimo 8 caracteres
									</FormHelperText>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} className={classes.btnActionContent}>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								className={classes.btnAction}>
								{props.initComponent.title}
							</Button>
						</Grid>
						<Grid item xs={11}>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body1' className={classes.questionMsg}>
								{props.initComponent.question}
							</Typography>
							<Button
								color='secondary'
								className={classes.btnAction}
								onClick={() => props.secondaryAction()}>
								{props.initComponent.subtitle}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</>
	);
}

AuthenticatorUIForm.propTypes = {
	initComponent: PropTypes.object.isRequired,
	secondaryAction: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
};

export default AuthenticatorUIForm;
