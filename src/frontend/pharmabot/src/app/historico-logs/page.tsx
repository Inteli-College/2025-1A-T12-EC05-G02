"use client"; // Isso força o componente a rodar no lado do cliente

import { useState, useEffect } from 'react';
import SelectButton from '../components/SelectButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { exportToCSV } from '../(util)/exportToCSV';
import TabelaPharma from '../components/TabelaPharma';
import { Column } from '../components/table';
import { Data } from '../components/table';
import Header from '../components/Header';

const colunas: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'dataHora', label: 'Data e Hora', minWidth: 150, format: (value: Date) => value.toLocaleString('pt-BR') },
    { id: 'acao', label: 'Ação', minWidth: 170 },
    { id: 'detalhes', label: 'Detalhes', minWidth: 200 },
    { id: 'responsavel', label: 'Responsável', minWidth: 170},
  ];


export default function HistoricoLogs() {
    const [rows, setRows] = useState<Data[]>([]);
    const [key, setKey] = useState(0);
    const [selectedAcao, setSelectedAcao] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para controle de carregamento
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados


    //função para atualizar a página com base no botão atualizar
    const reRender = () => {
        setKey(prevKey => prevKey + 1);
        setSelectedAcao('')
    };
    const apiUrl = process.env.API_URL;
    const rota: string = `${apiUrl}/user/logs`;

    // Segunda requisição para buscar os logs filtrados pela ação selecionada
    useEffect(() => {
        setLoading(true); // Inicia o carregamento
        // Montar a URL com base na ação selecionada
        const url = selectedAcao
            ? `${apiUrl}/user/logs?acao=${selectedAcao}`
            : rota;

        fetch(url, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "Custom-User-Agent", // Alternative way to bypass
              "Authorization": `Bearer ${document.cookie.split('token=')[1]}` // Add JWT token
            }
        })
            .then((response) => response.json())
            .then((data) => {
            // Transformar os dados no formato esperado
            const formattedData: Data[] = data.Logs.map((item: any) => ({
                id: item.id.toString(),
                dataHora: new Date(item.data_hora), // Converter string para Date
                acao: item.acao,
                detalhes: item.detalhes,
                responsavel: item.responsavel,
            }));

            setRows(formattedData);
            })
            .catch((error) => console.error("Erro ao buscar logs:", error))
            .finally(() => setLoading(false)); // Finaliza o carregamento
    }, [selectedAcao, key]);  // O efeito será executado sempre que `selectedAcao` mudar

    // Filtra os dados com base no texto de pesquisa
    useEffect(() => {
        if (searchText === '') {
            setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
        } else {
            const filtered = rows.filter((row) => {
                return (
                    row.id.includes(searchText) ||
                    row.acao.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.detalhes.toLowerCase().includes(searchText.toLowerCase()) ||
                    String(row.responsavel).toLowerCase().includes(searchText.toLowerCase())
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

    return (<>
        <Header></Header>
        <TabelaPharma titulo="Histórico de Ações do Sistema"
            subtitulo="Aqui você encontra o histórico de ações do sistema, como início de separações e recebimentos de pedidos" rows={filteredRows} render={key} loading={loading} colunas={colunas}>
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
                    <SelectButton
                        atributo='acao'
                        label='Ação'
                        onSelect={handleAcaoChange}
                        render={key}
                        rota={rota}
                    />
                </Stack>
                <Stack id="botoes" spacing={1} direction="row">
                    <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                    <Button variant="contained" onClick={() => exportToCSV(filteredRows, ["ID", "Data e Hora", "Ação", "Detalhes", "Responsável"], ['id', 'dataHora', 'acao', 'detalhes', 'responsavel'], "historico-acoes")}>Exportar CSV</Button>
                </Stack>
            </div>
        </TabelaPharma>
    </>
    );
}
