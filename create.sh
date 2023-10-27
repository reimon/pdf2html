#!/bin/bash

# Definindo o nome do diretório principal
PROJECT_DIR="pdf2html"

# Criando a estrutura de diretórios
echo "Criando a estrutura de diretórios para o projeto $PROJECT_DIR..."

mkdir -p "$PROJECT_DIR"

# Diretórios do backend
mkdir -p "$PROJECT_DIR/backend/uploads"

# Diretórios do frontend
mkdir -p "$PROJECT_DIR/frontend/public"
mkdir -p "$PROJECT_DIR/frontend/converted"

# Mensagem de conclusão
echo "Estrutura de diretórios criada com sucesso."

# Listando a estrutura criada
tree "$PROJECT_DIR"
