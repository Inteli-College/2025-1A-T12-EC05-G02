import { useState, useEffect } from "react";
import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";

interface Props {
  rota: string;
  open: boolean;
  handleOpen: (args: any) => void;
}

const FormEditar: React.FC<Props> = ({ rota, open, handleOpen }) => {
  const [date, setDate] = useState<string>(''); // Inicializa vazio

  useEffect(() => {
    setDate(new Date().toLocaleString('pt-BR')); // Atualiza apenas no cliente
  }, []);

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    item: "",
    codigoIdentificacao: "",
    localizacao: "",
    quantidade: "",
    ultimaAtualizacao: date, // Data inicial
  });

  // Função para buscar os dados da API e preencher o estado
  const fetchData = async () => {
    try {
      const response = await fetch(rota);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      const data = await response.json();
      setFormData({
        item: data.item || "",
        codigoIdentificacao: data.codigoIdentificacao || "",
        localizacao: data.localizacao || "",
        quantidade: data.quantidade || "",
        ultimaAtualizacao: date, // Não vem da API, usamos o valor atual
      });
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  // Buscar os dados quando o modal for aberto
  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const inputs: Input[] = [
    { label: "Nome do Item", type: "text", name: "item", required: true },
    { label: "Código de Identificação", type: "text", name: "codigoIdentificacao", required: true },
    { label: "Localização", type: "text", name: "localizacao", required: true },
    { label: "Quantidade", type: "number", name: "quantidade", required: true },
    { label: "Última Atualização", type: "date", name: "ultimaAtualizacao", required: false, value: date, hidden: true },
  ];

  return (
    <FormModal
      title="Editar Item"
      open={open}
      handleOpen={handleOpen}
      rota={rota}
      inputs={inputs}
      values={formData} // Passa os dados para o FormModal
    />
  );
};

export default FormEditar;
