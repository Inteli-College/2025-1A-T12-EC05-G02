"use client"; // Isso força o componente a rodar no lado do cliente

import { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import CustomModal from "../components/Modal"; // Certifique-se de que o caminho está correto

export default function TestModal() {
    const [open, setOpen] = useState(false);

    return (
        <Container>
            {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Abrir Modal
            </Button>
            <CustomModal 
                open={open} 
                onClose={() => setOpen(false)} 
                title="Cadastro de Usuário"
            ><form>
                        <TextField 
                            label="Nome" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                        />
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                        />
                        <TextField 
                            label="Senha" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
                            margin="normal" 
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            style={{ marginTop: "16px" }}
                        >
                            Salvar
                        </Button>
                    </form></CustomModal> */}
        </Container>
    );
}