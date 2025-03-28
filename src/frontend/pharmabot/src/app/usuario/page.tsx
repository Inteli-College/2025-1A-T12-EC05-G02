"use client";

import Header from "../components/Header";
import TabelaPharma from "../components/TabelaPharma";
import { Column, Data } from "../components/table";
import { TextField, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import FormUsuario from "./FormUsuario"; // componente de modal para cadastro

// Define as colunas da tabela
const colunas: Column[] = [
  { id: 'id', label: 'ID', minWidth: 150 },
  { id: 'usuario', label: 'Usuário', align: 'center', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 200 },
  { id: 'role', label: 'Função', minWidth: 150 }, // Adicionando role
  { id: 'data', label: 'Data do Cadastro', minWidth: 150, format: (value: Date) => value.toLocaleString("pt-BR") },
];

export default function UsuariosCadastrados() {
  const [rows, setRows] = useState<Data[]>([]);
  const [filteredRows, setFilteredRows] = useState<Data[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState(0);
  const [open, setOpen] = useState(false); // controla o modal

  // Atualiza a tabela (trigger no botão Atualizar)
  const reRender = () => {
    setKey(prev => prev + 1);
  };

  const apiUrl = process.env.API_URL;

  // Busca os usuários na API
  useEffect(() => {
    setLoading(true);

    fetch(`https://bf7a-204-199-57-14.ngrok-free.app/user/list`)
      .then(res => res.json())
      .then(data => {
        const formatted: Data[] = data.Usuários.map((user: any) => ({
          id: user.id,
          usuario: user.nome,
          email: user.email,
          role: user.role, // Adicionando o role à tabela
          data: new Date(user.datacadastro)
        }));
        setRows(formatted);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [key]);

  // Filtra com base no campo de busca
  useEffect(() => {
    if (!searchText) {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) =>
        row.usuario.toLowerCase().includes(searchText.toLowerCase()) ||
        row.email.toLowerCase().includes(searchText.toLowerCase()) ||
        row.role.toLowerCase().includes(searchText.toLowerCase()) // Filtro por role também
      );
      setFilteredRows(filtered);
    }
  }, [searchText, rows]);

  return (
    <>
      <Header />
      <FormUsuario open={open} handleOpen={setOpen} />

      <TabelaPharma
        loading={loading}
        titulo="Usuários cadastrados"
        subtitulo="Lista e cadastro de usuários"
        render={key}
        rows={filteredRows}
        colunas={colunas}
      >
        {/* Filtro e botões */}
        <div className='flex justify-between items-center'>
          <TextField
            label="Pesquisar"
            size='small'
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Stack id="botoes" spacing={1} direction="row">
            <Button variant="outlined" color="black" onClick={reRender}>Atualizar</Button>
            <Button variant="contained" onClick={() => setOpen(true)}>Criar Usuário</Button>
          </Stack>
        </div>
      </TabelaPharma>
    </>
  );
}