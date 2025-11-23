// ===================================================================
// PhishGuard - API Backend (Integração OpenAI / ChatGPT)
// Cliente: Anizio Cesar Porfirio Macedo (Varejo)
// ===================================================================

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai"); // Importa a biblioteca da OpenAI

const app = express();
const PORT = 3000;

// Configuração da OpenAI
// Certifique-se de ter OPENAI_API_KEY no seu arquivo .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// ===================================================================
// ROTA PRINCIPAL - ANÁLISE DE PHISHING
// ===================================================================
app.post("/api/analyze", async (req, res) => {
  try {
    const { emailText } = req.body;

    // Validação de entrada
    if (!emailText || emailText.trim().length === 0) {
      return res.status(400).json({
        error: true,
        message: "O texto do e-mail não pode estar vazio.",
      });
    }

    // ===============================================================
    // TENTATIVA 1: ANÁLISE COM OPENAI (GPT-4o-mini)
    // ===============================================================
    try {
      console.log("🤖 Iniciando análise com OpenAI...");

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Modelo rápido e econômico
        response_format: { type: "json_object" }, // FORÇA o retorno JSON
        messages: [
          {
            role: "system",
            content: `Você é o PhishGuard, um especialista em Cibersegurança.
            Sua tarefa é analisar e-mails e detectar Phishing.
            
            Retorne APENAS um JSON com esta estrutura:
            {
                "riskLevel": "Alta" | "Média" | "Baixa",
                "score": (0-100),
                "message": "Justificativa curta",
                "flags": ["gatilho1", "gatilho2"]
            }`,
          },
          {
            role: "user",
            content: `Analise este e-mail:\n"${emailText}"`,
          },
        ],
        temperature: 0.1, // Baixa criatividade (mais precisão)
      });

      // Pega o conteúdo da resposta
      const textResponse = completion.choices[0].message.content;
      const jsonFinal = JSON.parse(textResponse);

      console.log("✅ OpenAI respondeu com sucesso.");
      return res.json(jsonFinal);
    } catch (aiError) {
      // ===============================================================
      // FALLBACK: SE A OPENAI FALHAR (Erro de conta/crédito), USA MOCK
      // ===============================================================
      console.warn(
        "⚠️ Falha na OpenAI. Usando modo Offline (Mock).",
        aiError.message
      );

      const resultMock = analyzeEmailMock(emailText);
      resultMock.message += " (Análise Offline - Falha na Conexão)";

      return res.json(resultMock);
    }
  } catch (error) {
    console.error("Erro crítico:", error);
    res.status(500).json({ error: true, message: "Erro interno." });
  }
});

// ===================================================================
// FUNÇÃO MOCK (Mantida como Backup de Segurança)
// ===================================================================
function analyzeEmailMock(emailText) {
  const textLower = emailText.toLowerCase();
  const highRiskKeywords = [
    "urgente",
    "senha",
    "bloqueio",
    "suspensa",
    "clique aqui",
    "imediato",
    "cancelamento",
    "dados bancários",
  ];

  let flagsFound = highRiskKeywords.filter((w) => textLower.includes(w));
  let score = 10;
  let riskLevel = "Baixa";
  let message = "E-mail parece seguro.";

  if (flagsFound.length >= 2) {
    riskLevel = "Alta";
    score = 90;
    message = "CUIDADO: E-mail com características de Phishing.";
  } else if (flagsFound.length === 1) {
    riskLevel = "Média";
    score = 60;
    message = "ATENÇÃO: Contém termos suspeitos.";
  }

  return {
    riskLevel,
    score,
    message,
    flags: flagsFound.length > 0 ? flagsFound : ["nenhum indicador suspeito"],
  };
}

// Inicialização
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("╔══════════════════════════════════════════════════════╗");
    console.log("║         PhishGuard API - Sistema Iniciado           ║");
    console.log("╚══════════════════════════════════════════════════════╝");
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`🤖 Integração IA: ATIVADA (Gemini 1.5 Flash)`);
    console.log("═══════════════════════════════════════════════════════");
  });
}

module.exports = app;
