# 🛡️ PhishGuard - Sistema de Detecção de Phishing

**Cliente:** Anizio Cesar Porfirio Macedo (Varejo)  
**Objetivo:** Aplicação web acadêmica para análise de risco de phishing em e-mails

---

## 📋 Sobre o Projeto

PhishGuard é uma aplicação web desenvolvida em JavaScript puro (Node.js + Vanilla JS) que permite aos funcionários colar o conteúdo de um e-mail e receber uma análise automatizada do risco de phishing.

### Características Principais

✅ Interface web responsiva e profissional  
✅ Análise em tempo real com indicadores visuais  
✅ Sistema de pontuação de risco (0-100)  
✅ Detecção de palavras-chave suspeitas  
✅ Recomendações personalizadas por nível de risco  
✅ Design corporativo (tons azul escuro e cinza)  
✅ Preparado para integração futura com OpenAI API

---

## 🛠️ Tecnologias Utilizadas

### Back-End

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Body-Parser** - Middleware para parsing JSON
- **CORS** - Middleware para Cross-Origin Resource Sharing

### Front-End

- **HTML5** - Estrutura da página
- **CSS3** - Design responsivo e animações
- **Vanilla JavaScript** - Lógica do cliente

---

## 📂 Estrutura do Projeto

```
projeto_email/
│
├── server.js              # Servidor Express + API REST
├── package.json           # Dependências e configurações
│
└── public/                # Arquivos estáticos (front-end)
    ├── index.html         # Interface do usuário
    ├── style.css          # Estilos corporativos
    └── app.js             # Lógica do cliente
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** instalado em seu sistema.  
Verifique com:

```powershell
node --version
npm --version
```

### Passo 1: Instalar Dependências

Abra o PowerShell na pasta do projeto e execute:

```powershell
npm install
```

Isso instalará automaticamente:

- express
- body-parser
- cors

### Passo 2: Iniciar o Servidor

Execute o comando:

```powershell
npm start
```

Ou diretamente:

```powershell
node server.js
```

Você verá a mensagem:

```
╔══════════════════════════════════════════════════════╗
║         PhishGuard API - Sistema Iniciado           ║
╚══════════════════════════════════════════════════════╝
🚀 Servidor rodando em: http://localhost:3000
📊 Health Check: http://localhost:3000/api/health
🔒 Cliente: Anizio Cesar Porfirio Macedo
═══════════════════════════════════════════════════════
```

### Passo 3: Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

---

## 🧪 Como Testar

### Exemplos de E-mails para Testar

#### ⚠️ Risco ALTO (inclua palavras como: urgente, senha, bloqueio, suspensa)

```
Assunto: URGENTE - Sua conta será bloqueada

Prezado cliente,

Detectamos atividade suspeita em sua conta. Por favor,
clique aqui imediatamente para verificar sua senha antes
que sua conta seja suspensa permanentemente.

Equipe de Suporte
```

#### ⚡ Risco MÉDIO (inclua: oferta, clique aqui, promoção)

```
Assunto: Oferta Especial - Apenas Hoje!

Parabéns! Você ganhou uma promoção exclusiva.
Clique aqui para resgatar seu prêmio grátis.

Aproveite esta oferta limitada!
```

#### ✅ Risco BAIXO (texto normal sem palavras suspeitas)

```
Assunto: Reunião de Equipe - Quinta-feira

Olá equipe,

Gostaria de convidar todos para a reunião de alinhamento
na quinta-feira às 14h na sala de conferências.

Atenciosamente,
Gerente de Projeto
```

---

## 🔄 Integração Futura com OpenAI

O código está preparado para substituir a lógica mock pela API da OpenAI.

### Localização no Código

Abra `server.js` e procure pela seção:

```javascript
// ===============================================================
// LÓGICA MOCK DE SIMULAÇÃO (SUBSTITUIR FUTURAMENTE)
// ===============================================================
// TODO: Substituir esta lógica por chamada real à OpenAI API
```

### Passos para Integração

1. Instale o SDK da OpenAI:

```powershell
npm install openai
```

2. Crie um arquivo `.env` com sua chave:

```
OPENAI_API_KEY=sua_chave_aqui
```

3. Substitua a função `analyzeEmailMock()` por uma chamada à API:

```javascript
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "user",
      content: `Analise este email e identifique riscos de phishing: ${emailText}`,
    },
  ],
});
```

---

## 📊 API Endpoints

### POST `/api/analyze`

Analisa o conteúdo de um e-mail.

**Requisição:**

```json
{
  "emailText": "Conteúdo do e-mail aqui..."
}
```

**Resposta:**

```json
{
  "riskLevel": "Alta",
  "score": 92,
  "message": "⚠️ PERIGO: Este e-mail apresenta características típicas...",
  "flags": ["urgente", "senha", "bloqueio"]
}
```

### GET `/api/health`

Verifica o status do servidor.

**Resposta:**

```json
{
  "status": "online",
  "service": "PhishGuard API",
  "version": "1.0.0",
  "timestamp": "2025-11-20T..."
}
```

---

## 🎨 Paleta de Cores

- **Azul Primário:** `#1a3a52`
- **Azul Secundário:** `#2c5f8d`
- **Azul Accent:** `#3498db`
- **Cinza Escuro:** `#2c3e50`
- **Risco Alto:** `#e74c3c` (Vermelho)
- **Risco Médio:** `#f39c12` (Laranja)
- **Risco Baixo:** `#27ae60` (Verde)

---

## 🔒 Segurança

⚠️ **Importante:** Este é um projeto acadêmico para fins educacionais.

- Não armazena dados sensíveis
- Não faz requisições externas (versão mock)
- Processa análises localmente
- Sempre consulte o setor de TI em caso de dúvidas reais

---

## 📝 Licença

Este projeto é desenvolvido para fins acadêmicos.  
Cliente: **Anizio Cesar Porfirio Macedo**

---

## 👨‍💻 Suporte

Para dúvidas ou problemas:

1. Verifique se o servidor está rodando na porta 3000
2. Verifique o console do navegador (F12) para erros
3. Verifique o terminal do Node.js para logs do servidor

---

## 📚 Recursos Adicionais

- [Documentação Express](https://expressjs.com/)
- [Documentação Node.js](https://nodejs.org/)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

**Desenvolvido por:** Arquiteto de Software Senior  
**Data:** Novembro 2025  
**Versão:** 1.0.0
