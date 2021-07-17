import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { borderRadius } from '@material-ui/system';
import ErrorText from './components/ErrorText';

// UI/UX Standard
/*
  These objects exists solely for the ease of reference. It is NOT included in the theme object.
*/

/*  Colors  */
const mono = {
  veryLightGray: '#F8F8F8',
  lightGray: '#EAEAEA',
  gray: '#CACACA',
  semiDarkGray: '#AAAAAA',
  darkGray: '#656565',
};

const blue = {
  60: '#8DD1FF',
  80: '#6DC5FF',
  100: '#1EA5FF',
  dark: '#1184D1',
};

const red = {
  60: '#FF9A9A',
  80: '#FF8176',
  100: '#EA3222',
  dark: '#D51D0D',
};

const palette = {
  /*
  Default components applies colors in "grey" sub-object if "color" prop was not specified.
  See component source code to see which one it applies
  (eg. grey[300] for contained Button backgroundColor).
  */
  grey: {
    100: mono.lightGray,
    300: mono.gray, // root backgroundColor for Contained Buttons, etc.
    A100: mono.lightGray,
    A400: mono.darkGray,
    A700: mono.semiDarkGray,
  },

  // primary: blue
  primary: {
    light: blue[60],
    main: blue[100],
    dark: blue.dark,
    contrastText: 'white',
  },

  // secondary: red
  secondary: {
    light: red[60],
    main: red[100],
    dark: red.dark,
    contrastText: 'white',
  },

  action: {
    disabledBackground: mono.gray,
    disabled: mono.lightGray, // font color
    disabledOpacity: '100%',
  },

  background: {
    default: mono.veryLightGray, // mono - very light
    paper: 'white',
    card: 'white',
  },
};

const typography = {
  /* Note: to change default html font size (basis of 'rem'), go to src/styles/index.css */

  // UI/UX terminology
  // Big Title
  h1: {
    fontSize: '2.67rem',
    fontWeight: 700,
    lineHeight: 65 / 48,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Title
  h2: {
    fontSize: '1.56rem',
    fontWeight: 700,
    lineHeight: 33 / 24,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Bold-Body
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 25 / 18,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Body
  body1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 25 / 18,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Sub-body
  body2: {
    fontSize: '0.89rem',
    fontWeight: 400,
    lineHeight: 22 / 16,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },

  // Caption
  caption: {
    fontSize: '0.78rem',
    fontWeight: 300,
    lineHeight: 19 / 14,
    // letterSpacing: '-0.02rem',
    fontFamily: 'Noto Sans',
  },

  button: {
    textTransform: 'none',
    fontSize: '1rem',
    lineHeight: 24 / 20,
    // letterSpacing: '-0.01rem',
    fontFamily: 'Noto Sans',
  },
};

const shape = {
  borderRadius: 5,
};

const overrides = {
  // "Button"
  MuiButton: {
    root: {
      transition: 'background 0.4s',
      margin: '10px 5px 10px 5px',
      padding: '8.5px 25px 10px 25px',
    },
    contained: {
      '&:hover': {
        backgroundColor: mono.lightGray,
      },
      '&:active': {
        backgroundColor: mono.semiDarkGray,
      },
    },
    containedPrimary: {
      '&:hover': {
        backgroundColor: blue[60],
      },
      '&:active': {
        backgroundColor: blue.dark,
      },
    },
    containedSecondary: {
      '&:hover': {
        backgroundColor: red[60],
      },
      '&:active': {
        backgroundColor: red.dark,
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
      margin: '10px 5px 50px 5px',
    },
  },
  MuiSelect: {
    outlined: { padding: '13px 0px 14px 15px' },
  },
  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        borderRadius: 10,
      },
      '&:hover:not($disabled):not($focused):not($error) $notchedOutline': { borderColor: mono.gray }, // removes hover effect

      '& input': {
        padding: '10px 0px 10px 15px',
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
      transform: 'translate(15px, 11px) scale(1)',
      '&$shrink': { transform: 'translate(14px, -18px) scale(0.89)', fontWeight: 400 },
    },
  },

  MuiPaper: {
    // elevation: {  },
    outlined: {
      border: `1px solid ${mono.gray}`,
    },
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
      backgroundColor: `${palette.grey[300]}66`, // 8-digit hex for opacity = 40%
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
