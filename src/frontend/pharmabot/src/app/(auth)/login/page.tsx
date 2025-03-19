// app/login/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../login.module.css';
import { Modal, Box, Typography, Button } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    // Função para validar email
    const validateEmail = (email: string) => {
      if (!email) return false;
      const hasAtSymbol = email.includes('@');
      const endsWithDotCom = email.endsWith('.com');
      return hasAtSymbol && endsWithDotCom;
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação do email
    if (!validateEmail(email)) {
      setEmailError('Insira um email válido');
      return;
    }
    
    // Limpa o erro se o email for válido
    setEmailError('');

    console.log('Tentativa de login com:', email);
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
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
              {emailError && <p className={styles.errorMessage}>{emailError}</p>}
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