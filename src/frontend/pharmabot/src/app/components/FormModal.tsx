"use client";

import React, { useState } from "react";
import { Alert, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomModal from "./Modal";

export type Input = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  hidden?: boolean;
  value?: string;
};

interface Props {
  title: string;
  inputs: Input[];
  open: boolean;
  handleOpen: (args: any) => void;
  rota: string;
  values?: { [key: string]: string }; // Objeto que contém os valores dos inputs
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Função para atualizar os valores
  children?: React.ReactNode;
}

const CustomTextField = styled(TextField)({
  "& .MuiFormLabel-asterisk": {
    color: "#820707",
  },
});


const FormModal: React.FC<Props> = ({ title, inputs, rota, open, handleOpen, values = {}, onChange, children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alerta, setAlerta] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setAlerta(false);
    setErro("");

    const formData = new FormData(event.currentTarget);
    const data: Record<string, any> = {};

    inputs.forEach((input) => {
      const value = formData.get(input.name);
      data[input.name] = input.type === "number" ? Number(value) : value;
      data[input.name] = input.type === "date" ? Number(value) : value;

    });

    try {
      const response = await fetch(rota, {
        method: "POST",
        headers: {
          
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${document.cookie.split('token=')[1]}`, 
          "User-Agent": "Custom-User-Agent" // Alternative way to bypass
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }

      alert("Dados salvos com sucesso!");
      handleOpen(false); // Fecha o modal após o sucesso
    } catch (error: any) {
      console.error("Erro:", error);
      setErro(error.message || "Erro desconhecido no servidor.");
      setAlerta(true);
    } finally {
      setLoading(false);
    }
  };

  const idForm = "form-modal";

  return (
    <CustomModal
      open={open}
      onClose={() => {
        handleOpen(false);
        setAlerta(false);
      }}
      title={title}
      botaoSubmit={true}
      idForm={idForm}
      labelBotao={loading ? "Salvando..." : "Salvar"}
    >
      {alerta && (
        <Alert variant="filled" severity="error">
          Erro ao salvar: {erro}
        </Alert>
      )}

      <form onSubmit={handleSubmit} id={idForm}>
        {children}
        {inputs.map((input, index) => (
          <CustomTextField
            key={index}
            label={input.label}
            name={input.name}
            type={input.type}
            variant="outlined"
            fullWidth
            required={input.required ?? true}
            margin="normal"
            hidden={input.hidden} // Aplica o atributo hidden se input.hidden for verdadeiro
            value={values[input.name] || undefined} // Acessa o valor do campo de acordo com o nome
            onChange={onChange || undefined}
            {...(input.hidden ? { readOnly: true } : {})}
          />
        ))}
      </form>
    </CustomModal>
  );
};

export default FormModal;
