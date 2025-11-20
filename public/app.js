// ===================================================================
// PhishGuard - Lógica do Front-End
// Cliente: Anizio Cesar Porfirio Macedo (Varejo)
// ===================================================================

// Constantes e Configuração
const API_URL = "http://localhost:3000/api/analyze";

// Elementos do DOM
const emailInput = document.getElementById("emailInput");
const charCount = document.getElementById("charCount");
const analyzeBtn = document.getElementById("analyzeBtn");
const loadingIndicator = document.getElementById("loadingIndicator");
const resultCard = document.getElementById("resultCard");
const newAnalysisBtn = document.getElementById("newAnalysisBtn");

// Elementos de Resultado
const riskBadge = document.getElementById("riskBadge");
const riskLevel = document.getElementById("riskLevel");
const scoreValue = document.getElementById("scoreValue");
const scoreBarFill = document.getElementById("scoreBarFill");
const messageIcon = document.getElementById("messageIcon");
const resultMessage = document.getElementById("resultMessage");
const flagsList = document.getElementById("flagsList");
const recommendationsList = document.getElementById("recommendationsList");

// ===================================================================
// Event Listeners
// ===================================================================

// Atualiza contador de caracteres
emailInput.addEventListener("input", () => {
  const length = emailInput.value.length;
  charCount.textContent = length.toLocaleString("pt-BR");

  // Alerta visual quando próximo do limite
  if (length > 9500) {
    charCount.style.color = "#e74c3c";
    charCount.style.fontWeight = "bold";
  } else {
    charCount.style.color = "#7f8c8d";
    charCount.style.fontWeight = "normal";
  }
});

// Botão de Análise
analyzeBtn.addEventListener("click", handleAnalysis);

// Permite análise ao pressionar Ctrl+Enter no textarea
emailInput.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    handleAnalysis();
  }
});

// Botão Nova Análise
newAnalysisBtn.addEventListener("click", resetForm);

// ===================================================================
// Função Principal de Análise
// ===================================================================
async function handleAnalysis() {
  const emailText = emailInput.value.trim();

  // Validação
  if (!emailText) {
    showError("Por favor, cole o conteúdo do e-mail antes de analisar.");
    return;
  }

  if (emailText.length < 10) {
    showError(
      "O texto do e-mail é muito curto. Por favor, forneça mais conteúdo."
    );
    return;
  }

  // Desabilita botão e mostra loading
  analyzeBtn.disabled = true;
  analyzeBtn.style.opacity = "0.6";
  loadingIndicator.style.display = "block";
  resultCard.style.display = "none";

  try {
    // Faz requisição para a API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailText }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Verifica se há erro na resposta
    if (data.error) {
      throw new Error(data.message || "Erro ao processar análise");
    }

    // Pequeno delay para melhor UX (simula processamento)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Exibe resultado
    displayResult(data);
  } catch (error) {
    console.error("Erro ao analisar e-mail:", error);
    showError(
      "Erro ao conectar com o servidor. Verifique se o servidor está rodando na porta 3000."
    );
  } finally {
    // Reabilita botão e esconde loading
    analyzeBtn.disabled = false;
    analyzeBtn.style.opacity = "1";
    loadingIndicator.style.display = "none";
  }
}

