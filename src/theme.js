import { createTheme } from '@material-ui/core/styles';

const palette = {
  // default: grey
  mono: {
    veryLight: '#F8F8F8',
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

  background: {
    default: '#F8F8F8', // mono - very light
    paper: 'white',
    card: 'white',
  },
};

const typography = {
  // UI/UX terminology
  // Big Title
  h1: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: '57px',
    letterSpacing: '-0.01em',
  },

  // Title
  h2: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '-0.01em',
  },

  // Body
  body1: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },

  // Sub-body
  body2: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '19px',
    letterSpacing: '-0.01em',
  },

  // Caption
  caption: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '-0.02em',
  },

  button: {
    textTransform: 'none',
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },

  fontFamily: 'San Francisco',
};

const shape = {
  borderRadius: 5,
};

const overrides = {
  // "Button"
  MuiButton: {
    root: {
      transition: 'opacity 0.4s, background 0.4s',
      margin: '10px 5px 10px 5px',
      padding: '8px 25px',
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

  // "Input"
  MuiTextField: {
    root: {
      width: '350px',
      margin: '10px 5px 10px 5px',
    },
  },

  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        width: '350px',
        borderRadius: 10,
      },

      '& input': {
        width: '350px',
        padding: '12px 0px 14px 15px',
        fontWeight: 500,
        fontSize: '20px',
      },
    },
  },

  MuiFormHelperText: {
    root: {
      marginTop: '5px',
    },
  },

  MuiPaper: {
    outlined: {
      border: '1px solid #CACACA',
    },
    rounded: {
      borderRadius: '10px',
    },
  },

  MuiCard: {
    // "Box"
    elevation: {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
    },
    // "Card"
    outlined: {
      boxShadow: 'none',
    },
    // both "Box" and "Card"
    rounded: {
      borderRadius: '10px',
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

  MuiFormHelperText: {
    component: 'caption',
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
