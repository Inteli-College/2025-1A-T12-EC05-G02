"use client";

import { useState } from "react";
import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";
import SelectButton from "../components/SelectButton";

const apiUrl = process.env.API_URL;

interface Props {
    open: boolean;
    handleOpen: (args: any) => void;
}

const FormRegistro: React.FC<Props> = ({ open, handleOpen }) => {
    const [valueRemedio, setValueRemedio] = useState('')
    const date = new Date().toString();
    const inputs: Input[] = [
        { label: "Localização", type: "text", name: "bin_localizacao", required: true }, // Mudança para 'bin_localizacao'
        { label: "Quantidade", type: "number", name: "quantidade", required: true },
        { label: "Remedio", type: "number", name: "medicamento_id", required: false, value: valueRemedio, hidden: true }
    ];
    console.log(valueRemedio)
    
    return (
        <FormModal title='Cadastro de Item' open={open} handleOpen={handleOpen} rota={`${apiUrl}/estoque/criar`} inputs={inputs}   values={{ medicamento_id: valueRemedio }}>
            <SelectButton atributo="remedioE" label="Remédio" render={1} onSelect={setValueRemedio} rota={`${apiUrl}/medicine/medicamentos`} id={true}></SelectButton>
        </FormModal>
    );    
};

export default FormRegistro;
