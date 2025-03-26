"use client"

import { useState, useEffect } from "react";
import Header from "../components/Header"
import TabelaPharma from "../components/TabelaPharma"
import { TextField, Stack, Button } from "@mui/material";
import { Column } from "../components/table";
import { Data } from "../components/table";
import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";


const colunas: Column[] = [
    {id: 'id', label: 'id', align: 'center'},
    {id: 'nomeBin', label: 'Nome do Bin', align: 'center'},
    {id: 'nomeMedicamento', label: 'Medicamento', align: 'center'},
    {id: 'quantidade', label: 'Quantidade', align: 'center'},
    {id: 'coordenadas', label: 'Coordenadas - X / Y / Z ', align: 'center'}
]

const input: Input[] = [
    {label: 'Nome do bin', type: 'text', name: 'nomeBin', required: true },
    {label: 'Nome do Medicamento', type: 'text', name: 'nomeMedicamento', required: true },
    {label: 'quantidade', type: 'number', name: 'quantidade', required: true },
    {label: 'Coordenadas - x', type: 'text', name: 'x', required: true },
    {label: 'Coordenadas - y', type: 'text', name: 'y', required: true },
    {label: 'Coordenadas - z', type: 'text', name: 'z', required: true },
]

export default function Bins() {

    const [loading, setLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<Data[]>([]);
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados
    const [key, setKey] = useState(0);
    const [open, setOpen] = useState(false);

    const reRender = () => {
        setKey(prevKey => prevKey + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
            setLoading(true); // Inicia o carregamento
            // Montar a URL com base na ação selecionada
            const url = `http://127.0.0.1:5555/bins` //NECESSARIO INTEGRAR COM O BACK
    
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    // Transformar os dados no formato esperado
                    const formattedData: Data[] = data.bins.map((item: any) => ({ //NECESSÁRIO INTEGRAR COM O BACK
                        id: item.id,
                        nomeBin: item.nomeBin,
                        nomeMedicamento: item.nomeMedicamento,
                        quantidade: item.quantidade,
                        coordenadas: item.coordenada_json
                    }));
    
                    setRows(formattedData);
                })
                .catch((error) => console.error("Erro ao buscar bins:", error))
                .finally(() => setLoading(false)); // Finaliza o carregamento
        }, [key]);


        useEffect(() => {
            if (searchText === '') {
                setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
            } else {
                const filtered = rows.filter((row) => {
                    return (
                        row.id.includes(searchText) ||
                        row.nomeBin.toLowerCase().includes(searchText.toLowerCase()) ||
                        row.nomeMedicamento.toLowerCase().includes(searchText.toLowerCase()) ||
                        String(row.quantidade).toLowerCase().includes(searchText.toLowerCase()) ||
                        row.coordenadas.includes(searchText.toLowerCase()) 
                    );
                });
                setFilteredRows(filtered);
            }
        }, [searchText, rows]); 

        useEffect(() => {
            setLoading(true);
            const url = `http://127.0.0.1:5555/bins/list`;
        
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados recebidos:", data);
        
                    const formattedData: Data[] = data.Bin.map((item: any) => {
                        let coordenadasFormatadas = "N/A"; // Caso as coordenadas não existam
        
                        try {
                            if (item.coordenadas) {
                                const coordenadasObj = JSON.parse(item.coordenadas); // Converte a string JSON para objeto
                                coordenadasFormatadas = `${ coordenadasObj.x } / ${ coordenadasObj.y } / ${ coordenadasObj.z }`;
                            }
                        } catch (error) {
                            console.error("Erro ao converter coordenadas:", error);
                        }
        
                        return {
                            id: item.id,
                            nomeBin: item.nomeBin,
                            nomeMedicamento: item.nomeMedicamento || "N/A", // Caso não venha do backend
                            quantidade: item.quantidade || 0, // Caso não venha do backend
                            coordenadas: coordenadasFormatadas,
                        };
                    });
        
                    console.log("Dados formatados:", formattedData);
                    setRows(formattedData);
                })
                .catch((error) => console.error("Erro ao buscar bins:", error))
                .finally(() => setLoading(false));
        }, [key]);        
        
        
    return(<>
        <Header></Header>
        <FormModal title="Cadastrar bin" inputs={input}  rota="http://127.0.0.1:5555/bins/criar" open={open} handleOpen={setOpen} ></FormModal>
        <TabelaPharma titulo="Lista de bins" subtitulo="Lista de todos os bins cadastrados" render={key} rows={filteredRows} colunas={colunas} loading={loading} >
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
                    <Button variant="contained" onClick={() => setOpen(true)}>Cadastrar</Button>
                </Stack>
            </div>
        </TabelaPharma>
    </>
        
    )
    
}

