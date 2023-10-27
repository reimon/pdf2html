# Microserviço de Conversão PDF2HTML

## 📌 Descrição

Este projeto visa criar um microserviço para converter documentos PDF em HTML de forma eficiente e fiel. Ele faz uso da ferramenta `pdf2htmlEX`, integra-se com a infraestrutura da AWS (particularmente S3 e API Gateway) e tem um dashboard hospedado no Vercel.

## 🎯 Justificativa

Com a crescente demanda por digitalização e acessibilidade de conteúdo, converter documentos PDF em HTML tornou-se essencial. O objetivo é fornecer um serviço acessível e de alta qualidade sem incorrer em custos significativos.

## 💡 Objetivos

- Desenvolver um microserviço eficiente para a conversão de PDF para HTML.
- Fornecer uma interface amigável para os usuários.
- Assegurar a integridade e fidelidade da conversão.
- Implementar uma solução de custo efetivo.

## 📜 Requisitos de Alto Nível

1. Conversão precisa de PDF para HTML.
2. Interface intuitiva para carregamento de PDFs.
3. Integração com a AWS para armazenamento e processamento.
4. Dashboard acessível e responsivo no Vercel.
5. Retenção de dados limitada para arquivos convertidos.

## 🕴 Stakeholders

- **Patrocinador**: Reimon Ferreira.
- **Usuários finais**: everybody.
- **Equipe de Desenvolvimento**: Reimon...
- **Gerente de Projeto**: Reimon Ferreira
- **Equipe de Infraestrutura AWS**: Reimon Ferreira.

## ⚠️ Riscos

- Exceder os limites dos planos gratuitos da AWS ou Vercel.
- Conversões imprecisas de PDFs complexos.
- Problemas de segurança ao armazenar e processar arquivos.
- Latência na conversão e na entrega de arquivos.

## 📅 Cronograma

- **Data de Início**: 05/10/2023

## Ferramentas e Bibliotecas

O projeto faz uso das seguintes ferramentas e bibliotecas:

- **Ansible** ![Ícone do Ansible](https://ansible.com/favicon.ico)
   - Documentação: [Ansible Docs](https://docs.ansible.com/)
   - Descrição: Ferramenta de automação que permite definir e provisionar a infraestrutura de TI.

- **AWS CLI** ![Ícone do AWS](https://aws.amazon.com/favicon.ico)
   - Documentação: [AWS CLI Docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
   - Descrição: Interface de linha de comando da Amazon para interagir e gerenciar serviços AWS.

- **Boto e Boto3**
   - Documentação: [Boto3 Docs](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
   - Descrição: Bibliotecas Python para integração com serviços da Amazon Web Services (AWS).

---

### Como Utilizar

1. Instale e configure o [Ansible](https://docs.ansible.com/) e o [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).
2. Certifique-se de instalar as bibliotecas Python `boto` e `boto3` para permitir a interação programática com a AWS.

---


## 💰 Orçamento

O orçamento é focado principalmente em recursos humanos e possíveis despesas adicionais. Estimativa atual: $50.

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Qualquer contribuição, seja através de sugestões, melhorias ou identificação de bugs, é muito bem-vinda. Por favor, consulte o guia de contribuição antes de enviar um PR.

## 📋 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

