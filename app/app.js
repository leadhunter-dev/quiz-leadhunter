/* Quiz Leadhunter — "Que tipo de caçador(a) você é?"
 * Motor de formulário: SurveyJS Form Library (MIT). Conteúdo: quiz-data.js (gerado por build.py).
 * Configure as 3 linhas abaixo e publique a pasta app/ em qualquer hospedagem estática.
 */
const CONFIG = {
  WEBHOOK_URL: "",            // URL do Google Apps Script (ver planilha-google-apps-script.js). Vazio = não salva os leads.
  PAGINA_CARREIRA_URL: "",    // Link da página de conteúdo sobre carreira. Vazio = esconde o link.
  WHATSAPP: window.QUIZ.config.whatsapp,
};

const Q = window.QUIZ;
const ARQ = Q.config.arquetipos;
const $ = (id) => document.getElementById(id);

/* ---------- utilidades ---------- */
let generoAtual = "m";
const genero = (txt, g = generoAtual) =>
  (txt || "").replace(/\[([^|\]]+)\|([^\]]+)\]/g, (_, m, f) => (g === "f" ? f : m));
const negrito = (t) => t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const esc = (t) => (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = (t) => negrito(esc(genero(t)));
function mostrar(id) {
  document.querySelectorAll(".tela").forEach((t) => t.classList.add("escondido"));
  $(id).classList.remove("escondido");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}
function toast(msg, ms = 2200) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("visivel");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("visivel"), ms);
}
const utm = Object.fromEntries(
  [...new URLSearchParams(location.search)].filter(([k]) => k.startsWith("utm_"))
);

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
    if (flags.has("BUDGET_BAIXO")) { cand.delete("GEN"); cand.delete("REF"); }
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
window.calcularNegocio = calcularNegocio; // exposto para testes
window.calcularCarreira = calcularCarreira;

/* ---------- definição do quiz (SurveyJS) ---------- */
const radio = (p, visivel) => ({
  type: "radiogroup",
  name: p.id,
  title: p.titulo,
  isRequired: true,
  visibleIf: visivel,
  choices: p.opcoes.map((o) => ({ value: o.valor, text: o.texto })),
});
const json = {
  locale: "pt-br",
  showQuestionNumbers: "off",
  questionErrorLocation: "bottom",
  autoAdvanceEnabled: true,
  showProgressBar: false, // barra própria (mais leve), ver atualizarProgresso()
  showCompletedPage: false,
  pagePrevText: "← Voltar",
  pageNextText: "Continuar →",
  completeText: "Ver meu resultado →",
  pages: [
    { name: "p_genero", elements: [{
      type: "radiogroup", name: "genero", title: "Antes de tudo: quem vai para a caçada?", isRequired: true,
      choices: [{ value: "m", text: "🏹 Caçador" }, { value: "f", text: "🏹 Caçadora" }],
    }]},
    { name: "p_trilha", elements: [{
      type: "radiogroup", name: "trilha", title: "O que te trouxe até aqui?", isRequired: true,
      choices: [
        { value: "A", text: "🏢 Quero mais clientes para a minha empresa ou negócio" },
        { value: "B", text: "🚀 Quero crescer na carreira ou conseguir um emprego melhor" },
      ],
    }]},
    ...Q.perguntasNegocio.map((p) => ({ name: "p_" + p.id, elements: [radio(p, "{trilha} = 'A'")] })),
    ...Q.perguntasCarreira.map((p) => ({ name: "p_" + p.id, elements: [radio(p, "{trilha} = 'B'")] })),
    { name: "p_captura", title: "Seu arquétipo está pronto 🎯", elements: [
      { type: "html", name: "sub_n", visibleIf: "{trilha} = 'A'",
        html: "<p class='cap-sub'>Onde a gente te manda o resultado completo e a análise do seu LinkedIn?</p>" },
      { type: "html", name: "sub_c", visibleIf: "{trilha} = 'B'",
        html: "<p class='cap-sub'>Onde a gente te manda o resultado e as dicas para o seu currículo e LinkedIn?</p>" },
      { type: "text", name: "nome", title: "Seu nome", isRequired: true, placeholder: "Como você quer ser chamado(a)?" },
      { type: "text", name: "whatsapp", title: "WhatsApp (com DDD)", inputType: "tel", isRequired: true, placeholder: "(21) 99999-9999",
        validators: [{ type: "regex", regex: "^[\\s()+\\-.]*(\\d[\\s()+\\-.]*){10,13}$", text: "Confere o número com DDD 🙂" }] },
      { type: "text", name: "email", title: "E-mail", inputType: "email", isRequired: true, placeholder: "voce@empresa.com.br",
        validators: [{ type: "email", text: "Esse e-mail parece incompleto." }] },
      { type: "text", name: "linkedin", title: "Link do seu perfil no LinkedIn", requiredIf: "{trilha} = 'A'",
        placeholder: "linkedin.com/in/seu-perfil",
        description: "É por aqui que o José faz a sua análise.",
        validators: [{ type: "regex", regex: "linkedin\\.com\\/", text: "Cole o link do seu perfil (linkedin.com/in/…)" }] },
      { type: "html", name: "sem_linkedin", visibleIf: "{trilha} = 'B'",
        html: "<p class='cap-micro'>Não tem LinkedIn? Sem problema, deixa em branco — a gente começa do zero.</p>" },
      { type: "checkbox", name: "consentimento", titleLocation: "hidden", isRequired: true,
        requiredErrorText: "Precisamos do seu ok para enviar o resultado.",
        choices: [{ value: "sim", text: "Aceito receber meu resultado e contato da Leadhunter por WhatsApp e e-mail." }] },
      { type: "html", name: "micro_n", visibleIf: "{trilha} = 'A'",
        html: "<p class='cap-micro'>A análise do seu perfil chega no seu WhatsApp em até 48h úteis.</p>" },
      { type: "html", name: "micro_c", visibleIf: "{trilha} = 'B'",
        html: "<p class='cap-micro'>No resultado você chama o José no WhatsApp e pode mandar seu currículo por lá mesmo.</p>" },
    ]},
  ],
};

