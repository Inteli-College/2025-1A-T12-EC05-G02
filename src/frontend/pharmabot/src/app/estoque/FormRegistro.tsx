"use client";

import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";

const apiUrl = process.env.API_URL;

interface Props {
    open: boolean;
    handleOpen: (args: any) => void;
}

const FormRegistro: React.FC<Props> = ({ open, handleOpen }) => {
    const date = new Date().toString();
    const inputs: Input[] = [
        { label: "Nome do Medicamento", type: "text", name: "nome_medicamento", required: true }, // Novo campo para o nome do medicamento
        { label: "Código de Identificação", type: "number", name: "medicamento_id", required: true }, // Mudança para 'medicamento_id'
        { label: "Localização", type: "text", name: "bin_localizacao", required: true }, // Mudança para 'bin_localizacao'
        { label: "Quantidade", type: "number", name: "quantidade", required: true }
    ];
    
    return (
        <FormModal title='Cadastro de Item' open={open} handleOpen={handleOpen} rota={`https://bf7a-204-199-57-14.ngrok-free.app/estoque/criar`} inputs={inputs} />
    );    
};

export default FormRegistro;
