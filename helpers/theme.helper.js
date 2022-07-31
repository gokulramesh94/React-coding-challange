import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

export const theme = () => {
  const customTheme = createTheme({
    breakpoints: {
      values: {
        sm: 500,
        md: 700
      }
    }
  });

  const mobileScreen = useMediaQuery(customTheme.breakpoints.up('sm'));
  const tabScreen = useMediaQuery(customTheme.breakpoints.up('md'));

  return {
    customTheme,
    mobileScreen,
    tabScreen
  };
};
