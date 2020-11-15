import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: '#fff'},
    secondary: { main: '#00796b'},
  },
  navbar: {
    color: 'black',
    linkColor: 'black',
    linkHoverColor: '#00ad97',
  },

  resourceCard: {
    background: '#e5e5e5',
  },
});

export default theme;