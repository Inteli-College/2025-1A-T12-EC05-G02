import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { SquarePen } from 'lucide-react';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

export interface Data {
  [key: string]: any; // Permite campos adicionais
}

interface Props {
  rows: Data[];
  render: number;
  initialNumItems?: number;
  itemsPerPage?: number[];
  colunas: Column[];
  handleEdit?: (args:any ) => void
  handleId?: (args:any ) => void
  editar?: boolean
}

const Tabela: React.FC<Props> = ({ rows, render, itemsPerPage = [15, 50, 100], initialNumItems = 15, colunas, handleEdit, handleId, editar }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialNumItems);
  const [data, setData] = useState<string>(''); // Inicie com uma string vazia

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setData(new Date().toLocaleString('pt-BR')); // Atribui uma string de data formatada
  }, [render]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className='mt-5'>
      <TableContainer>
        <Table aria-label="caption table">
          <caption>Última Atualização: {data}</caption>
          <TableHead>
            <TableRow>
              {colunas.map((col) => (
                <TableCell key={col.id} align={col.align || 'left'}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginação aplicada aqui
              .map((row, index) => (
                <TableRow className='hover:bg-gray-50 transition' key={index}>
                  {colunas.map((col) => {
                    console.log(col.id)
                    if (col.id == 'id') {
                      return (<TableCell key={col.id} align={col.align || 'left'}> {/* Wrap the button inside a <td> */}
                        {editar && row.id && (
                          <Button variant='contained' onClick={() => handleEdit && handleEdit(true) && handleId && handleId(row.id)}>
                            <SquarePen />
                          </Button>
                        )}
                      </TableCell>)
                    }
                    const value = row[col.id];
                    return (
                      <TableCell key={col.id} align={col.align || 'left'}>
                        {col.format ? col.format(value) : String(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Componente de Paginação */}
      <TablePagination
        rowsPerPageOptions={itemsPerPage}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
      />
    </Paper>
  );
}

export default Tabela;
