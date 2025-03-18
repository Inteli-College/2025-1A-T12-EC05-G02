import { createTheme, alpha } from '@mui/material/styles';


// theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        black: Palette['primary'];
    }

    interface PaletteOptions {
        black?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        black: true;
    }
}

// Criando um tema compatível
export const theme = createTheme({
    palette: {
        black: {
            main: '#000000',
            light: alpha("#000000", 0.5),
            dark: alpha("#000000", 0.9),
            contrastText: '#FFFFFF',
        },
    },
});