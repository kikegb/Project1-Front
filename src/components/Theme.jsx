import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
        main: '#A3A3A3',
    },
    neutral: {
      main: '#C9C9C9',
      contrastText: '#000',
    },
    custom: {
        main: '#FCFC62',
    },
    background: {
        main: '#FEFFEA',
    }
  },
});

export default theme;