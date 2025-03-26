"use client"; // Isso força o componente a rodar no lado do cliente

import { useState, useEffect } from 'react';
import TabelaPharma from '../components/TabelaPharma';
import { Column } from '../components/table';
import { Data } from '../components/table';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import SelectButton from '../components/SelectButton';
import TextField from '@mui/material/TextField';
import { exportToCSV } from '../(util)/exportToCSV';
import Header from '../components/Header';

const colunas: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'data_pedido', label: 'Hora da Separação', minWidth: 150, format: (value: Date) => value.toLocaleString('pt-BR') },
    { id: 'paciente_id', label: 'ID Paciente', minWidth: 200 },
    { id: 'prioridade', label: 'Prioridade', minWidth: 170 },
    { id: 'liberado_por', label: 'ID Farmacêutico', minWidth: 170 },
];

export default function HistoricoPrescricoes() {

    const [rows, setRows] = useState<Data[]>([]);
    const [key, setKey] = useState(0);
    const [selectedAcao, setSelectedAcao] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para controle de carregamento
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados

    // Função para atualizar a página com base no botão atualizar
    const reRender = () => {
        setKey(prevKey => prevKey + 1);
        setSelectedAcao('')
    };

    const rota: string = 'http://127.0.0.1:5555/medicine/prescription/list'; // Alterado para o novo endpoint

    // Segunda requisição para buscar os logs filtrados pela ação selecionada
    useEffect(() => {
      setLoading(true); // Inicia o carregamento
      // Montar a URL com base na ação selecionada
    const url = selectedAcao
        ? `http://127.0.0.1:5555/medicine/prescription/list?acao=${selectedAcao}`
        : rota;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Transformar os dados no formato esperado
          const formattedData: Data[] = data.prescriptions.map((item: any) => ({
            id: item.id.toString(),
            status: item.status,
            data_pedido: new Date(Date.parse(item.data_pedido)), // Garantir que a string seja convertida corretamente para Date
            paciente_id: item.paciente_id,
            prioridade: item.prioridade,
            liberado_por: item.liberado_por,
          }));

          setRows(formattedData);
        })
        .catch((error) => console.error("Erro ao buscar logs:", error))
        .finally(() => setLoading(false)); // Finaliza o carregamento
    }, [selectedAcao, key, rota]); // O efeito será executado sempre que selectedAcao, key, rota ou filtro mudar

    // Filtra os dados com base no texto de pesquisa
    useEffect(() => {
        if (searchText === '') {
            setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
        } else {
            const filtered = rows.filter((row) => {
                return (
                    row.id.includes(searchText) ||
                    row.status.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.data_pedido.toLocaleString('pt-BR').toLowerCase().includes(searchText.toLowerCase()) ||
                    String(row.liberado_por).toLowerCase().includes(searchText.toLowerCase()) ||
                    String(row.paciente_id).toLowerCase().includes(searchText.toLowerCase()) ||
                    String(row.prioridade).toLowerCase().includes(searchText.toLowerCase())
                );
            });
            setFilteredRows(filtered);
        }
    }, [searchText, rows]); // Atualiza sempre que searchText ou rows mudar

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    // Função para atualizar a ação selecionada
    const handleAcaoChange = (newAcao: string) => {
        setSelectedAcao(newAcao);
    };

    return (<>
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
                </Stack>
                <Stack id="botoes" spacing={1} direction="row">
                    <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                    <Button variant="contained" onClick={() => exportToCSV(filteredRows, ["ID", "Status", "Data e Hora", "HC Paciente", "Prioridade", "Responsável"], ['id', 'status', 'data_pedido', 'paciente_id', 'prioridade', 'liberado_por'], "historico_pedidos")}>Exportar CSV</Button>
                </Stack>
            </div>
        </TabelaPharma>
        </>
    )
}