// ===================================================================
// PhishGuard - API Backend
// Cliente: Anizio Cesar Porfirio Macedo (Varejo)
// Desenvolvido por: Arquiteto de Software Senior
// ===================================================================

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve arquivos estáticos da pasta public

// ===================================================================
// ROTA PRINCIPAL - ANÁLISE DE PHISHING
// ===================================================================
app.post("/api/analyze", (req, res) => {
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
    // LÓGICA MOCK DE SIMULAÇÃO (SUBSTITUIR FUTURAMENTE)
    // ===============================================================
    // TODO: Substituir esta lógica por chamada real à OpenAI API
    // Exemplo de integração futura:
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const response = await openai.chat.completions.create({
    //     model: "gpt-4",
    //     messages: [{ role: "user", content: `Analise este email...` }]
    // });
    // ===============================================================

    const result = analyzeEmailMock(emailText);

    // Retorna o resultado da análise
    res.json(result);
  } catch (error) {
    console.error("Erro ao processar análise:", error);
    res.status(500).json({
      error: true,
      message: "Erro interno ao processar a análise.",
    });
  }
});

// ===================================================================
// FUNÇÃO MOCK DE ANÁLISE (Simulação de IA)
// ===================================================================
function analyzeEmailMock(emailText) {
  const textLower = emailText.toLowerCase();

  // Dicionário de palavras suspeitas categorizadas
  const highRiskKeywords = [
    "urgente",
    "senha",
    "bloqueio",
    "suspensa",
    "verificar conta",
    "confirme seus dados",
    "expire",
    "imediato",
    "cancelamento",
    "bloqueada",
    "suspensão",
    "irregular",
    "pendente",
    "documento anexo",
    "clique imediatamente",
    "dados bancários",
    "cartão de crédito",
  ];

  const mediumRiskKeywords = [
    "oferta",
    "clique aqui",
    "promoção",
    "ganhe",
    "prêmio",
    "desconto",
    "grátis",
    "parabéns",
    "sorteio",
    "ganhar",
    "exclusivo",
    "limitado",
    "aproveite",
    "cadastre-se",
  ];

  // Padrões adicionais de risco
  const urlPattern = /(http|https):\/\/[^\s]+/gi;
  const urls = emailText.match(urlPattern) || [];
  const hasMultipleUrls = urls.length > 2;
  const hasSuspiciousChars = /[₽₿€$£¥]/g.test(emailText);

  // Detecta palavras encontradas
  let flagsFound = [];
  let highRiskCount = 0;
  let mediumRiskCount = 0;

  highRiskKeywords.forEach((keyword) => {
    if (textLower.includes(keyword)) {
      flagsFound.push(keyword);
      highRiskCount++;
    }
  });

  mediumRiskKeywords.forEach((keyword) => {
    if (textLower.includes(keyword)) {
      if (!flagsFound.includes(keyword)) {
        flagsFound.push(keyword);
      }
      mediumRiskCount++;
    }
  });

  // Adiciona flags por outros padrões
  if (hasMultipleUrls) {
    flagsFound.push("múltiplos links detectados");
  }
  if (hasSuspiciousChars) {
    flagsFound.push("caracteres suspeitos encontrados");
  }

  // ===================================================================
  // CLASSIFICAÇÃO DE RISCO
  // ===================================================================
  let riskLevel, score, message;

  if (highRiskCount >= 2 || (highRiskCount >= 1 && hasMultipleUrls)) {
    // RISCO ALTO
    riskLevel = "Alta";
    score = 85 + Math.floor(Math.random() * 15); // 85-100
    message =
      "⚠️ PERIGO: Este e-mail apresenta características típicas de phishing. " +
      "Não clique em links, não forneça dados pessoais e não baixe anexos. " +
      "Encaminhe para o setor de TI imediatamente.";
  } else if (mediumRiskCount >= 2 || highRiskCount === 1 || hasMultipleUrls) {
    // RISCO MÉDIO
    riskLevel = "Média";
    score = 50 + Math.floor(Math.random() * 30); // 50-80
    message =
      "⚡ ATENÇÃO: Este e-mail contém elementos suspeitos. " +
      "Verifique o remetente cuidadosamente antes de qualquer ação. " +
      "Em caso de dúvida, consulte o setor de TI.";
  } else {
    // RISCO BAIXO
    riskLevel = "Baixa";
    score = 10 + Math.floor(Math.random() * 30); // 10-40
    message =
      "✅ SEGURO: Este e-mail aparenta ser legítimo. " +
      "Ainda assim, sempre verifique o remetente e tenha cautela ao clicar em links.";
  }

  return {
    riskLevel,
    score,
    message,
    flags:
      flagsFound.length > 0
        ? flagsFound
        : ["nenhum indicador suspeito detectado"],
  };
}

// ===================================================================
// ROTA DE HEALTH CHECK
// ===================================================================
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "PhishGuard API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ===================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ===================================================================
app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║         PhishGuard API - Sistema Iniciado           ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔒 Cliente: Anizio Cesar Porfirio Macedo`);
  console.log("═══════════════════════════════════════════════════════");
});
