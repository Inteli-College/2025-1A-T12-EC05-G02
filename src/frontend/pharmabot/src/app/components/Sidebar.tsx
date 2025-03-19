"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  const menuItems = [
    { text: 'Lista de Bins', route: '/bins' },
    { text: 'Histórico Logs', route: '/historico-logs' },
    { text: 'Dashboard', route: '/dashboard' },
    { text: 'FAQ', route: '/faq' },
    { text: 'Teste', route: '/teste' },
  ];

  const list = () => (
    <Box
      sx={{
        width: 250,
        height: '100%',
        backgroundColor: '#EDEDED',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 2
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Topo com logo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/pharmatech-logo.png" alt="PharmaTech Logo" style={{ width: 150, marginBottom: 32 }} />

        {/* Lista de itens */}
        <List sx={{ width: '100%' }}>

        {menuItems.map((item, index) => {
          const isActive = pathname === item.route; // Verifica se a rota atual é igual à do menu

          return (
            <Link href={item.route} key={index} style={{ textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    pl: 3,
                    backgroundColor: isActive ? '#ccc' : 'transparent', // Cor diferente se estiver ativo
                    '&:hover': { backgroundColor: '#bbb' }
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      color: '#333',
                      fontWeight: isActive ? 'bold' : 'normal' // Deixa bold se ativo
                   }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
})}

        </List>
      </Box>

      {/* Rodapé */}
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Divider />
        <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
          Olá, Usuário
        </Typography>
        <Link href="/logout" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ mt: 1, color: 'red', cursor: 'pointer' }}>
            Logout
          </Typography>
        </Link>
      </Box>
    </Box>
  );

  const pathname = usePathname(); // para guar o link da página

  return (
    <div>
      {/* Botão menu */}
      <IconButton onClick={toggleDrawer(true)} sx={{ color: 'black', m: 1 }}>
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': { backgroundColor: '#EDEDED' },
        }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default Sidebar;