const survey = new Survey.Model(json);
survey.applyTheme({
  isPanelless: true,
  cssVariables: {
    "--sjs-font-family": "Inter, system-ui, sans-serif",
    "--sjs-primary-backcolor": "#1f5eff",
    "--sjs-primary-backcolor-dark": "#1747c7",
    "--sjs-primary-backcolor-light": "rgba(31,94,255,0.10)",
    "--sjs-general-backcolor-dim": "transparent",
    "--sjs-corner-radius": "14px",
    "--sjs-base-unit": "8px",
    "--sjs-font-questiontitle-size": "22px",
    "--sjs-font-questiontitle-weight": "700",
  },
});
survey.onTextMarkdown.add((_, o) => { o.html = negrito(genero(o.text)); });
survey.onValueChanged.add((s, o) => {
  if (o.name === "genero") generoAtual = o.value;
  if (o.name === "trilha") trackEvent("trilha", { trilha: o.value });
});

/* Reações rápidas entre perguntas (copy/01) */
const REACOES = [
  [(v) => v.Q4 === "A", "Q4", "Indicação é ótimo… até o mês em que ela não vem."],
  [(v) => v.Q5 === "B", "Q5", "Clássico. Quem mais vende é quem menos tem tempo pra prospectar."],
  [(v) => ["C", "D"].includes(v.Q7), "Q7", "Anotado. Vamos falar sobre isso no final. 👀"],
  [(v) => v.C2 === "A", "C2", "Quem vende no balcão vende em qualquer lugar. Guarda essa."],
];
survey.onCurrentPageChanged.add((s, o) => {
  if (!o.isNextPage || !o.oldCurrentPage) return;
  const qid = o.oldCurrentPage.name.replace("p_", "");
  const r = REACOES.find(([teste, id]) => id === qid && teste(s.data));
  if (r) toast(r[2], 2600);
  trackEvent("pergunta", { id: qid });
});

