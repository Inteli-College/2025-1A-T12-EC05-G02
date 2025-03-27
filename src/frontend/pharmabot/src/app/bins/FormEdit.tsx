import { useState, useEffect } from "react";
import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";

interface Props {
  rota: string;
  open: boolean;
  handleOpen: (args: any) => void;
}

const FormEdit: React.FC<Props> = ({ rota, open, handleOpen }) => {
  const [date, setDate] = useState<string>(''); // Inicializa vazio

  useEffect(() => {
    setDate(new Date().toLocaleString('pt-BR')); // Atualiza apenas no cliente
  }, []);

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    nomeBin: "",
    nomeMedicamento: "",
    coordeandas: "",
    quantidade: "",
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
        nomeBin: data.nomeBin || "",
        nomeMedicamento: data.nomeMedicamento || "",
        coordeandas: data.coordeandas || "",
        quantidade: data.quantidade || "",
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
    {label: 'Numero do bin', type: 'text', name: 'nomeBin', required: true },
    {label: 'Nome do Medicamento', type: 'text', name: 'nomeMedicamento', required: true },
    {label: 'quantidade', type: 'number', name: 'quantidade', required: true },
    {label: 'Coordenadas - x', type: 'text', name: 'x', required: true },
    {label: 'Coordenadas - y', type: 'text', name: 'y', required: true },
    {label: 'Coordenadas - z', type: 'text', name: 'z', required: true },
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

export default FormEdit;
