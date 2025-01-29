import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
    },
    secondary: {
      main: '#ffffff', // White
    },
    background: {
      default: '#f5f5f5', // Light gray background
      paper: '#ffffff', // White for paper elements
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#757575', // Dark gray text
    },
  },
});

export default theme;
