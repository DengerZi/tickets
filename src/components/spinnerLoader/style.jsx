import { makeStyles } from "@material-ui/core/styles";

const styleCSS = makeStyles(theme => ({
	backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
}));

export default styleCSS;