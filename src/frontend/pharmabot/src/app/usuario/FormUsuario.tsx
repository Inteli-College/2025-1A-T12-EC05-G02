"use client";

import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";

interface Props {
  open: boolean;
  handleOpen: (args: any) => void;
}

const FormUsuario: React.FC<Props> = ({ open, handleOpen }) => {
  const dataCadastro = new Date().toISOString(); // valor automático

  // Campos do formulário
  const inputs: Input[] = [
    { label: "Nome", type: "text", name: "nome", required: true },
    { label: "E-mail", type: "email", name: "email", required: true },
    { label: "Senha", type: "password", name: "senha", required: true }, // NOVO CAMPO
    { label: "Data de Cadastro", type: "date", name: "dataCadastro", required: false, value: dataCadastro, hidden: true }
  ];

  return (
    <FormModal
  title="Cadastro de Usuário"
  open={open}
  handleOpen={handleOpen}
  rota="http://127.0.0.1:5555/api/user/signup"
  inputs={inputs}
/>
  );
};

export default FormUsuario;