// ===================================================================
// Exibir Resultado da Análise
// ===================================================================
function displayResult(data) {
  const { riskLevel: level, score, message, flags } = data;

  // Determina classe de risco
  const riskClass = getRiskClass(level);

  // Atualiza Badge de Risco
  riskBadge.className = `risk-badge ${riskClass}`;
  riskLevel.textContent = level;

  // Atualiza Score
  scoreValue.textContent = score;
  scoreBarFill.style.width = `${score}%`;
  scoreBarFill.className = `score-bar-fill ${riskClass}`;

  // Atualiza Mensagem
  messageIcon.textContent = getRiskIcon(level);
  resultMessage.textContent = message;

  // Atualiza Flags
  displayFlags(flags);

  // Atualiza Recomendações
  displayRecommendations(level);

  // Mostra card de resultado com animação
  resultCard.style.display = "block";
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ===================================================================
// Exibir Flags Detectadas
// ===================================================================
function displayFlags(flags) {
  flagsList.innerHTML = "";

  if (!flags || flags.length === 0) {
    flagsList.innerHTML =
      '<span class="flag-item">✅ Nenhum indicador suspeito</span>';
    return;
  }

  flags.forEach((flag) => {
    const flagElement = document.createElement("span");
    flagElement.className = "flag-item";
    flagElement.innerHTML = `
            <span class="flag-icon">🚩</span>
            <span>${capitalizeFirst(flag)}</span>
        `;
    flagsList.appendChild(flagElement);
  });
}

// ===================================================================
// Exibir Recomendações
// ===================================================================
function displayRecommendations(level) {
  const recommendations = {
    Alta: [
      "NÃO clique em nenhum link presente no e-mail",
      "NÃO forneça dados pessoais, senhas ou informações bancárias",
      "NÃO baixe ou abra anexos",
      "Encaminhe o e-mail imediatamente para o setor de TI",
      "Marque o e-mail como spam/phishing",
      "Delete o e-mail após reportar ao TI",
    ],
    Média: [
      "Verifique cuidadosamente o endereço do remetente",
      "Passe o mouse sobre os links (sem clicar) para ver o destino real",
      "Em caso de dúvida, entre em contato diretamente com a empresa (não use dados do e-mail)",
      "Consulte o setor de TI antes de qualquer ação",
      "Não forneça dados sensíveis sem confirmar a legitimidade",
    ],
    Baixa: [
      "Sempre verifique o remetente antes de abrir anexos",
      "Mantenha cautela ao clicar em links",
      "Verifique se o domínio do remetente é legítimo",
      "Em caso de solicitação incomum, confirme por outro canal",
      "Mantenha seu antivírus atualizado",
    ],
  };

  const recs = recommendations[level] || recommendations["Baixa"];

  recommendationsList.innerHTML = "";
  recs.forEach((rec) => {
    const li = document.createElement("li");
    li.textContent = rec;
    recommendationsList.appendChild(li);
  });
}

// ===================================================================
// Funções Auxiliares
// ===================================================================

// Retorna classe CSS baseada no nível de risco
function getRiskClass(level) {
  const classes = {
    Alta: "high",
    Média: "medium",
    Baixa: "low",
  };
  return classes[level] || "low";
}

// Retorna ícone baseado no nível de risco
function getRiskIcon(level) {
  const icons = {
    Alta: "⚠️",
    Média: "⚡",
    Baixa: "✅",
  };
  return icons[level] || "ℹ️";
}

// Capitaliza primeira letra
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Exibe mensagem de erro
function showError(message) {
  alert(`⚠️ ${message}`);
  emailInput.focus();
}

// Reseta o formulário
function resetForm() {
  emailInput.value = "";
  charCount.textContent = "0";
  resultCard.style.display = "none";
  emailInput.focus();

  // Scroll suave para o topo do formulário
  document.querySelector(".analysis-card").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// ===================================================================
// Inicialização
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🛡️ PhishGuard - Sistema Iniciado");
  console.log("📋 Cliente: Anizio Cesar Porfirio Macedo");
  emailInput.focus();

  // Easter egg: Ctrl+Shift+D para modo debug
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      console.log("🔧 Modo Debug Ativado");
      console.log("API URL:", API_URL);
      console.log("Elementos carregados:", {
        emailInput: !!emailInput,
        analyzeBtn: !!analyzeBtn,
        resultCard: !!resultCard,
      });
    }
  });
});

// ===================================================================
// Tratamento de Erros Globais
// ===================================================================
window.addEventListener("error", (e) => {
  console.error("Erro global capturado:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejeitada:", e.reason);
});
