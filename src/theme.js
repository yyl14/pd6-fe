import { createTheme } from '@material-ui/core/styles';
import ErrorText from './components/ErrorText';

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
    fontFamily: 'San Francisco',
  },

  // Title
  h2: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '29px',
    letterSpacing: '-0.01em',
    fontFamily: 'San Francisco',
  },

  // Body
  body1: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
    fontFamily: 'San Francisco',
  },

  // Sub-body
  body2: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '19px',
    letterSpacing: '-0.01em',
    fontFamily: 'San Francisco',
  },

  // Caption
  caption: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '-0.02em',
    fontFamily: 'San Francisco',
  },

  button: {
    textTransform: 'none',
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
    fontFamily: 'San Francisco',
  },
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
      margin: '1vh 5px 4vh 5px',
    },
  },
  MuiOutlinedInput: {
    root: {
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
  MuiFormHelperText: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '7px',
      '& caption': {
        marginLeft: '6px',
      },
    },
  },
  MuiInputLabel: {
    outlined: {
      top: '-5px',
      '&$shrink': { transform: 'translate(14px, -14px) scale(0.70)', fontWeight: 400 },
    },
  },

  MuiPaper: {
    // elevation: {  },
    outlined: {
      border: '1px solid #CACACA',
    },
    rounded: {
      borderRadius: '10px',
    },
  },

  // Box / Card
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

  // Box (dialog)
  MuiDialog: {
    paper: { padding: '4px 6px 4px 6px', minWidth: '45vw', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' },
  },
  MuiDialogTitle: {
    // root: { padding: '20px 30px 0 30px' },
  },
  MuiDialogContent: {
    // root: { padding: '20px 30px 12px 30px' },
  },
  MuiDialogActions: {
    root: { padding: '0 24px 0 0' },
  },

  // "Mask"
  MuiBackdrop: {
    root: {
      backgroundColor: `${palette.mono.main}66`, // 8-digit hex for opacity = 40%
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

  MuiOutlinedInput: {
    notched: false,
  },

  MuiFormHelperText: {
    component: ErrorText,
  },
  MuiDialogTitle: {
    disableTypography: true,
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
