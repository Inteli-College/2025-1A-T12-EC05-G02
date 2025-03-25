"use client";

import Header from "../components/Header"; // Header com Sidebar embutida
import TabelaPharma from "../components/TabelaPharma"; // Tabela genérica reutilizável
import { Column, Data } from "../components/table"; // Tipagens reutilizadas da tabela

// Definição das colunas da tabela
const colunas: Column[] = [
  { id: 'id', label: 'ID', minWidth: 150 },
  { id: 'usuario', label: 'Usuário', align: 'center', minWidth: 170 },
  { id: 'email', label: 'email', minWidth: 200 },
  { id: 'data', label: 'data do cadastro', minWidth: 170 },
];

export default function UsuariosCadastrados() {
  // Dados mockados temporariamente
  const rowsMock: Data[] = [
    { id: "01", usuario: 'Mateus', email: 'mateus01@gmail.com', data: '25/03/2025' }
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {/* Header que já inclui Sidebar */}
        <Header />

        {/* Tabela renderizada com título e dados mock */}
        <TabelaPharma
          titulo="Usuários cadastrados"
          subtitulo="Lista e cadastro de usuários"
          rows={rowsMock}
          colunas={colunas}
          render={0}
          loading={false}
        />
      </div>
    </div>
  );
}
