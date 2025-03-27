"use client"

import Header from "../components/Header"
import TabelaPharma from "../components/TabelaPharma"
import { useState, useEffect } from "react";
import { Data } from "../components/table";
import { TextField, Stack, Button } from "@mui/material";
import { Column } from "../components/table";
import FormRegistro from "./FormRegistro";
import FormEditar from "./FormEditar";

const colunas: Column[] = [
    { id: 'item', label: 'Item', minWidth: 150 },
    { id: 'codigoIdentificacao', label: 'Código de Identificação', align: 'center', minWidth: 170 },
    { id: 'localizacao', label: 'Localização', minWidth: 200 },
    { id: 'quantidade', label: 'Quantidade', minWidth: 170 },
    { id: 'ultimaAtualizacao', label: 'Última Atualização', minWidth: 150, format: (value: Date) => value.toLocaleString('pt-BR') },
]

export default function Estoque() {
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para controle de carregamento
    const [rows, setRows] = useState<Data[]>([]);
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados
    const [key, setKey] = useState(0);
    const [open, setOpen] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [idEdicao, setIdEdicao] = useState<any>('')


    //função para atualizar a página com base no botão atualizar
    const reRender = () => {
        setKey(prevKey => prevKey + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const rota = `http://10.32.0.8:6001/estoque`

    useEffect(() => {
        setLoading(true); // Inicia o carregamento
        // Montar a URL com base na ação selecionada
        const url = rota //NECESSARIO INTEGRAR COM O BACK

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Transformar os dados no formato esperado
                const formattedData: Data[] = data.estoque.map((item: any) => ({ //NECESSÁRIO INTEGRAR COM O BACK
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
            .finally(() => setLoading(false)); // Finaliza o carregamento
    }, [key]);  // O efeito será executado sempre que `selectedAcao` mudar

    // Filtra os dados com base no texto de pesquisa
    useEffect(() => {
        if (searchText === '') {
            setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
        } else {
            const filtered = rows.filter((row) => {
                return (
                    row.item.includes(searchText) ||
                    row.codigoIdentificacao.toLowerCase().includes(searchText.toLowerCase()) ||
                    row.localizacao.toLowerCase().includes(searchText.toLowerCase())
                );
            });
            setFilteredRows(filtered);
        }
    }, [searchText, rows]); // Atualiza sempre que `searchText` ou `rows` mudar


    return (<>
        <Header></Header>
        <FormEditar open={openEditar} handleOpen={setOpenEditar} rota={rota + '/criar' + idEdicao}></FormEditar>
        <FormRegistro open={open} handleOpen={setOpen} />
        <TabelaPharma loading={loading} titulo="Estoque" subtitulo="Produtos da farmácia e suas respectivas quantidades" render={key} rows={filteredRows} colunas={colunas} handleEdit={setOpenEditar} handleId={setIdEdicao} editar={false}>
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

    </>)
}