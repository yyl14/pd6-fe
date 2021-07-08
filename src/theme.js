import { createTheme } from '@material-ui/core/styles';

const palette = {
  primary: {
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
    fontFamily: 'San Francisco',
  },
  overrides: {
    MuiButton: {
      root: { transition: 'opacity 0.4s, background 0.4s' },
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
          opacity: '60%',
        },
        '&:active': {
          backgroundColor: palette.primary.dark,
          opacity: '100%',
        },
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: palette.secondary.main,
          opacity: '60%',
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
