import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3),
  },
  box: {
    height: 100,
    backgroundColor: theme.palette.primary.main,
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallDivider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 2.5,
  },
  titleMsg: {
    color: 'white',
    fontWeight: 700,
  },
  textField: {
    width: '100%',
  },
  textFieldItem: {
    minHeight: 75,
  },
  btnActionContent: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  btnAction: {
    width: "100%",
  },
  questionMsg: {
    textAlign: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

export default styleCSS;