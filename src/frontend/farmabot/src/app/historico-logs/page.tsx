"use client"; // Isso força o componente a rodar no lado do cliente

import { useState } from 'react';
import Container from '@mui/material/Container';
import TituloTabela from "../components/TituloTabela";
import SelectButton from '../components/SelectButton';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button } from '@mui/material';
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

// Exemplo de dados
const rows: Data[] = [
    { id: '1', dataHora: new Date("Mon Mar 11 2025 14:38:15 GMT+0000 (Coordinated Universal Time)")
        , acao: 'Criado', detalhes: 'Registro criado com sucesso', responsavel: 'João' },
    { id: '2', dataHora: new Date("Mon Mar 11 2025 14:38:15 GMT+0000 (Coordinated Universal Time)"), acao: 'Editado', detalhes: 'Registro atualizado', responsavel: 'Maria' },
    { id: '3', dataHora: new Date("Mon Mar 11 2025 14:38:15 GMT+0000 (Coordinated Universal Time)"), acao: 'Deletado', detalhes: 'Registro excluído', responsavel: 'Carlos' },
    { id: '4', dataHora: new Date("Mon Mar 11 2025 14:38:15 GMT+0000 (Coordinated Universal Time)"), acao: 'Aprovado', detalhes: 'Registro aprovado', responsavel: 'Ana' },
    { id: '5', dataHora: new Date("Mon Mar 11 2025 14:38:15 GMT+0000 (Coordinated Universal Time)"), acao: 'Rejeitado', detalhes: 'Registro rejeitado', responsavel: 'Pedro' },
    { id: '6', dataHora: new Date("Mon Mar 11 2025 14:38:15 GMT+0000 (Coordinated Universal Time)"), acao: 'Rejeitado', detalhes: 'Registro rejeitado', responsavel: 'Pedro' },
  
  ];


export default function Historico() {
    const [key, setKey] = useState(0);
    
    const reRender = () => {  
        setKey(prevKey => prevKey + 1);  
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
                        <TextField label="Pesquisar" size='small' type="search" />
                        <span></span>
                        <SelectButton 
                            atributo='acao' 
                            label='Ação' 
                            items={["item mockado 1", "item mockado 2", "item mockado 3"]}
                        />
                        <FilterAltIcon className='opacity-70' />
                    </Stack>
                    <Stack id="botoes" spacing={1} direction="row">
                        <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                        <Button variant="contained">Exportar CSV</Button>
                    </Stack>
                </div>
                <Tabela render={key} rows={rows}/>
            </Container>
        </ThemeProvider>
    );
}
