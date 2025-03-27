"use client"; // Indica que este componente deve ser renderizado no lado do cliente 

import React, { useState } from 'react'; // Importa React e useState para gerenciar o estado de abertura/fechamento da sidebar
import Box from '@mui/material/Box'; // Componente contêiner flexível do MUI para estruturação do layout
import SwipeableDrawer from '@mui/material/SwipeableDrawer'; // Componente do MUI que permite criar uma sidebar deslizante 
import IconButton from '@mui/material/IconButton'; // Botão icônico do MUI (usado para o botão do menu hamburguer)
import List from '@mui/material/List'; // Componente para listas (menu de navegação)
import ListItem from '@mui/material/ListItem'; // Item individual da lista
import ListItemButton from '@mui/material/ListItemButton'; // Botão clicável dentro do ListItem
import ListItemText from '@mui/material/ListItemText'; // Texto dentro de cada item da lista
import MenuIcon from '@mui/icons-material/Menu'; // Ícone de "menu" (hamburguer) para abrir a sidebar
import Divider from '@mui/material/Divider'; // Linha divisória (usado para separar o rodapé do restante da sidebar)
import Link from 'next/link'; // Componente do Next.js para navegação entre páginas sem recarregar a página
import Typography from '@mui/material/Typography'; // Componente de texto do MUI (usado para exibir textos no rodapé)
import { usePathname } from 'next/navigation'; // Hook do Next.js para obter o caminho atual da página (usado para destacar o item ativo da sidebar)

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar se a sidebar está aberta (true) ou fechada (false)

  const pathname = usePathname(); // Captura o caminho atual da página (ex: "/dashboard") para destacar o item correspondente no menu

  // Função para abrir ou fechar a sidebar
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    // Previne o comportamento padrão ao pressionar Tab ou Shift
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open); // Atualiza estado da sidebar
  };

  // Lista dos itens do menu com textos e rotas correspondentes
  const menuItems = [
    { text: 'Home', route: '/home' },
    { text: 'Lista de Bins', route: '/bins' },
    { text: 'Histórico De Logs', route: '/historico-logs' },
    { text: 'Dashboard', route: '/kanban' },
    { text: 'Estoque', route: '/estoque' },
    { text: 'Histórico de prescrições', route: '/historico-prescricoes'},
    { text: 'Usuarios', route: '/usuario' },
  ];

  // Função que retorna o conteúdo interno da sidebar
  const list = () => (
    <Box
      sx={{
        width: 250, // Largura da sidebar
        height: '100%', // Altura da tela inteira
        backgroundColor: '#EDEDED', // Cor de fundo cinza claro
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Separa topo e rodapé
        paddingTop: 2
      }}
      role="presentation"
      onClick={toggleDrawer(false)} // Fecha a sidebar ao clicar em qualquer item
      onKeyDown={toggleDrawer(false)} // Fecha a sidebar ao usar teclado
    >
      {/* TOPO DA SIDEBAR: Logo + Menu */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Logo PharmaTech */}
        <img src="/pharmatech-logo.png" alt="PharmaTech Logo" style={{ width: 150, marginBottom: 32 }} />

        {/* Lista de itens do menu */}
        <List sx={{ width: '100%' }}>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.route; // Verifica se o caminho atual corresponde à rota do item

            return (
              <Link href={item.route} key={index} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 3,
                      backgroundColor: isActive ? '#ccc' : 'transparent', // Cor diferente para o item ativo
                      '&:hover': { backgroundColor: '#bbb' } // Cor ao passar o mouse
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        color: '#333',
                        fontWeight: isActive ? 'bold' : 'normal' // Texto em bold se ativo
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>

      {/* RODAPÉ DA SIDEBAR: Nome do usuário + Logout */}
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Divider />
        <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
          Olá, Usuário 
          {/* Futuramente substituir pelo nome real do usuário logado via auth */}
        </Typography>
        <Link href="/logout" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ mt: 1, color: 'red', cursor: 'pointer' }}>
            Logout
          </Typography>
        </Link>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* BOTÃO MENU (hamburguer) que abre a sidebar */}
      <IconButton onClick={toggleDrawer(true)} sx={{ color: '#FFFBFF', m: 0}}>
        <MenuIcon className='mr-4 ml-0'/>
      </IconButton>

      {/* COMPONENTE SwipeableDrawer que controla a sidebar deslizante */}
      <SwipeableDrawer
        anchor='left' // Sidebar desliza da esquerda
        open={isOpen} // Define se está aberta
        onClose={toggleDrawer(false)} // Fecha ao clicar fora
        onOpen={toggleDrawer(true)} // Abre ao clicar no botão
        sx={{
          '& .MuiDrawer-paper': { backgroundColor: '#EDEDED' }, // Cor do drawer igual à sidebar
        }}
      >
        {list()} {/* Insere o conteúdo da sidebar */}
      </SwipeableDrawer>
    </div>
  );
};

export default Sidebar; // Exporta o componente para ser usado em outras partes do projeto
