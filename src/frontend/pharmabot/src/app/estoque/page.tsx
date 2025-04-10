"use client"

import Header from "../components/Header"
import TabelaPharma from "../components/TabelaPharma"
import { useState, useEffect } from "react";
import { Data } from "../components/table";
import { TextField, Stack, Button } from "@mui/material";
import { Column } from "../components/table";
import FormRegistro from "./FormRegistro";
import FormEditar from "./FormEditar";
import Cookies from "js-cookie";

const colunas: Column[] = [
    { id: 'item', label: 'Item', minWidth: 150 },
    { id: 'codigoIdentificacao', label: 'Código de Identificação', align: 'center', minWidth: 170 },
    { id: 'localizacao', label: 'Localização', minWidth: 200 },
    { id: 'quantidade', label: 'Quantidade', minWidth: 170 },
    {
        id: 'ultimaAtualizacao',
        label: 'Última Atualização',
        minWidth: 150,
        format: (value: Date) => value.toLocaleString('pt-BR')
    },
];

export default function Estoque() {
    const [loading, setLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<Data[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<Data[]>([]);
    const [key, setKey] = useState(0);
    const [open, setOpen] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [idEdicao, setIdEdicao] = useState<any>('');
    const [token, setToken] = useState<string | null>(null);

    const apiUrl = process.env.API_URL;
    const rota = `${apiUrl}/estoque/`;

    const reRender = () => {
        setKey(prevKey => prevKey + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

   

    // Buscar os dados do estoque
    useEffect(() => {
        if (!token) return;

        setLoading(true);
        fetch(rota, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "User-Agent": "Custom-User-Agent",
                "Authorization": `Bearer ${document.cookie.split('token=')[1]}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const formattedData: Data[] = data.estoque.map((item: any) => ({
                    item: item.nome_medicamento.toString(),
                    codigoIdentificacao: item.medicamento_id,
                    localizacao: item.bin_localizacao,
                    quantidade: item.quantidade.toString(),
                    ultimaAtualizacao: new Date(item.ultima_atualizacao).toLocaleDateString("pt-br"),
                    idEd: item.id
                }));

                setRows(formattedData);
            })
            .catch((error) => console.error("Erro ao buscar estoque:", error))
            .finally(() => setLoading(false));
    }, [key, token]);

    // Filtro da pesquisa
    useEffect(() => {
        if (searchText === '') {
            setFilteredRows(rows);
        } else {
            const filtered = rows.filter((row) =>
                row.item.toLowerCase().includes(searchText.toLowerCase()) ||
                String(row.codigoIdentificacao).toLowerCase().includes(searchText.toLowerCase()) ||
                row.localizacao.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRows(filtered);
        }
    }, [searchText, rows]);

    return (
        <>
            <Header />
            <FormEditar
                open={openEditar}
                handleOpen={setOpenEditar}
                rota={rota + '/criar' + idEdicao}
            />
            <FormRegistro open={open} handleOpen={setOpen} />
            <TabelaPharma
                loading={loading}
                titulo="Estoque"
                subtitulo="Produtos da farmácia e suas respectivas quantidades"
                render={key}
                rows={filteredRows}
                colunas={colunas}
                handleEdit={setOpenEditar}
                handleId={setIdEdicao}
                editar={false}
            >
                <div className='flex justify-between items-center'>
                    <TextField
                        label="Pesquisar"
                        size='small'
                        type="search"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <Stack id="botoes" spacing={1} direction="row">
                        <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                        <Button variant="contained" onClick={() => setOpen(true)}>Criar Item</Button>
                    </Stack>
                </div>
            </TabelaPharma>
        </>
    );
}
