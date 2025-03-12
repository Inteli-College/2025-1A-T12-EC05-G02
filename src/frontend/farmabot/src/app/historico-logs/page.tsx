"use client"; // Isso força o componente a rodar no lado do cliente

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TituloTabela from "../components/TituloTabela";
import SelectButton from '../components/SelectButton';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, CircularProgress } from '@mui/material';
import Tabela from './table';

// Extensão da paleta para incluir 'black'
declare module '@mui/material/styles' {
    interface Palette {
        black: Palette['primary'];
    }

    interface PaletteOptions {
        black?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        black: true;
    }
}

// Criando um tema compatível
const theme = createTheme({
    palette: {
        black: {
            main: '#000000',
            light: alpha("#000000", 0.5),
            dark: alpha("#000000", 0.9),
            contrastText: '#FFFFFF',
        },
    },
});

interface Data {
    id: string;
    dataHora: Date;
    acao: string;
    detalhes: string;
    responsavel: string;
}

export default function Historico() {
    const [rows, setRows] = useState<Data[]>([]);
    const [key, setKey] = useState(0);
    const [acao, setAcao] = useState<string[]>([]);
    const [selectedAcao, setSelectedAcao] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para controle de carregamento
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados


    //função para atualizar a página com base no botão atualizar
    const reRender = () => {
        setKey(prevKey => prevKey + 1);
        setSelectedAcao('')
    };

    // Primeira requisição para buscar as ações
    useEffect(() => {
        setLoading(true); // Inicia o carregamento
        fetch('http://127.0.0.1:5000/user/logs')
            .then((response) => response.json())
            .then((data) => {
                // Função para filtrar valores únicos
                function onlyUnique(value: any, index: any, array: string[]) {
                    return array.indexOf(value) === index;
                }

                // Gerar lista de ações únicas
                let acaoList = data.Logs.map((item: any) => typeof item.acao === 'string' ? item.acao : '');
                acaoList = acaoList.filter(onlyUnique);
                setAcao(acaoList);  // Armazenando corretamente como array de strings
            })
            .catch((error) => console.error("Erro ao buscar ações:", error))
            .finally(() => setLoading(false)); // Finaliza o carregamento
    }, []);  // Esse efeito executa apenas uma vez quando o componente for montado

    // Segunda requisição para buscar os logs filtrados pela ação selecionada
    useEffect(() => {
        setLoading(true); // Inicia o carregamento
        // Montar a URL com base na ação selecionada
        const url = selectedAcao
            ? `http://127.0.0.1:5000/user/logs?acao=${selectedAcao}`
            : 'http://127.0.0.1:5000/user/logs';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Transformar os dados no formato esperado
                const formattedData: Data[] = data.Logs.map((item: any) => ({
                    id: item.id.toString(),
                    dataHora: new Date(item.data_hora), // Converter string para Date
                    acao: item.acao,
                    detalhes: item.detalhes,
                    responsavel: "José do Banco",
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
                    row.responsavel.toLowerCase().includes(searchText.toLowerCase())
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
        <ThemeProvider theme={theme}>
            <header>Placeholder para o header</header>
            <Container maxWidth="lg" className='shadow-sm p-2'>
                <TituloTabela
                    titulo="Histórico de Ações do Sistema"
                    subtitulo="Aqui você encontra o histórico de ações do sistema, como início de separações e recebimentos de pedidos"
                />
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
                            items={acao}
                            onSelect={handleAcaoChange}
                            render={key}
                        />
                        <FilterAltIcon className='opacity-70' />
                    </Stack>
                    <Stack id="botoes" spacing={1} direction="row">
                        <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                        <Button variant="contained">Exportar CSV</Button>
                    </Stack>
                </div>

                {/* Mostrar animação de loading enquanto está buscando os dados */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <CircularProgress />
                    </div>
                ) : (
                    <Tabela rows={filteredRows} render={key} /> /* Passa os dados filtrados para a tabela */
                )}
            </Container>
        </ThemeProvider>
    );
}
