import { createTheme } from '@mui/material/styles';

/**
 * Single theme carrying both color schemes. MUI generates CSS variables for
 * each, so toggling the mode never re-renders the tree from scratch.
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#3D5AFE' },
        secondary: { main: '#00BFA5' },
        background: { default: '#F6F7FB', paper: '#FFFFFF' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#8C9EFF' },
        secondary: { main: '#64FFDA' },
        background: { default: '#0E1116', paper: '#161A22' },
      },
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({ border: `1px solid ${theme.palette.divider}` }),
      },
    },
    MuiAppBar: { defaultProps: { elevation: 0, color: 'default' } },
    MuiTextField: { defaultProps: { size: 'small' } },
  },
});
