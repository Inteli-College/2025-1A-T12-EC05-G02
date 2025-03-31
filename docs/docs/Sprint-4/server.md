---
sidebar_position: 3
slug: /sprint-4/server
description: Documentação do servidor do projeto, na sprint 4.
---

# Servidor

Abaixo estão as instruções para configurar e executar o servidor, além de informações sobre o uso de ferramentas como PM2, Nginx e Ngrok. Este servidor foi configurado para hospedar um front-end em Next.js na porta 80 e um back-end em Flask na porta 6001.

## Configuração do Servidor

### PM2
PM2 é usado para gerenciar o processo do servidor Node.js (Next.js). Siga os passos abaixo para configurar:

1. Instale o PM2 globalmente:
    ```bash
    npm install -g pm2
    ```
2. Inicie o front-end:

    - Realize o build do front-end antes de iniciar o PM2:
    ```bash
    cd frontend
    npm install
    npm run build
    ```

    - Inicie o front-end com PM2:
    ```bash
    pm2 start npm --name "PharmaBot Frontend" -- start
    ```

3. Inicie o back-end com PM2:
    ```bash
    pm2 start app.py --name "PharmaBot Backend" --interpreter python3
    ```
4. Salve a configuração para reiniciar automaticamente:
    ```bash
    pm2 save
    pm2 startup
    ```

### Nginx
Nginx é usado como um proxy reverso para o front-end e o back-end. Configure-o da seguinte forma:

1. Instale o Nginx:
    ```bash
    sudo apt update
    sudo apt install nginx
    ```
2. Edite o arquivo de configuração:
    ```bash
    sudo nano /etc/nginx/conf.d/pharmabot.conf
    ```
    Exemplo de configuração:
    ```nginx
    server {
         listen 80;
         server_name _;

         location / {
              proxy_pass http://localhost:3000;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
         }
    }
    server {
         listen 6001;
         server_name _;

         location / {
              proxy_pass http://localhost:5555;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
         }
    }
    ```
3. Teste e reinicie o Nginx:
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

### Ngrok
Ngrok é usado para expor o servidor local para a internet. Siga os passos abaixo:

1. Instale o Ngrok:
    - Baixe o binário do site oficial: [ngrok.com](https://ngrok.com/)
    - Extraia e adicione ao PATH.

2. Crie duas contas no Ngrok e obtenha os respectivos authtokens.

    - Acesse o painel do Ngrok para cada conta e copie os authtokens correspondentes.

3. Como estamos usando um plano gratuito, o Ngrok só permite um subdomínio por vez. Portanto, usamos duas contas para expor o front-end e o back-end.
    - Para o primeiro profile:
        ```bash
        mkdir ~/.ngrok2
        nano ~/.ngrok2/ngrok-user1.yml
        ```
    
        Adicione o seguinte conteúdo:
        ```yaml
        version: 2
        authtoken: SEU_TOKEN_USER1
        ```

    - Para o segundo profile:
        ```bash
        mkdir ~/.ngrok2
        nano ~/.ngrok2/ngrok-user2.yml
        ```

        Adicione o seguinte conteúdo:
        ```yaml
        version: 2
        authtoken: SEU_TOKEN_USER2
        ```

4. Inicie o Ngrok para o front-end:
    ```bash
    ngrok http 80 --config ~/.ngrok2/ngrok-user1.yml
    ```

5. Inicie o Ngrok para o back-end:
    ```bash
    ngrok http 6001 --config ~/.ngrok2/ngrok-user2.yml
    ```

### Reload
Após realizar alterações no código, é necessário reiniciar o PM2 para aplicar as mudanças. Use os seguintes comandos:
- Para reiniciar o PM2:
    ```bash
    pm2 restart all
    ```
- Para reiniciar o back-end:
    ```bash
    pm2 restart "PharmaBot Backend"
    ```
- Para reiniciar o front-end:
    ```bash
    pm2 restart "PharmaBot Frontend"
    ```
- Após qualquer alteração na configuração do Nginx, reinicie o serviço:
    ```bash
    sudo systemctl restart nginx
    ```

### Monitoramento
- Use `pm2 monit` para monitorar o servidor.
- Verifique os logs com:
  ```bash
  pm2 logs
  ```

Com essas ferramentas, o servidor está configurado para hospedar o front-end e o back-end, sendo gerenciado, acessível e monitorado de forma eficiente.