import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#212121'},
    secondary: { main: '#00796b'},
  },
  navbar: {
    color: 'white',
    linkColor: 'white',
    linkHoverColor: '#00ad97',
  },

  resourceCard: {
    background: 'rgba(1, 1, 1, 0.4)',
  },
});

export default theme;