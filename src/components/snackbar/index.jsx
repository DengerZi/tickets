import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarComponent(props) {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.openSnackbar}
        autoHideDuration={6000}
        onClose={props.handleCloseSnackbar}
      >
        <Alert
          onClose={props.handleCloseSnackbar}
          severity={props.errorSnackbar ? "error" : "success"}
        >
          {props.msgSnackbar}
        </Alert>
      </Snackbar>
    </>
  );
}

SnackbarComponent.propTypes = {
  openSnackbar: PropTypes.bool.isRequired,
  errorSnackbar: PropTypes.bool.isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
};

export default SnackbarComponent;
