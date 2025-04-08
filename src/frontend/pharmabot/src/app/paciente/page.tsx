"use client"

import { useState, useEffect } from "react";
import Header from "../components/Header"
import TabelaPharma from "../components/TabelaPharma"
import { TextField, Stack, Button } from "@mui/material";
import { Column } from "../components/table";
import { Data } from "../components/table";
import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";
 
const apiUrl = process.env.API_URL;

const colunas: Column[] = [
    {id: 'nome', label: 'Nome do paciente', align: 'center'},
    {id: 'hc', label: 'Número do prontuário', align: 'center'},
    {id: 'leito', label: 'Leito', align: 'center'}
]

const input: Input[] = [
    {label: 'Nome do paciente', type: 'text', name: 'nome', required: true },
    {label: 'Número do prontuário', type: 'text', name: 'hc', required: true },
    {label: 'Leito', type: 'text', name: 'leito', required: true }
]

export default function Paciente() {

    const [loading, setLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<Data[]>([]);
    const [searchText, setSearchText] = useState<string>(''); // Estado para o texto de pesquisa
    const [filteredRows, setFilteredRows] = useState<Data[]>([]); // Estado para os dados filtrados
    const [key, setKey] = useState(0);
    const [open, setOpen] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [idEdicao, setIdEdicao] = useState<any>('')


    const reRender = () => {
        setKey(prevKey => prevKey + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
            setLoading(true); 
            const rota = `${apiUrl}/paciente/list` 
    
            fetch(rota, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "User-Agent": "Custom-User-Agent",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDA1OTM2MCwianRpIjoiMDhmNDcwZjUtZjMzZi00MjY4LTllYzEtM2JmMjBhMjJkMzFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NiwibmJmIjoxNzQ0MDU5MzYwLCJjc3JmIjoiZjRiZWYxN2UtNjU5Yy00M2M2LThjYTEtODNiMGJhMjQ0OGM3IiwiZXhwIjoxNzQ0MDYwMjYwLCJyb2xlcyI6ImFkbWluIn0.q44AOktdeTwa02xl6tRW7KqlSizQCI16KupO84o2T7A",

                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    const formattedData: Data[] = data.Pacientes.map((item: any) => ({ //NECESSÁRIO INTEGRAR COM O BACK
                        idEd : item.id,
                        nome: item.nome,
                        hc: item.hc,
                        leito: item.leito
                    }));
    
                    setRows(formattedData);
                })
                .catch((error) => console.error("Erro ao buscar pacientes:", error))
                .finally(() => setLoading(false)); // Finaliza o carregamento
        }, [key]);


        useEffect(() => {
            if (searchText === '') {
                setFilteredRows(rows); // Se não houver pesquisa, exibe todos os dados
            } else {
                const filtered = rows.filter((row) => {
                    return (
                        row.nome.toLowerCase().includes(searchText.toLowerCase())  
                    );
                });
                setFilteredRows(filtered);
            }
        }, [searchText, rows]); 

        useEffect(() => {
            setLoading(true);
            const url = `${apiUrl}/paciente/list`;

            console.log(url)
        
            fetch(url, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "User-Agent": "Custom-User-Agent",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDA1OTM2MCwianRpIjoiMDhmNDcwZjUtZjMzZi00MjY4LTllYzEtM2JmMjBhMjJkMzFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NiwibmJmIjoxNzQ0MDU5MzYwLCJjc3JmIjoiZjRiZWYxN2UtNjU5Yy00M2M2LThjYTEtODNiMGJhMjQ0OGM3IiwiZXhwIjoxNzQ0MDYwMjYwLCJyb2xlcyI6ImFkbWluIn0.q44AOktdeTwa02xl6tRW7KqlSizQCI16KupO84o2T7A"
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Dados recebidos:", data);
        
                    const formattedData: Data[] = data.Pacientes.map((item: any) => {
                        return {
                            idEd: item.id,
                            nome: item.nome,
                            hc: item.hc, 
                            leito: item.leito
                        };
                    });
        
                    console.log("Dados formatados:", formattedData);
                    setRows(formattedData);
                })
                .catch((error) => console.error("Erro ao buscar :", error))
                .finally(() => setLoading(false));
        }, [key]);        
        
        
    return(<>
        <Header></Header>
        <FormModal title="Cadastrar paciente" inputs={input} rota={`${apiUrl}/paciente/criar`} open={open} handleOpen={setOpen} ></FormModal>
        <TabelaPharma titulo="Lista de pacientes" subtitulo="Lista de todos os pacientes cadastrados" render={key} rows={filteredRows} colunas={colunas} loading={loading} editar ={true} handleEdit={setOpenEditar} handleId={setIdEdicao}>
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

