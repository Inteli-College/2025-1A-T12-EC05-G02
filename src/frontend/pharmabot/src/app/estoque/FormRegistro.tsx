"use client";

import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";


interface Props {
    open: boolean;
    handleOpen: (args: any) => void;
}

const FormRegistro: React.FC<Props> = ({ open, handleOpen }) => {
    const date = new Date().toString();

    const inputs: Input[] = [
        { label: "Nome do Item", type: "text", name: "item", required: true },
        { label: "Código de Identificação", type: "text", name: "codigoIdentificacao", required:true },
        { label: "Localização", type: "text", name: "localizacao", required: true },
        { label: "Quantidade", type: "number", name: "quantidade", required: true },
        { label: "Última Atualização", type: "date", name: "ultimaAtualizacao", required: false, value: date, hidden: true }
      ];

    return (
        <FormModal title='Cadastro de Item' open={open} handleOpen={handleOpen} rota='http://127.0.0.1:5555/api/estoque/criar' inputs={inputs}/>
    );
};

export default FormRegistro;
