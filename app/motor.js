/* Quiz Leadhunter — motor de resultado.
 * Porta fiel de logica/motor.py. NÃO mude a lógica aqui: mude logica/quiz-config.json e rode o build.
 * Testado contra o motor.py por logica/teste-paridade.py.
 */
(function (root) {
const Q = root.QUIZ;
/* ---------- motor de resultado (porta de logica/motor.py) ---------- */
const DES_N = ["GEN", "REF", "MAE", "CAC", "ESP"];
const DES_C = ["TAL", "FAN", "VIA", "FOG"];
function somar(perguntas, resp, chaves) {
  const pontos = Object.fromEntries(chaves.map((k) => [k, 0]));
  const flags = new Set();
  let autoridade = 0, decisor = true;
  for (const p of perguntas) {
    const op = p.opcoes[resp[p.id]];
    if (!op) continue;
    for (const [k, v] of Object.entries(op.pontos || {})) pontos[k] += v;
    if (op.flag) flags.add(op.flag);
    autoridade += op.autoridade || 0;
    if (op.decisor === false) decisor = false;
  }
  return { pontos, flags, autoridade, decisor };
}
function calcularNegocio(r) {
  const P = Q.config.perguntas_negocio;
  const { pontos, flags, autoridade, decisor } = somar(P, r, DES_N);
  const sc = (id) => P.find((p) => p.id === id).opcoes[r[id]].score;
  const score = sc("Q3") + sc("Q10") + (decisor ? 1 : 0) + (r.Q9 !== "E" ? 1 : 0);
  let temperatura = score >= 6 ? "QUENTE" : score >= 3 ? "MORNO" : "FRIO";
  let resultado;
  if (flags.has("TICKET_BAIXO") || (flags.has("B2C") && flags.has("BUDGET_BAIXO"))) resultado = "EXP";
  else if (flags.has("B2C")) resultado = "ESP";
  else if (autoridade <= 2 && flags.has("QUER_AUTORIDADE")) resultado = "ESP";
  else {
    const cand = new Set(DES_N);
    // Corte do Serviço Completo: R$ 100 mil+/mês E time de vendas mínimo
    if (!(flags.has("FAT_100K") && flags.has("TIME_MINIMO"))) { cand.delete("GEN"); cand.delete("REF"); }
    if (flags.has("TEM_TIME")) cand.delete("GEN");
    const melhor = Math.max(...[...cand].map((c) => pontos[c]));
    const emp = DES_N.filter((c) => cand.has(c) && pontos[c] === melhor);
    resultado = emp.length > 1 && autoridade <= 2 && emp.includes("ESP") ? "ESP" : emp[0];
  }
  if (resultado === "EXP") temperatura = "FRIO";
  return {
    trilha: "NEGOCIO", resultado, pontos, autoridade, score, temperatura, flags: [...flags],
    seloAutoridade: autoridade <= 2 && ["CAC", "MAE", "GEN", "REF"].includes(resultado),
    conviteCarreira: flags.has("CONVITE_CARREIRA"),
  };
}
function calcularCarreira(r) {
  const { pontos } = somar(Q.config.perguntas_carreira, r, DES_C);
  const melhor = Math.max(...Object.values(pontos));
  return { trilha: "CARREIRA", resultado: DES_C.find((c) => pontos[c] === melhor), pontos, temperatura: "CARREIRA" };
}

root.calcularNegocio = calcularNegocio;
root.calcularCarreira = calcularCarreira;
})(typeof window !== "undefined" ? window : globalThis);
