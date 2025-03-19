"use client"

import Container from '@mui/material/Container';
import TituloTabela from './TituloTabela';
import { CircularProgress } from '@mui/material';
import Tabela from './table';

interface Data {
    [key: string]: any;
}

interface Props {
    titulo: string
    subtitulo: string
    rows: Data[]
    render: number
    loading: boolean
    children?: React.ReactNode; // Adicionando suporte a children
}

const TabelaPharma: React.FC<Props> = ({ titulo, subtitulo, rows, render, loading, children }) => {

    return (
        <Container maxWidth="lg" className='shadow-sm p-2 mt-4'>
            <TituloTabela
                titulo={titulo}
                subtitulo={subtitulo}
            />
            {children}
            {/* Mostrar animação de loading enquanto está buscando os dados */}
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <CircularProgress />
                </div>
            ) : (
                <Tabela rows={rows} render={render} /> /* Passa os dados filtrados para a tabela */
            )}
        </Container>
    )
}

export default TabelaPharma
