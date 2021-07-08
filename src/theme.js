import { createTheme } from '@material-ui/core/styles';
import { blue, purple, green } from '@material-ui/core/colors';
// import green from '@material-ui/core/colors/green';

const palette = {
  primary: {
    // light: ''
    main: '#1EA5FF',
    dark: '#1590e2',
    contrastText: 'white',
  },
  secondary: {
    main: '#EA3222',
    dark: '#D41D0D',
    contrastText: 'white',
  },
  mono: {
    light: '#EAEAEA',
    main: '#CACACA',
    dark: '#AAAAAA',
  },
};

const theme = createTheme({
  palette,
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiButton: {
      root: { transition: 'opacity 0.3s, background 0.3s' },
      contained: {
        '&:hover': {
          backgroundColor: palette.mono.light,
          // opacity: '80%',
        },
        '&:active': {
          backgroundColor: palette.mono.dark,
          // opacity: '100%',
        },
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: palette.primary.main,
          opacity: '80%',
        },
        '&:active': {
          backgroundColor: palette.primary.dark,
          opacity: '100%',
        },
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: palette.secondary.main,
          opacity: '80%',
        },
        '&:active': {
          backgroundColor: palette.secondary.dark,
          opacity: '100%',
        },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
      disableRipple: true,
    },
  },
});

export default theme;
