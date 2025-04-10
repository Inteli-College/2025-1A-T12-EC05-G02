"use client"

import { useState, useEffect } from "react";
import Header from "../components/Header"
import TabelaPharma from "../components/TabelaPharma"
import { TextField, Stack, Button, Typography } from "@mui/material";
import { Column } from "../components/table";
import { Data } from "../components/table";
import FormModal from "../components/FormModal";
import { Input } from "../components/FormModal";
import FormEdit from "./FormEdit";
import CustomModal from "../components/Modal";
 
const apiUrl = process.env.API_URL;

const colunas: Column[] = [
	{id: 'nomeBin', label: 'Número do Bin', align: 'center'},
	{id: 'nomeMedicamento', label: 'Medicamento', align: 'center'},
	{id: 'quantidade', label: 'Quantidade', align: 'center'},
	{id: 'coordenadas', label: 'Coordenadas - X / Y / Z ', align: 'center'},
	{id: 'idEd', label: ''}
]

const input: Input[] = [
	{label: 'Numero do bin', type: 'text', name: 'nomeBin', required: true },
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
	const [openEditar, setOpenEditar] = useState(false);
	const [idEdicao, setIdEdicao] = useState<any>('');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<string>('');


	const reRender = () => {
    	setKey(prevKey => prevKey + 1);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    	setSearchText(event.target.value);
	};

	useEffect(() => {
		setLoading(true); // Inicia o carregamento
		// Montar a URL com base na ação selecionada
		const rota = `${apiUrl}/bins` //NECESSARIO INTEGRAR COM O BACK

		fetch(rota, {
			headers: {
				"ngrok-skip-browser-warning": "true",
				"User-Agent": "Custom-User-Agent", // Alternative way to bypass
				"Authorization": `Bearer ${document.cookie.split('token=')[1]}` // Add JWT token
			}
		})
			.then((response) => response.json())
			.then((data) => {
				// Transformar os dados no formato esperado
				console.log(data)
				const formattedData: Data[] = data.bins.map((item: any) => ({ //NECESSÁRIO INTEGRAR COM O BACK
					idEd : item.id,
					nomeBin: item.nomeBin,
					nomeMedicamento: item.nomeMedicamento,
					quantidade: item.quantidade,
					coordeandas: item.coordenada_json
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
                    	row.nomeMedicamento.toLowerCase().includes(searchText.toLowerCase())  
                	);
            	});
            	setFilteredRows(filtered);
        	}
    	}, [searchText, rows]);

        useEffect(() => {
            setLoading(true);
            const url = `${apiUrl}/bins/list`;
        
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
                            idEd: item.id,
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

    	<FormEdit open={openEditar} handleOpen={setOpenEditar} rota={apiUrl + '/bins' + '/editar/' + idEdicao} >
    	</FormEdit>
    	<FormModal title="Cadastrar bin" inputs={input} rota={`${apiUrl}/bins/criar`} open={open} handleOpen={setOpen} ></FormModal>
    	<TabelaPharma titulo="Lista de bins" subtitulo="Lista de todos os bins cadastrados" render={key} rows={filteredRows} colunas={colunas} loading={loading} editar ={true} handleEdit={setOpenEditar} handleId={setIdEdicao}>
        	<div className='flex justify-between items-center'>
            	<TextField
                	label="Pesquisar"
                	size='small'
                	type="search"
                	value={searchText}
                	onChange={handleSearchChange}
            	/>
            	<Stack id="botoes" spacing={1} direction="row">
                	<Button
                    	variant="outlined"
                    	onClick={async () => {
                        	try {
                            	const response = await fetch(`${apiUrl}/getRobotCoordinates`, {
									headers: {
										"ngrok-skip-browser-warning": "true",
										"User-Agent": "Custom-User-Agent", // Alternative way to bypass
										"Authorization": `Bearer ${document.cookie.split('token=')[1]}` // Add JWT token
									}})
									
                            	const data = await response.json();
                            	setModalContent(`Coordenadas do robô: \n \n X = ${data.x} \n Y = ${data.y} \n Z = ${data.z} \n \n`);
                            	setModalOpen(true);
                        	} catch (error) {
                            	console.error("Erro ao buscar coordenadas do robô:", error);
                            	setModalContent("Erro ao buscar coordenadas do robô.");
                            	setModalOpen(true);
                        	}
                    	}}
                	>
                    	Ver Coordenadas do Robô
                	</Button>
                	<CustomModal
                    	open={modalOpen}
                    	onClose={() => setModalOpen(false)}
                    	title="Informações do robô"
                    	idForm=""
                	>
                    	<Typography dangerouslySetInnerHTML={{ __html: modalContent.replace(/\n/g, '<br />') }} />
                	</CustomModal>
                	<Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
                	<Button variant="contained" onClick={() => setOpen(true)}>Cadastrar</Button>
            	</Stack>
        	</div>
    	</TabelaPharma>
	</>   
	)
}