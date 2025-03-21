"use client";

import { Button, Modal, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

// Criando um tema compatível
const theme = createTheme({
    palette: {
        black: {
            main: "#000000",
            contrastText: "#FFFFFF",
        },
    },
});

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const CustomModal: React.FC<Props> = ({ open, onClose, title, children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography sx={{ mt: 2 }}></Typography>
                    {children}
                    <Button
                        variant="contained"
                        color="black"
                        onClick={onClose}
                        sx={{ mt: 2 }}
                    >
                        Fechar
                    </Button>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

export default CustomModal;