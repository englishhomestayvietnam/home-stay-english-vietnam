import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#46b96c',        // Your brand green
            light: '#6fcf97',
            dark: '#2e9f56',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#2c3e50',        // Deep sophisticated blue-grey for contrast
            light: '#34495e',
            dark: '#1a2530',
        },
        success: {
            main: '#46b96c',
            light: '#6fcf97',
            dark: '#2e9f56',
        },
        background: {
            default: '#f8fafc',     // Very light warm gray (clean premium feel)
            paper: '#ffffff',       // Pure white cards with elevation
        },
        grey: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        },
        text: {
            primary: '#1e293b',
            secondary: '#475569',
        },
        divider: '#e2e8f0',
    },

    shape: {
        borderRadius: 6, // Softer, modern corners
    },

    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#f8fafc',
                    backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(70, 185, 108, 0.04) 0%, transparent 20%), ' +
                        'radial-gradient(circle at 90% 80%, rgba(70, 185, 108, 0.03) 0%, transparent 30%)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    backdropFilter: 'blur(10px)',
                },
                elevation1: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                },
                elevation2: {
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(70, 185, 108, 0.12)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    background: 'linear-gradient(135deg, #46b96c 0%, #3aa05b 100%)',
                    boxShadow: '0 4px 14px rgba(70, 185, 108, 0.4)',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(70, 185, 108, 0.5)',
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backgroundColor: '#ffffff',
                    },
                },
            },
        },
    },
});

export default theme;