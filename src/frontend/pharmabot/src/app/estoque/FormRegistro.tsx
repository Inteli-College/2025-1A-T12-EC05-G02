import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import CustomModal from "../components/Modal";

interface Props {
    open: boolean;
    handleOpen: (args: any) => void;
}

const FormRegistro: React.FC<Props> = ({ open, handleOpen }) => {
    const [loadingCriar, setLoadingCriar] = useState<boolean>(false);
    const [alertRegistro, setAlertRegistro] = useState<boolean>(false);
    const [erro, setErro] = useState<string>("");

    const date = new Date().toString();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingCriar(true);
        setAlertRegistro(false);
        setErro("");

        const formData = new FormData(event.currentTarget);
        const data = {
            item: formData.get("item"),
            codigoIdentificacao: formData.get("codigoIdentificacao"),
            localizacao: formData.get("localizacao"),
            quantidade: Number(formData.get("quantidade")),
            ultimaAtualizacao: formData.get("ultimaAtualizacao"),
        };

        try {
            const response = await fetch("http://127.0.0.1:5555/api/estoque/criar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar os dados.");
            }

            alert("Item cadastrado com sucesso!");
            handleOpen(false); // Fechar o modal após o sucesso
        } catch (error: any) {
            console.error("Erro:", error);
            setErro(error.message || "Erro desconhecido no servidor.");
            setAlertRegistro(true);
        } finally {
            setLoadingCriar(false);
        }
    };

    const idForm = "criar-registro";

    return (
        <CustomModal
            open={open}
            onClose={() => {handleOpen(false); setAlertRegistro(false)}}
            title="Cadastro de Item"
            botaoSubmit={true}
            idForm={idForm}
            labelBotao={loadingCriar ? "Salvando..." : "Salvar"}
        >
            {alertRegistro && <Alert variant="filled" severity="error">Erro ao enviar o formulário: {erro}</Alert>}

            <form onSubmit={handleSubmit} id={idForm}>
                <TextField label="Nome do Item" name="item" variant="outlined" fullWidth required margin="normal" />
                <TextField label="Código de Identificação" name="codigoIdentificacao" variant="outlined" fullWidth required margin="normal" />
                <TextField label="Localização" name="localizacao" variant="outlined" fullWidth required margin="normal" />
                <TextField label="Quantidade" name="quantidade" variant="outlined" type="number" required fullWidth margin="normal" />
                <input name="ultimaAtualizacao" readOnly value={date} className="hidden" />
            </form>
        </CustomModal>
    );
};

export default FormRegistro;
