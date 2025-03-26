"use client";

import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";

interface Props {
  open: boolean;
  handleOpen: (args: any) => void;
}

const FormUsuario: React.FC<Props> = ({ open, handleOpen }) => {
  // Campos do formulário
  const inputs: Input[] = [
    { label: "Nome", type: "text", name: "nome", required: true },
    { label: "E-mail", type: "email", name: "email", required: true },
    { label: "Senha", type: "password", name: "senha", required: true },
    { label: "Função", type: "text", name: "role", required: true } // novo campo para role
  ];

  return (
    <FormModal
      title="Cadastro de Usuário"
      open={open}
      handleOpen={handleOpen}
      rota="http://127.0.0.1:5555/user/signup"
      inputs={inputs}
    />
  );
};

export default FormUsuario;