/* Barra de progresso própria: conta só as páginas visíveis da trilha escolhida */
function atualizarProgresso() {
  const vis = survey.visiblePages;
  const i = vis.indexOf(survey.currentPage);
  const pct = Math.round(((i + 1) / vis.length) * 100);
  $("progressoBarra").style.width = pct + "%";
}
survey.onCurrentPageChanged.add(atualizarProgresso);
survey.onValueChanged.add(atualizarProgresso);

survey.onComplete.add((s) => {
  const d = s.data;
  const res = d.trilha === "A" ? calcularNegocio(d) : calcularCarreira(d);
  enviarLead(d, res);
  trackEvent("resultado", { resultado: res.resultado });
  carregarEMostrar(res, d);
});

/* ---------- lead: webhook ---------- */
function enviarLead(d, res) {
  const payload = {
    data: new Date().toISOString(), nome: d.nome, whatsapp: d.whatsapp, email: d.email, linkedin: d.linkedin || "",
    genero: d.genero, trilha: res.trilha, arquetipo: res.resultado, arquetipo_nome: ARQ[res.resultado][d.genero],
    temperatura: res.temperatura, autoridade: res.autoridade ?? "", alerta_autoridade: !!res.seloAutoridade,
    pontos: JSON.stringify(res.pontos),
    respostas: JSON.stringify(Object.fromEntries(Object.entries(d).filter(([k]) => /^(Q|C)\d+$/.test(k)))),
    utm: JSON.stringify(utm), pagina: location.href,
  };
  console.log("[lead]", payload);
  if (!CONFIG.WEBHOOK_URL) return;
  fetch(CONFIG.WEBHOOK_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) })
    .catch((e) => console.warn("webhook falhou", e));
}
function trackEvent(nome, dados = {}) {
  // Ganchos prontos para GA4 / Meta Pixel, se forem adicionados ao index.html
  if (window.gtag) window.gtag("event", "quiz_" + nome, dados);
  if (window.fbq) window.fbq("trackCustom", "quiz_" + nome, dados);
}

/* ---------- carregando ---------- */
function carregarEMostrar(res, d) {
  mostrar("carregando");
  const frases = [
    ["Analisando suas respostas…", "🎯"],
    ["Comparando com os perfis que a Leadhunter já atendeu…", "🔍"],
    ["Revelando seu arquétipo…", "✨"],
  ];
  frases.forEach(([t, e], i) => setTimeout(() => { $("loaderTexto").textContent = t; $("loaderEmoji").textContent = e; }, i * 1000));
  setTimeout(() => renderResultado(res, d), 3100);
}

