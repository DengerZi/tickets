import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles(theme => ({
	root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default styleCSS;