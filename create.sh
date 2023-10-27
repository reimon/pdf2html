#!/bin/bash

# Criando a estrutura de diretórios
echo "Criando a estrutura de diretórios para o projeto $PROJECT_DIR..."


# Diretórios do backend
mkdir -p "backend/uploads"

# Diretórios do frontend
mkdir -p "frontend/public"
mkdir -p "frontend/converted"

# Mensagem de conclusão
echo "Estrutura de diretórios criada com sucesso."

echo "Instalando sistema"
npm install -y