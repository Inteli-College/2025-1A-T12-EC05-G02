"use client"; // Isso força o componente a rodar no lado do cliente

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from 'react';
import TabelaPharma from '../components/TabelaPharma';
import { Column } from '../components/table';
import { Data } from '../components/table';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { exportToCSV } from '../(util)/exportToCSV';
import Header from '../components/Header';

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

export default function HistoricoPrescricoes() {

    const [rows, setRows] = useState<Data[]>([]);
    const [key, setKey] = useState(0);
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para controle de carregamento
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados
    const [searchDate, setSearchDate] = useState<Dayjs | null>(null);

    const handleDateChange = (newDate: Dayjs | null) => {
        setSearchDate(newDate);
    };

    useEffect(() => {
        if (!searchDate) {
            setFilteredRows(rows); // Se não houver data, mostra tudo
        } else {
            const filtered = rows.filter((row) =>
                dayjs(new Date(row.horaPrescricao)).isSame(searchDate, "day")
            );            
            setFilteredRows(filtered);
        }
    }, [searchDate, rows]);

    // Função para atualizar a página com base no botão atualizar
    const reRender = () => {
        setKey(prevKey => prevKey + 1);
    };

    const apiUrl = process.env.API_URL;

    const rota: string = `${apiUrl}/medicine/logs`; // Alterado para o novo endpoint

    // Segunda requisição para buscar os logs filtrados pela ação selecionada
    useEffect(() => {
        setLoading(true); // Inicia o carregamento

        fetch(rota)
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
    }, [key]); // O efeito será executado sempre que `selectedAcao` mudar

    // Filtra os dados com base no texto de pesquisa
    useEffect(() => {
        if (searchText === '') {
            setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
        } else {
            const filtered = rows.filter((row) => {
                return (
                    String(row.prescricao).toLowerCase().includes(searchText.toLowerCase()) ||
                    String(row.paciente).toLowerCase().includes(searchText.toLowerCase()) ||
                    String(row.farmaceutico).toLowerCase().includes(searchText.toLowerCase())
                );
            });
            setFilteredRows(filtered);
        }
    }, [searchText, rows]); // Atualiza sempre que searchText ou rows mudar

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header></Header>
            <TabelaPharma titulo="Histórico de Prescrições do Sistema"
                subtitulo="Histórico de prescrições do sistema, como hora de separações, seus respectivos pacientes e farmacêuticos." rows={filteredRows} render={key} loading={loading} colunas={colunas}>
                <div className='flex justify-between items-center'>
                    <Stack id="pesquisar" spacing={1} direction="row" className='items-center'>
                        <TextField
                            label="Pesquisar"
                            size='small'
                            type="search"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <span></span>
                        <DatePicker
                            label="Filtrar por Data"
                            value={searchDate || null}  /* Evita data de hoje quando null */
                            onChange={handleDateChange}
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { size: "small" } }}
                        />
                    </Stack>
                    <Stack id="botoes" spacing={1} direction="row">
                        <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                        <Button variant="contained" onClick={() => exportToCSV(filteredRows, ["Prescrição", "Horário de Separação", "Paciente", "Farmacêutico"], ['prescricao', 'horaPrescricao', 'paciente', 'farmaceutico'], "historico_prescricoes")}>Exportar CSV</Button>
                    </Stack>
                </div>
            </TabelaPharma>
        </LocalizationProvider>
    )
}