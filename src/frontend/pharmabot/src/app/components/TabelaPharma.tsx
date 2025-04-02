"use client"

import Container from '@mui/material/Container';
import TituloTabela from './TituloTabela';
import { CircularProgress } from '@mui/material';
import Tabela from './table';
import { Column } from '../components/table';
import { Data } from './table';

interface Props {
    titulo: string
    subtitulo: string
    rows: Data[]
    render: number
    loading: boolean
    children?: React.ReactNode; // Adicionando suporte a children
    itemsPerPage?: number[];
    initialNumItems?: number;
    colunas: Column[];
    handleEdit?: any
    handleId?: any
    editar?: boolean
}

const TabelaPharma: React.FC<Props> = ({ titulo, subtitulo, rows, render, loading, itemsPerPage, initialNumItems, children, colunas, handleEdit, handleId, editar }) => {

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
                <Tabela itemsPerPage={itemsPerPage} rows={rows} render={render} initialNumItems={initialNumItems} colunas={colunas} handleEdit={handleEdit} handleId={handleId} editar={editar}/> /* Passa os dados filtrados para a tabela */
            )}
        </Container>
    )
}

export default TabelaPharma
