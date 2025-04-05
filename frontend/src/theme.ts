import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          height: 24,
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#EAB308',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#3B82F6',
    },
    secondary: {
      main: '#A78BFA',
      light: '#C4B5FD',
      dark: '#8B5CF6',
    },
    success: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
    },
    warning: {
      main: '#FCD34D',
      light: '#FDE68A',
      dark: '#EAB308',
    },
    error: {
      main: '#F87171',
      light: '#FCA5A5',
      dark: '#EF4444',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
}); 