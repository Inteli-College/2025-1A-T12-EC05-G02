"use client";

import SidebarActions from "../components/home/sidebar-actions";
import StatusCard from "../components/home/status-card";
import TabelaPharma from "../components/TabelaPharma";
import SelectButton from "../components/SelectButton";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { exportToCSV } from "../(util)/exportToCSV";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Column } from "../components/table";

interface Data {
  id: string;
  horaPrescricao: Date;
  prescricao: string;
  paciente: string;
  farmaceutico: string;
}

const colunas: Column[] = [
  { id: "prescricao", label: "Prescrição", minWidth: 100 },
  {
    id: "horaPrescricao",
    label: "Horário de Separação",
    minWidth: 150,
    format: (value: Date) => value.toLocaleString("pt-BR"),
  },
  { id: "paciente", label: "Paciente", minWidth: 200 },
  { id: "farmaceutico", label: "Farmacêutico", minWidth: 170 },
];

export default function Home() {
  const navigate = (path: string) => {
    redirect(path);
  };

  const [rows, setRows] = useState<Data[]>([]);
  const [key, setKey] = useState(0);
  const [selectedAcao, setSelectedAcao] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Novo estado para controle de carregamento
  const [searchText, setSearchText] = useState<string>(""); // Estado para o texto de pesquisa
  const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados

  //função para atualizar a página com base no botão atualizar
  const reRender = () => {
    setKey((prevKey) => prevKey + 1);
    setSelectedAcao("");
  };

  const rota: string = "http://0.0.0.0:5555/medicine/logs";

  // Segunda requisição para buscar os logs filtrados pela ação selecionada
  useEffect(() => {
    setLoading(true); // Inicia o carregamento
    // Montar a URL com base na ação selecionada
    const url = selectedAcao
      ? `http://0.0.0.0:5555/medicine/logs?acao=${selectedAcao}`
      : rota;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Transformar os dados no formato esperado
        const formattedData: Data[] = data.data.map((item: any) => ({
          prescricao: String(item.prescricao),
          horaPrescricao: new Date(item.data_pedido), // Converter string para Date
          paciente: String(item.paciente),
          farmaceutico: String(item.farmaceutico),
        }));

        setRows(formattedData);
      })
      .catch((error) => console.error("Erro ao buscar logs:", error))
      .finally(() => setLoading(false)); // Finaliza o carregamento
  }, [selectedAcao, key]); // O efeito será executado sempre que `selectedAcao` mudar

  // Filtra os dados com base no texto de pesquisa
  useEffect(() => {
    if (searchText === "") {
      setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
    } else {
      const filtered = rows.filter((row) => {
        return (
          (row.prescricao &&
            row.prescricao.toString().toLowerCase().includes(searchText.toLowerCase())) ||
          (row.paciente &&
            row.paciente.toString().toLowerCase().includes(searchText.toLowerCase())) ||
          (row.farmaceutico &&
            row.farmaceutico.toString().toLowerCase().includes(searchText.toLowerCase()))
        );
      });
      setFilteredRows(filtered);
    }
  }, [searchText, rows]); // Atualiza sempre que `searchText` ou `rows` mudar

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Função para atualizar a ação selecionada
  const handleAcaoChange = (newAcao: string) => {
    setSelectedAcao(newAcao);
  };

  return (
    <div className="bg-[#FBFBFB] w-full h-[100vh] pl-8 pr-8">
      <div className="flex flex-col w-full h-[15%] items-center justify-center mb-4 mt-4">
        <img
          className="w-[100%] h-[100%] object-contain"
          src="./pharmatech-logo-lg.svg"
          alt="Logo PharmaTech"
        />
      </div>
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col w-[25%] justify-center items-center">
          <SidebarActions />
        </div>
        <div className="flex flex-col w-[75%] justify-center items-center ">
          <div className="flex flex-col w-[100%]items-center bg-white rounded-md shadow-md w-[100%] pl-16 pr-16 pt-4 pb-4">
            <div className="flex flex-row w-[100%] justify-between">
              <StatusCard
                urgency={0}
                quantity={21}
                onClick={() => {
                  navigate("/");
                }}
              />
              <StatusCard
                urgency={1}
                quantity={39}
                onClick={() => {
                  navigate("/");
                }}
              />
              <StatusCard
                urgency={2}
                quantity={10}
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-full">
            <TabelaPharma
              titulo="Histórico de Prescrições"
              subtitulo="Aqui você encontra as prescrições separadas anteriormente pelo PharmaBot"
              rows={filteredRows}
              itemsPerPage={[5]}
              initialNumItems={5}
              render={key}
              loading={loading}
              colunas={colunas}
            >
              <div className="flex justify-between items-center">
                <Stack
                  id="pesquisar"
                  spacing={1}
                  direction="row"
                  className="items-center"
                >
                  <TextField
                    label="Pesquisar"
                    size="small"
                    type="search"
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                  <span></span>
                </Stack>
                <Stack id="botoes" spacing={1} direction="row">
                  <Button variant="outlined" color="black" onClick={reRender}>
                    Atualizar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      exportToCSV(
                        filteredRows,
                        [
                          "Prescrição",
                          "Horário de Separação",
                          "Paciente",
                          "Farmacêutico",
                        ],
                        ["prescricao", "horaPrescricao", "paciente", "farmaceutico"],
                        "home"
                      )
                    }
                  >
                    Exportar CSV
                  </Button>
                </Stack>
              </div>
            </TabelaPharma>
          </div>
        </div>
      </div>
    </div>
  );
}
