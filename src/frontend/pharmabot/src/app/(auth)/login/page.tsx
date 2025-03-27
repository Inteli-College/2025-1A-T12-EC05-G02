'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../login.module.css';
import { Modal, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função para validar email
  const validateEmail = (email: string) => {
    if (!email) return false;
    const hasAtSymbol = email.includes('@');
    return hasAtSymbol;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Validação do email
    if (!validateEmail(email)) {
      setLoginError('Insira um email válido');
      return;
    }
    
    // Limpa o erro se o email for válido
    setEmailError('');
    
    try {
      setIsLoading(true);
      
      // Dados para enviar ao backend
      const loginData = { 
        email: email,
        senha: password
      };
      
      // Fazendo a requisição para o backend
      const response = await fetch('http://10.32.0.8:6001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
            
      if (response.status === 401) {
        // Caso específico para credenciais inválidas
        setLoginError('Email ou senha incorretos');
      } else if (!response.ok) {
        // Outros erros do servidor
        setLoginError('Erro ao fazer login. Tente novamente.');
      } else {
        // Login bem-sucedido
        router.push('/home');
      }
      
    } catch (error) {
      // Erro de rede ou outro erro não esperado
      setLoginError('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
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
          
          {loginError && (
            <div className={`${styles.errorAlert || 'p-2 mb-4 bg-red-100 text-red-800 rounded'}`}>
              {loginError}
            </div>
          )}
          
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
                  textTransform: 'none',
                }}
                onClick={handleOpen}
              >
                Esqueci minha senha
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
              >
                <Box className={styles.modalBox}>
                  <Typography id="modal-modal-title" variant="h6">
                    Comunique a administração
                  </Typography>
                  <Button 
                    className={styles.fecharModal}
                    variant="contained"
                    onClick={handleClose}
                  >
                    Fechar
                  </Button>
                </Box>
              </Modal>
            </div>

            <div className={styles.buttonContainer}>
              <button 
                type="submit" 
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'ENTRAR'}
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