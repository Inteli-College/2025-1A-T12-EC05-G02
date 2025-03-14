// app/login/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../login.module.css';
import { Modal, Box, Typography, Button } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação
    console.log('Tentativa de login com:', username);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.formSection}>
          <div className={styles.logoContainer}>
            <Image 
              src="/pharmatech-logo.png" 
              alt="PharmaTech Logo" 
              width={250} 
              height={30} 
              priority
            />
          </div>
          
          <h1 className={styles.title}>Login</h1>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="username">Usuário</label>
            </div>
            
            <div className={styles.inputGroup}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="password">Senha</label>
            </div>
            
            <div className={styles.forgotPassword}>
            <Button 
                  style={{
                    textTransform: 'none', // Remove o caps lock (caixa alta)
                  }}onClick={handleOpen}>Esqueci minha senha</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
              >
                <Box className={styles.modalBox}>
                  <Typography id="modal-modal-title" variant="h6" >
                    Comunique a adiministração
                  </Typography>
                  <Button className={styles.fecharModal}variant="contained"onClick={handleClose}>Fechar</Button>
                </Box>
              </Modal>
            </div>

            <div className={styles.buttonContainer}>
            <button type="submit" className={styles.loginButton}>
              ENTRAR
            </button>
            </div>
          </form>
        </div>
        
        <div className={styles.imageSection}>
          <div className={styles.messageBox}>
            
            <h2 className={styles.message}>
              Nunca foi<br />
              tão fácil<br />
              separar<br />
              remédios!
            </h2>
            
            <div className={styles.robotImageContainer}>
              <Image
                src="/robot.png" 
                alt="Robô farmacêutico"
                width={400}
                height={400}
                priority
              />
            </div>
            <div className={styles.RaioContainer}>
                <Image
                src="/raio.png" 
                alt="Robô farmacêutico"
                width={75}
                height={75}
                priority
              />
               </div>
          </div>
        </div>
      </div>
    </div>
  );
}