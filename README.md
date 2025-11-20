# 🛡️ PhishGuard - Sistema de Detecção de Phishing com IA

> **Projeto Integrado:** Análise e Desenvolvimento de Sistemas - UNIFEOB  
> **Empresa Parceira:** Anizio Cesar Porfirio Macedo (Comércio Varejista)

![Status](https://img.shields.io/badge/Status-Finalizado-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-orange)

<img width="1201" height="936" alt="image" src="https://github.com/user-attachments/assets/f3966d9c-db1a-4fcf-97d0-efc48cac1faf" />

<img width="1198" height="946" alt="image" src="https://github.com/user-attachments/assets/d434e50c-3adf-4f0c-a476-375104586081" />


## 👨‍💼 Integrantes 

* **Jonathan Cristhiovane da Silva Macedo -	RA:24000883 -	Front-end & Documentação**
* **Thiago de Souza Barrado -	RA:24001296 -	Back-end & Arquitetura**

## 🔎 Sobre o Projeto

O **PhishGuard** é uma aplicação web desenvolvida como requisito parcial para a conclusão do semestre letivo na **UNIFEOB**. O objetivo é prover uma camada de segurança da informação acessível para pequenas empresas.

[cite_start]O projeto foi pilotado em parceria com a empresa **Anizio Cesar Porfirio Macedo**, atuante no setor de comércio varejista de hortifrutigranjeiros[cite: 9, 13, 50], visando proteger seus canais de comunicação digital contra fraudes.

## ⚠️ O Problema

A empresa parceira recebe um alto volume de e-mails de fornecedores e clientes. A dificuldade dos colaboradores em distinguir e-mails legítimos de tentativas de **Phishing** (golpes digitais) expõe o negócio a riscos como:
* Sequestro de dados (Ransomware);
* Fraudes bancárias via boletos falsos;
* Roubo de credenciais de acesso.

## 💡 A Solução

Desenvolvemos uma interface intuitiva onde o usuário cola o corpo do e-mail suspeito. O sistema processa o texto utilizando Processamento de Linguagem Natural (simulado nesta versão v1.0) para identificar gatilhos de engenharia social.

**Funcionalidades Principais:**
* **Análise de Risco:** Classificação em Nível Baixo (Verde), Médio (Amarelo) e Alto (Vermelho).
* **Detecção de Gatilhos:** Identificação de palavras-chave de urgência ("bloqueio", "senha", "imediato").
* **Relatório Visual:** Feedback instantâneo para tomada de decisão rápida.

---

## 💻 Tecnologias Utilizadas

A arquitetura foi pensada para ser leve e escalável, utilizando a stack JavaScript de ponta a ponta:

* **Front-end:**
    * HTML5 (Semântico)
    * CSS3 (Responsivo e com variáveis CSS)
    * JavaScript (Vanilla ES6+ para manipulação do DOM e Fetch API)
* **Back-end:**
    * [Node.js](https://nodejs.org/) (Runtime)
    * [Express](https://expressjs.com/) (Framework de servidor)
    * Body-Parser (Middleware de tratamento de JSON)
    * Cors (Segurança de requisições cruzadas)

---

## 📂 Estrutura do Projeto

```bash
phishguard/
├── node_modules/       # Dependências do projeto
├── public/             # Arquivos estáticos (Front-end)
│   ├── index.html      # Interface do usuário
│   ├── style.css       # Estilização
│   └── app.js          # Lógica do cliente (chamada à API)
├── server.js           # Servidor e Lógica de Análise (Back-end)
├── package.json        # Manifesto do projeto
└── README.md           # Documentação
```

## 🚀 Instalação e Execução

Para rodar o **PhishGuard** em sua máquina local, você precisará ter o [Node.js](https://nodejs.org/) instalado. Siga os passos abaixo:

```
git clone [https://github.com/seu-usuario/phishguard.git](https://github.com/seu-usuario/phishguard.git)
cd phishguard
npm install
npm start

