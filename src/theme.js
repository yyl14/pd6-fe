import { createTheme } from '@material-ui/core/styles';

const palette = {
  // default: grey
  mono: {
    light: '#EAEAEA',
    main: '#CACACA',
    dark: '#AAAAAA',
  },

  // primary: blue
  primary: {
    main: '#1EA5FF',
    dark: '#1590e2',
    contrastText: 'white',
  },

  // secondary: red
  secondary: {
    main: '#EA3222',
    dark: '#D41D0D',
    contrastText: 'white',
  },
};

const typography = {
  button: {
    textTransform: 'none',
  },

  fontFamily: 'San Francisco',
};

const shape = {
  borderRadius: 5,
};

const overrides = {
  MuiButton: {
    root: {
      transition: 'opacity 0.4s, background 0.4s',
      margin: '10px 5px 10px 5px',
      padding: '8px 25px',
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '-0.01em',
    },
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
        opacity: '70%',
      },
      '&:active': {
        backgroundColor: palette.secondary.dark,
        opacity: '100%',
      },
    },
  },

  MuiOutlinedInput: {
    root: {
      margin: '10px 5px 10px 5px',
      width: '350px',
      '& $notchedOutline': {
        borderRadius: 10,
      },

      '& input': {
        padding: '12px 0px 14px 15px',
        fontWeight: 500,
        fontSize: '20px',
      },
    },
  },
};

const props = {
  // Name of the component ⚛️
  MuiButton: {
    variant: 'contained',
    disableElevation: true,
    disableRipple: true,
  },
  MuiTextField: {
    variant: 'outlined',
    borderRadius: '10px',
  },
};

const theme = createTheme({
  palette,
  typography,
  shape,
  overrides,
  props,
});

export default theme;