/* ---------- resultado ---------- */
function renderResultado(res, d) {
  const g = d.genero;
  const a = ARQ[res.resultado];
  const t = Q.resultados[res.resultado];
  const emoji = a.emoji || (g === "f" ? a.emoji_f : a.emoji_m);
  const nome = a[g];
  const primeiroNome = (d.nome || "").trim().split(/\s+/)[0];

  // Variação do Explorador: B2C x ticket baixo
  const quem = t.quem.replace("[você vende para pessoa física|o seu ticket pede volume]",
    d.Q2 === "C" && d.Q3 !== "A" ? "você vende para pessoa física" : "o seu ticket pede volume");

  let msg = Q.whatsapp[res.resultado][g];
  if (primeiroNome) msg = msg.replace("Oi José! Fiz", `Oi José! Aqui é ${primeiroNome}. Fiz`);
  const linkWpp = `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;

  const [conteudoTexto] = (t.conteudo || "").split(" → ");
  const bloco = (titulo, texto, cls = "") =>
    texto ? `<div class="bloco ${cls} anim"><h3>${titulo}</h3><p>${fmt(texto)}</p></div>` : "";

  $("resultadoConteudo").innerHTML = `
    <div class="res-topo">
      <p class="res-kicker anim" style="--d:0">${primeiroNome ? esc(primeiroNome) + ", seu" : "Seu"} arquétipo é</p>
      <div class="res-emoji anim" style="--d:1">${emoji}</div>
      <h1 class="anim" style="--d:2">${esc(nome)}</h1>
      <p class="res-frase anim" style="--d:3">“${fmt(t.frase)}”</p>
    </div>
    ${bloco("Quem é você", quem)}
    <div class="duo">
      ${bloco("💪 Seu superpoder", t.superpoder, "verde")}
      ${bloco("🙈 Seu ponto cego", t.pontoCego, "laranja")}
    </div>
    ${bloco("Se nada mudar…", t.seNadaMudar)}
    ${res.seloAutoridade ? bloco("⚠️ " + Q.extras.alerta.titulo, Q.extras.alerta.texto, "alerta") : ""}
    <div class="bloco oferta anim">
      <span class="tag">O caminho que a gente recomenda</span>
      <h2>${esc(t.ofertaTitulo)}</h2>
      <p>${fmt(t.oferta)}</p>
      ${t.bonus ? `<p class="bonus-res">🎁 ${fmt(t.bonus)}</p>` : ""}
      ${conteudoTexto && CONFIG.PAGINA_CARREIRA_URL ? `<p class="conteudo">📚 <a href="${CONFIG.PAGINA_CARREIRA_URL}" target="_blank" rel="noopener">${fmt(conteudoTexto)} →</a></p>` : ""}
      <a class="btn-wpp" href="${linkWpp}" target="_blank" rel="noopener" id="ctaWpp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z"/></svg>
        ${esc(genero(t.botao))}
      </a>
      <p class="wpp-micro">Abre o WhatsApp do José com a mensagem pronta.</p>
    </div>
    ${res.conviteCarreira ? `<div class="bloco convite anim"><h3>🚀 ${esc(Q.extras.convite.titulo)}</h3><p>${fmt(Q.extras.convite.texto)}</p>
      <button class="btn-secundario" id="btnCarreira">${esc(Q.extras.convite.botao)} →</button></div>` : ""}
    <div class="compartilhar anim">
      <button class="btn-secundario" id="btnShare">Compartilhar meu resultado</button>
      <button class="btn-link" id="btnRefazer">Refazer o quiz</button>
    </div>
    <p class="assinatura">Leadhunter 💙</p>`;

  document.querySelectorAll("#resultadoConteudo .bloco.anim, .compartilhar.anim").forEach((el, i) => el.style.setProperty("--d", i + 4));
  mostrar("resultado");
  confete();

  $("ctaWpp").addEventListener("click", () => trackEvent("whatsapp", { resultado: res.resultado }));
  $("btnShare").addEventListener("click", async () => {
    const texto = genero(t.compartilhar) + " " + location.origin + location.pathname;
    trackEvent("compartilhar", { resultado: res.resultado });
    try {
      if (navigator.share) await navigator.share({ text: texto });
      else { await navigator.clipboard.writeText(texto); toast("Texto copiado! Cola onde quiser 😉"); }
    } catch (_) {}
  });
  $("btnRefazer").addEventListener("click", () => { survey.clear(true, true); mostrar("landing"); });
  const bc = $("btnCarreira");
  if (bc) bc.addEventListener("click", () => {
    const manter = { genero: d.genero, nome: d.nome, whatsapp: d.whatsapp, email: d.email, linkedin: d.linkedin, consentimento: d.consentimento };
    survey.clear(true, true);
    survey.data = { ...manter, trilha: "B" };
    survey.currentPage = survey.getPageByName("p_C1");
    mostrar("quiz");
    atualizarProgresso();
  });
}

/* Confete leve em CSS/JS puro */
function confete() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cores = ["#1f5eff", "#25d366", "#ffb020", "#ff5c8a", "#7c5cff"];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement("i");
    c.className = "confete";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = cores[i % cores.length];
    c.style.animationDelay = Math.random() * 0.6 + "s";
    c.style.animationDuration = 2 + Math.random() * 1.6 + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

/* ---------- início ---------- */
$("comecar").addEventListener("click", () => {
  mostrar("quiz");
  atualizarProgresso();
  trackEvent("inicio");
});
survey.render(document.getElementById("surveyContainer"));
