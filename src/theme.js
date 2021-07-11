import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { borderRadius } from '@material-ui/system';
// import { ArrowDropDownIcon } from '@material-ui/icons';
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

  /* Note: to change default html font size (basis of 'rem'), go to src/styles/index.css */

  // Big Title
  h1: {
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 57 / 48,
    letterSpacing: '-0.01rem',
    fontFamily: 'San Francisco',
  },

  // Title
  h2: {
    fontSize: '1.2rem',
    fontWeight: 600,
    lineHeight: 29 / 24,
    letterSpacing: '-0.01rem',
    fontFamily: 'San Francisco',
  },

  // Body
  body1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 24 / 20,
    letterSpacing: '-0.01rem',
    fontFamily: 'San Francisco',
  },

  // Sub-body
  body2: {
    fontSize: '0.8rem',
    fontWeight: 400,
    lineHeight: 19 / 16,
    letterSpacing: '-0.01rem',
    fontFamily: 'San Francisco',
  },

  // Caption
  caption: {
    fontSize: '0.7rem',
    fontWeight: 400,
    lineHeight: 17 / 14,
    letterSpacing: '-0.02rem',
    fontFamily: 'San Francisco',
  },

  button: {
    textTransform: 'none',
    fontSize: '1rem',
    lineHeight: 24 / 20,
    letterSpacing: '-0.01rem',
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
    // root: {
    //   margin: '1vh 5px 2.2vh 5px',
    // },
  },
  MuiFormControl: {
    root: {
      margin: '1vh 5px 1.5vh 5px',
    },
  },
  MuiSelect: {
    outlined: { padding: '12px 0px 14px 15px' },
  },
  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        borderRadius: 10,
      },

      '& input': {
        padding: '12px 0px 14px 15px',
        fontWeight: 500,
        fontSize: '1rem',
      },
    },
  },
  MuiFormHelperText: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '5px',
      '& p': {
        marginLeft: '8px',
      },
    },
  },
  MuiInputLabel: {
    outlined: {
      top: '-5px',
      '&$shrink': { transform: 'translate(14px, -11px) scale(0.80)', fontWeight: 400 },
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

  // Base of "List"
  MuiPopover: {
    paper: { boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)' },
  },

  MuiMenuItem: {
    root: {
      paddingTop: '12px',
      paddingBottom: '12px',
      borderRadius: '5px',
    },
  },

  // "Mask"
  MuiBackdrop: {
    root: {
      backgroundColor: `${palette.mono.main}66`, // 8-digit hex for opacity = 40%
    },
  },
};

const props = {
  // This includes List items, icon buttons, etc.
  MuiButtonBase: {
    disableRipple: true,
  },

  // Name of the component ⚛️
  MuiButton: {
    variant: 'contained',
    disableElevation: true,
  },

  MuiIconButton: {
    size: 'small',
  },

  MuiSvgIcon: {
    fontSize: 'small',
  },

  MuiFormControl: {
    variant: 'outlined',
  },

  MuiList: {
    disablePadding: true,
  },

  MuiMenu: {
    // make sure the popover is under the input (MUI default: over the input component)
    getContentAnchorEl: null,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
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

export default responsiveFontSizes(theme);
