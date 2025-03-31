#!/bin/bash

# Reinicia os pm2
pm2 restart all

# Aguarda alguns segundos para garantir que os processos foram reiniciados
sleep 2

# Inicia o Ngrok em background
ngrok http 6001 --config ~/.ngrok2/ngrok-user1.yml > /dev/null &

# Aguarda alguns segundos para garantir que o túnel foi iniciado
sleep 2

# Captura a URL pública do Ngrok
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[0].public_url')

echo "Seu domínio do Ngrok é: $NGROK_URL"

# Cria um .env com a URL do Ngrok
echo "API_URL='$NGROK_URL'" > /home/ec05-g2/2025-1A-T12-EC05-G02/src/frontend/pharmabot/.env

# Builda o frontend
cd /home/ec05-g2/2025-1A-T12-EC05-G02/src/frontend/pharmabot
npm run build
sleep 2

# Reinicia o pm2 para aplicar as mudanças
pm2 restart all

# Aguarda alguns segundos para garantir que os processos foram reiniciados
sleep 2

# Inicia o Ngrok em background
ngrok http 80 --config ~/.ngrok2/ngrok-user2.yml > /dev/null &

# Aguarda alguns segundos para garantir que o túnel foi iniciado
sleep 2

# Captura a URL pública do Ngrok do frontend
NGROK_URL_FRONT=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[1].public_url')

echo "Seu domínio do Ngrok do frontend é: $NGROK_URL_FRONT"