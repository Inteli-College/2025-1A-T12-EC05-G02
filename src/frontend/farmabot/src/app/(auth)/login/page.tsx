// app/login/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
              <a href="/forgot-password">Esqueci minha senha</a>
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
              remédios !
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
          </div>
        </div>
      </div>
    </div>
  );
}