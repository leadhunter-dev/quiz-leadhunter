/**
 * Salva cada lead do quiz numa Planilha Google (grátis, sem servidor).
 *
 * Como usar (5 minutos):
 * 1. Crie uma Planilha Google nova (ex.: "Leads Quiz Leadhunter").
 * 2. Menu Extensões → Apps Script. Apague o que tiver e cole este arquivo inteiro. Salve.
 * 3. Clique em Implantar → Nova implantação → tipo "App da Web".
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 4. Autorize, copie a URL que termina em /exec e cole em WEBHOOK_URL no app.js.
 * 5. Faça o quiz uma vez para testar: a linha aparece na aba "Leads".
 */
const COLUNAS = [
  "data", "nome", "whatsapp", "email", "linkedin", "genero", "trilha", "arquetipo", "arquetipo_nome",
  "temperatura", "autoridade", "alerta_autoridade", "pontos", "respostas", "utm", "pagina",
];

function doPost(e) {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName("Leads") || planilha.insertSheet("Leads");
  if (aba.getLastRow() === 0) aba.appendRow(COLUNAS.concat(["status", "observações"]));
  const d = JSON.parse(e.postData.contents);
  aba.appendRow(COLUNAS.map((c) => d[c] ?? ""));
  return ContentService.createTextOutput("ok");
}
