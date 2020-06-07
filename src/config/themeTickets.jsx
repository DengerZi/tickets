import {createMuiTheme} from '@material-ui/core/styles';

const typography = {
    h1: {
        fontSize: 32,
    },
    h2: {
        fontSize: 28,
    },
    h3: {
        fontSize: 24,
    },
    h4: {
        fontSize: 22,
    },
    h5: {
        fontSize: 20,
    },
    h6: {
        fontSize: 18,
        fontWeight: 300,
    },
    subtitle1: {
        fontSize: 16,
        fontWeight: 700,
    },
    subtitle2: {
        fontSize: 14,
        fontWeight: 400,
    },
    body1: {
        fontSize: 16,
    },
    body2: {
        fontSize: 14,
    },
    caption: {
        fontSize: 12,
    },
    overline: {
        fontSize: 12,
    },
}

const themeTickets = createMuiTheme({
    typography
});

export default themeTickets;
