/* Quiz Leadhunter — "Que tipo de caçador(a) você é?"
 * Interface própria, sem bibliotecas. Conteúdo: quiz-data.js (gerado por build.py). Lógica: motor.js.
 * Configure o bloco abaixo e publique a pasta app/ em qualquer hospedagem estática.
 */
const CONFIG = {
  WEBHOOK_URL: "",            // URL do Google Apps Script (ver planilha-google-apps-script.js). Vazio = não salva os leads.
  PAGINA_CARREIRA_URL: "",    // Link da página de conteúdo sobre carreira. Vazio = esconde o link.
  META_PIXEL_ID: "",          // ID do Meta Pixel (Gerenciador de Eventos). Vazio = sem pixel.
  GA4_ID: "",                 // ID do GA4 (G-XXXXXXX). Vazio = sem GA4.
  URL_PUBLICA: "",            // Endereço que aparece no card (ex.: "leadhunter.com.br/quiz"). Vazio = endereço atual.
  INSTAGRAM: "",              // @ da Leadhunter para o texto de compartilhamento (ex.: "@leadhunter"). Vazio = não cita.
  JOSE_FOTO_URL: "",          // Foto do José para a landing (ex.: "assets/jose.jpg"). Vazio = iniciais "JH".
  WHATSAPP: window.QUIZ.config.whatsapp,
};

/* Microcopy da interface (os textos de conteúdo ficam em copy/). */
const UI = {
  landing: {
    padrao: { titulo: "Que tipo de caçador(a) <em>você&nbsp;é?</em>", sub: "Perguntas rápidas para descobrir seu arquétipo — e o que está travando seus próximos clientes ou a sua próxima vaga." },
    negocio: { titulo: "Que tipo de caçador(a) <em>B2B você&nbsp;é?</em>", sub: "10 perguntas rápidas para descobrir seu arquétipo — e o que está travando seus próximos clientes." },
    carreira: { titulo: "Que tipo de caçador(a) de <em>oportunidades você&nbsp;é?</em>", sub: "5 perguntas rápidas para descobrir seu arquétipo — e o que está travando a sua próxima vaga." },
  },
  genero: { titulo: "Antes de tudo: quem vai para a caçada?", dica: "Só muda a linguagem do quiz." },
  trilha: {
    titulo: "O que te trouxe até aqui?",
    A: { icone: "🏢", titulo: "Mais clientes", texto: "Quero mais clientes para a minha empresa ou negócio", meta: "10 perguntas · ~2 min" },
    B: { icone: "🚀", titulo: "Carreira", texto: "Quero crescer na carreira ou conseguir um emprego melhor", meta: "5 perguntas · ~1 min" },
  },
  eixos: { Q1: "Execução", Q2: "Qualificação", Q3: "Investimento", Q4: "Execução", Q5: "Execução", Q6: "Estrutura", Q7: "Autoridade",
    Q8: "Autoridade", Q9: "Gargalo", Q10: "Investimento", C1: "Momento", C2: "Bagagem", C3: "Currículo", C4: "LinkedIn", C5: "Trava" },
  carregando: [
    "Analisando suas respostas…",
    "Comparando com os perfis de prospecção que a Leadhunter já operou…",
    "Revelando seu arquétipo…",
  ],
};

const Q = window.QUIZ;
const ARQ = Q.config.arquetipos;
const ORDEM_ARQ = Object.keys(ARQ);
const $ = (id) => document.getElementById(id);

/* ---------- utilidades ---------- */
const estado = { genero: "m", trilha: null, r: {}, passos: [], i: 0, captura: null, trilhaFixa: null };
const genero = (txt, g = estado.genero) => (txt || "").replace(/\[([^|\]]+)\|([^\]]+)\]/g, (_, m, f) => (g === "f" ? f : m));
const negrito = (t) => t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const esc = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = (t) => negrito(esc(genero(t)));
const reduzMovimento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const pausa = (ms) => new Promise((ok) => setTimeout(ok, ms));
function mostrar(id) {
  document.querySelectorAll(".tela").forEach((t) => t.classList.add("escondido"));
  $(id).classList.remove("escondido");
  $("barraWpp").classList.remove("visivel");
  window.scrollTo(0, 0);
}
function toast(msg, ms = 2400) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("visivel");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("visivel"), ms);
}
const params = new URLSearchParams(location.search);
const utm = Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_")));
const urlPublica = () => CONFIG.URL_PUBLICA || (location.protocol.startsWith("http") ? location.host + location.pathname.replace(/index\.html$/, "") : "leadhunter.com.br");
const linkPublico = () => (location.protocol.startsWith("http") ? location.origin + location.pathname.replace(/index\.html$/, "") : "https://" + urlPublica());
const ICONE_WPP = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z"/></svg>`;

/* ---------- analytics: Meta Pixel e GA4 (só carregam se configurados) ---------- */
(function carregarAnalytics() {
  if (CONFIG.META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", CONFIG.META_PIXEL_ID);
    window.fbq("track", "PageView");
  }
  if (CONFIG.GA4_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CONFIG.GA4_ID);
  }
})();
/* Eventos customizados quiz_* + eventos padrão (Meta: ViewContent, Lead, Contact · GA4: generate_lead, contact) */
function trackEvent(nome, dados = {}, padrao = {}) {
  if (window.gtag) {
    window.gtag("event", "quiz_" + nome, dados);
    if (padrao.ga) window.gtag("event", padrao.ga, dados);
  }
  if (window.fbq) {
    window.fbq("trackCustom", "quiz_" + nome, dados);
    if (padrao.fb) window.fbq("track", padrao.fb, dados);
  }
}

/* ---------- carta (componente-assinatura) ---------- */
const emojiDe = (cod, g = estado.genero) => ARQ[cod].emoji || (g === "f" ? ARQ[cod].emoji_f : ARQ[cod].emoji_m);
const numeroDe = (cod) => String(ORDEM_ARQ.indexOf(cod) + 1).padStart(2, "0") + " / " + String(ORDEM_ARQ.length).padStart(2, "0");

/* Níveis da carta (1 a 5), calculados das respostas. Só ilustram o resultado — não entram na lógica. */
function atributos(res, r) {
  const n = (x) => 1 + Math.round(Math.max(0, Math.min(1, x)) * 4);
  if (res.trilha === "NEGOCIO") {
    const prospeccao = ({ B: 2, C: 2, D: 1 }[r.Q4] || 0) + ({ A: 2, C: 2, B: 1 }[r.Q5] || 0);
    return [
      ["Prospecção", n(prospeccao / 4)],
      ["Estrutura", n(({ A: 1, B: 2, C: 3, D: 0 }[r.Q6] || 0) / 3)],
      ["Autoridade", n((res.autoridade || 0) / 6)],
    ];
  }
  return [
    ["Experiência", n(({ A: 2, B: 2, C: 3, D: 3, E: 0 }[r.C2] || 0) / 3)],
    ["Currículo", n(({ A: 2, B: 1, C: 0 }[r.C3] || 0) / 2)],
    ["LinkedIn", n(({ A: 2, B: 1, C: 0 }[r.C4] || 0) / 2)],
  ];
}
const nivelHTML = (v) => `<span class="nivel" aria-label="nível ${v} de 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}</span>`;
function cartaHTML(cod, res, r) {
  return `<article class="carta" aria-label="Carta do arquétipo">
    <div class="carta-topo mono"><span>Arquétipo Nº ${numeroDe(cod)}</span><span>Leadhunter</span></div>
    <div class="carta-emoji" aria-hidden="true">${emojiDe(cod)}</div>
    <h1 class="carta-nome">${esc(ARQ[cod][estado.genero])}</h1>
    <p class="carta-frase">“${fmt(Q.resultados[cod].frase)}”</p>
    <ul class="carta-atributos">${atributos(res, r).map(([rot, v]) => `<li><span class="mono">${rot}</span>${nivelHTML(v)}</li>`).join("")}</ul>
    <div class="carta-rodape mono"><span>${esc(urlPublica())}</span><img src="assets/logo-color.png" alt="" width="44" height="16"></div>
  </article>`;
}

/* ---------- landing ---------- */
function montarLanding() {
  const t = (params.get("t") || "").toLowerCase();
  estado.trilhaFixa = t === "negocio" ? "A" : t === "carreira" ? "B" : null;
  const v = UI.landing[t === "negocio" || t === "carreira" ? t : "padrao"];
  $("landingTitulo").innerHTML = v.titulo;
  $("landingSub").textContent = v.sub;
  if (CONFIG.JOSE_FOTO_URL) $("avatarJose").innerHTML = `<img src="${esc(CONFIG.JOSE_FOTO_URL)}" alt="">`;
  const vitrine = estado.trilhaFixa === "B" ? ["TAL", "FAN", "FOG", "VIA", "TAL"] : ["ESP", "CAC", "GEN", "REF", "MAE"];
  const rot = [-16, -8, 0, 8, 16], ys = [22, 6, 0, 6, 22], xs = [-118, -60, 0, 60, 118];
  $("leque").innerHTML = vitrine.map((cod, i) => i === 2
    ? `<div class="carta-mini carta-verso" style="--r:${rot[i]}deg;--x:0px;--y:${ys[i]}px;--ad:${i * .3}s;z-index:3"><span>?</span></div>`
    : `<div class="carta-mini" style="--r:${rot[i]}deg;--x:${xs[i]}px;--y:${ys[i]}px;--ad:${i * .3}s;z-index:${2 - Math.abs(i - 2)}">
        <span class="emoji">${emojiDe(cod, i % 2 ? "f" : "m")}</span><span class="borrado">${esc(ARQ[cod].m)}</span></div>`).join("");
  trackEvent("landing", { trilha_fixa: t || "nenhuma" }, { fb: "ViewContent" });
}

/* ---------- passos do quiz ---------- */
const perguntasDa = (trilha) => (trilha === "A" ? Q.perguntasNegocio : Q.perguntasCarreira);
function montarPassos() {
  const p = [];
  if (!estado.pularIntro) p.push("genero");
  if (!estado.trilhaFixa && !estado.pularIntro) p.push("trilha");
  if (estado.trilha) perguntasDa(estado.trilha).forEach((q) => p.push(q.id));
  else p.push("…");
  if (!estado.captura) p.push("captura");
  estado.passos = p;
}
function atualizarTopo() {
  const passo = estado.passos[estado.i];
  const total = estado.trilha ? perguntasDa(estado.trilha).length : 10;
  let label = "§ Antes de começar";
  if (/^[QC]\d+$/.test(passo)) {
    const n = perguntasDa(estado.trilha).findIndex((q) => q.id === passo) + 1;
    label = `§ ${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")} · ${UI.eixos[passo] || ""}`;
  } else if (passo === "captura") label = "§ Último passo";
  $("passoLabel").textContent = label;
  const pct = Math.round((estado.i / estado.passos.length) * 100);
  $("progressoBarra").style.width = pct + "%";
  $("progresso").setAttribute("aria-valuenow", pct);
}
function renderPasso(voltando = false) {
  montarPassos();
  atualizarTopo();
  const passo = estado.passos[estado.i];
  const el = $("etapa");
  let html = "";
  if (passo === "genero") {
    html = `<h2 class="pergunta-titulo" id="tituloPasso">${UI.genero.titulo}</h2><p class="pergunta-dica">${UI.genero.dica}</p>
      <div class="opcoes opcoes-grandes" role="radiogroup" aria-labelledby="tituloPasso">
        ${[["m", "Caçador"], ["f", "Caçadora"]].map(([v, t]) => `<button type="button" class="opcao opcao-grande ${estado.genero === v && estado.generoEscolhido ? "selecionada" : ""}" role="radio" aria-checked="${estado.genero === v && !!estado.generoEscolhido}" data-valor="${v}">
          <span class="icone" aria-hidden="true">🏹</span><strong>${t}</strong></button>`).join("")}
      </div>`;
  } else if (passo === "trilha") {
    html = `<h2 class="pergunta-titulo" id="tituloPasso">${UI.trilha.titulo}</h2>
      <div class="opcoes opcoes-trilha" role="radiogroup" aria-labelledby="tituloPasso">
        ${["A", "B"].map((v) => { const o = UI.trilha[v]; return `<button type="button" class="opcao opcao-grande ${estado.trilha === v ? "selecionada" : ""}" role="radio" aria-checked="${estado.trilha === v}" data-valor="${v}">
          <span class="icone" aria-hidden="true">${o.icone}</span><strong>${o.titulo}</strong><span>${o.texto}</span><small class="mono">${o.meta}</small></button>`; }).join("")}
      </div>`;
  } else if (passo === "captura") {
    html = capturaHTML();
  } else {
    const q = perguntasDa(estado.trilha).find((x) => x.id === passo);
    html = `<h2 class="pergunta-titulo" id="tituloPasso">${fmt(q.titulo)}</h2>
      <div class="opcoes" role="radiogroup" aria-labelledby="tituloPasso">
        ${q.opcoes.map((o) => `<button type="button" class="opcao ${estado.r[q.id] === o.valor ? "selecionada" : ""}" role="radio" aria-checked="${estado.r[q.id] === o.valor}" data-valor="${o.valor}">
          <span class="letra mono" aria-hidden="true">${o.valor}</span><span>${fmt(o.texto)}</span></button>`).join("")}
      </div>`;
  }
  el.innerHTML = `<div class="etapa-conteudo ${voltando ? "volta" : ""}">${html}</div>`;
  if (passo === "captura") ligarCaptura();
  else el.querySelectorAll(".opcao").forEach((b) => b.addEventListener("click", () => escolher(passo, b)));
  const foco = el.querySelector(".pergunta-titulo");
  if (foco) { foco.setAttribute("tabindex", "-1"); foco.focus({ preventScroll: true }); }
}

/* Reações rápidas entre perguntas (copy/01) — no máximo 1 por tela */
const REACOES = [
  [(v) => v.Q4 === "A", "Q4", "Indicação é ótimo… até o mês em que ela não vem."],
  [(v) => v.Q5 === "B", "Q5", "Clássico. Quem mais vende é quem menos tem tempo pra prospectar."],
  [(v) => ["C", "D"].includes(v.Q7), "Q7", "Anotado. Vamos falar sobre isso no final. 👀"],
  [(v) => v.C2 === "A", "C2", "Quem vende no balcão vende em qualquer lugar. Guarda essa."],
];
let travado = false;
async function escolher(passo, botao) {
  if (travado) return;
  travado = true;
  $("etapa").querySelectorAll(".opcao").forEach((b) => { b.classList.remove("selecionada"); b.setAttribute("aria-checked", "false"); });
  botao.classList.add("selecionada");
  botao.setAttribute("aria-checked", "true");
  const v = botao.dataset.valor;
  if (passo === "genero") { estado.genero = v; estado.generoEscolhido = true; }
  else if (passo === "trilha") {
    if (estado.trilha !== v) estado.r = {};
    estado.trilha = v;
    trackEvent("trilha", { trilha: v });
  } else {
    estado.r[passo] = v;
    trackEvent("pergunta", { id: passo });
    const reacao = REACOES.find(([teste, id]) => id === passo && teste(estado.r));
    if (reacao) toast(reacao[2], 2600);
  }
  await pausa(reduzMovimento() ? 150 : 380);
  if (passo === "Q5" && estado.trilha === "A") await metadeDoCaminho();
  avancar();
  travado = false;
}
async function metadeDoCaminho() {
  mostrar("metade");
  await pausa(reduzMovimento() ? 700 : 1600);
  mostrar("quiz");
}
function avancar() {
  montarPassos();
  if (estado.i + 1 < estado.passos.length) { estado.i++; renderPasso(); return; }
  concluir();
}
function voltar() {
  if (travado) return;
  if (estado.i === 0) { mostrar("landing"); return; }
  estado.i--;
  renderPasso(true);
}

/* ---------- captura ---------- */
function capturaHTML() {
  const neg = estado.trilha === "A";
  return `<form id="formCaptura" novalidate>
    <div class="captura-teaser">
      <div class="carta-mini carta-verso" aria-hidden="true"><span>?</span></div>
      <p><strong>Seu arquétipo está pronto 🎯</strong>${neg ? "Onde a gente te manda o resultado completo e a análise do seu LinkedIn?" : "Onde a gente te manda o resultado e as dicas para o seu currículo e LinkedIn?"}</p>
    </div>
    <div class="campo" data-campo="nome"><label for="nome">Seu nome</label>
      <input id="nome" name="nome" type="text" autocomplete="given-name" placeholder="${genero("Como você quer ser [chamado|chamada]?")}">
      <p class="msg-erro">Como a gente te chama?</p></div>
    <div class="campo" data-campo="whatsapp"><label for="whatsapp">WhatsApp (com DDD)</label>
      <input id="whatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(21) 99999-9999">
      <p class="msg-erro">Confere o número com DDD 🙂</p></div>
    <div class="campo" data-campo="email"><label for="email">${neg ? "E-mail profissional" : "E-mail"}</label>
      <input id="email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="voce@empresa.com.br">
      <p class="msg-erro">Esse e-mail parece incompleto.</p></div>
    <div class="campo" data-campo="linkedin"><label for="linkedin">Link do seu LinkedIn <span class="opcional">(opcional)</span></label>
      <input id="linkedin" name="linkedin" type="url" inputmode="url" autocomplete="url" placeholder="linkedin.com/in/seu-perfil">
      <p class="msg-erro">Cole o link do seu perfil (linkedin.com/in/…)</p>
      <p class="micro">${neg
        ? "Opcional, mas é ele que libera o seu bônus: o José Henrique, especialista em LinkedIn e fundador da Leadhunter, abre o seu perfil e te manda uma análise completa e pessoal. <strong>Sem link, sem análise.</strong>"
        : "Não tem LinkedIn? Sem problema, deixa em branco — a gente começa do zero."}</p></div>
    <div class="campo" data-campo="consentimento">
      <label class="campo-check"><input id="consentimento" type="checkbox"> <span>Aceito receber meu resultado e contato da Leadhunter por WhatsApp e e-mail.</span></label>
      <p class="msg-erro">Precisamos do seu ok para enviar o resultado.</p></div>
    <button type="submit" class="btn btn-primario btn-grande">Ver meu resultado <span aria-hidden="true">→</span></button>
    <p class="captura-micro">${neg ? "A análise do seu perfil chega no seu WhatsApp em até 48h úteis." : "No resultado você chama o José no WhatsApp e pode mandar seu currículo por lá mesmo."}</p>
  </form>`;
}
function mascaraTelefone(v) {
  const d = v.replace(/\D/g, "").slice(0, 13);
  if (d.length > 11) return "+" + d; // número com DDI
  if (d.length <= 2) return d.length ? "(" + d : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
const VALIDA = {
  nome: (v) => v.trim().length >= 2,
  whatsapp: (v) => { const n = v.replace(/\D/g, "").length; return n >= 10 && n <= 13; },
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  linkedin: (v) => !v.trim() || /linkedin\.com\//i.test(v),
  consentimento: (_, el) => el.checked,
};
function ligarCaptura() {
  const f = $("formCaptura");
  const prev = estado.rascunho || {};
  ["nome", "whatsapp", "email", "linkedin"].forEach((k) => { if (prev[k]) f.elements[k].value = prev[k]; });
  $("consentimento").checked = !!prev.consentimento;
  const tel = $("whatsapp");
  tel.addEventListener("input", () => { tel.value = mascaraTelefone(tel.value); });
  const checar = (k) => {
    const el = $(k);
    const ok = VALIDA[k](el.value || "", el);
    el.closest(".campo").classList.toggle("erro", !ok);
    el.setAttribute("aria-invalid", String(!ok));
    return ok;
  };
  Object.keys(VALIDA).forEach((k) => {
    const el = $(k);
    el.addEventListener(k === "consentimento" ? "change" : "blur", () => { if (el.value || k === "consentimento") checar(k); });
    el.addEventListener("input", () => { estado.rascunho = { ...estado.rascunho, [k]: k === "consentimento" ? el.checked : el.value }; });
  });
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalidos = Object.keys(VALIDA).filter((k) => !checar(k));
    if (invalidos.length) { $(invalidos[0]).focus(); return; }
    estado.captura = {
      nome: $("nome").value.trim(), whatsapp: $("whatsapp").value.trim(), email: $("email").value.trim(),
      linkedin: $("linkedin").value.trim(), consentimento: true,
    };
    trackEvent("captura", { trilha: estado.trilha }, { fb: "Lead", ga: "generate_lead" });
    concluir();
  });
}

/* ---------- conclusão, lead e carregamento ---------- */
function concluir() {
  const res = estado.trilha === "A" ? calcularNegocio(estado.r) : calcularCarreira(estado.r);
  const d = { ...estado.captura, genero: estado.genero, ...estado.r };
  enviarLead(d, res);
  trackEvent("resultado", { resultado: res.resultado, trilha: res.trilha });
  carregarEMostrar(res, d);
}
function enviarLead(d, res) {
  const payload = {
    data: new Date().toISOString(), nome: d.nome, whatsapp: d.whatsapp, email: d.email, linkedin: d.linkedin || "",
    genero: d.genero, trilha: res.trilha, arquetipo: res.resultado, arquetipo_nome: ARQ[res.resultado][d.genero],
    temperatura: res.temperatura, autoridade: res.autoridade ?? "", alerta_autoridade: !!res.seloAutoridade,
    pontos: JSON.stringify(res.pontos),
    respostas: JSON.stringify(Object.fromEntries(Object.entries(d).filter(([k]) => /^(Q|C)\d+$/.test(k)))),
    utm: JSON.stringify({ ...utm, ...(params.get("t") ? { t: params.get("t") } : {}) }), pagina: location.href,
  };
  console.log("[lead]", payload);
  if (!CONFIG.WEBHOOK_URL) return;
  fetch(CONFIG.WEBHOOK_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) })
    .catch((e) => console.warn("webhook falhou", e));
}
function carregarEMostrar(res, d) {
  mostrar("carregando");
  const passo = reduzMovimento() ? 500 : 1000;
  UI.carregando.forEach((t, i) => setTimeout(() => { $("loaderTexto").textContent = t; }, i * passo));
  setTimeout(() => renderResultado(res, d), passo * 3 + 100);
}

/* ---------- resultado ---------- */
function linkWhatsApp(res, d) {
  let msg = Q.whatsapp[res.resultado][d.genero];
  const primeiroNome = (d.nome || "").trim().split(/\s+/)[0];
  if (primeiroNome) msg = msg.replace("Oi José! Fiz", `Oi José! Aqui é ${primeiroNome}. Fiz`);
  if (d.linkedin) msg += ` Meu LinkedIn: ${d.linkedin}`;
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
function renderResultado(res, d) {
  const cod = res.resultado;
  const t = Q.resultados[cod];
  const primeiroNome = (d.nome || "").trim().split(/\s+/)[0];
  const carreira = res.trilha === "CARREIRA";
  const semLinkedin = res.trilha === "NEGOCIO" && !(d.linkedin || "").trim();
  // Variação do Explorador: B2C x ticket baixo
  const quem = t.quem.replace("[você vende para pessoa física|o seu ticket pede volume]",
    d.Q2 === "C" && d.Q3 !== "A" ? "você vende para pessoa física" : "o seu ticket pede volume");
  const wpp = linkWhatsApp(res, d);
  const botaoWpp = (id) => `<a class="btn btn-wpp" href="${wpp}" target="_blank" rel="noopener" id="${id}">${ICONE_WPP}<span>${esc(genero(t.botao))}</span></a>`;
  const [conteudoTexto] = (t.conteudo || "").split(" → ");
  const secao = (n, titulo, texto) => `<div class="secao"><p class="mono">§ ${n} · ${titulo}</p><p>${fmt(texto)}</p></div>`;

  $("resultado").innerHTML = `
    <div class="res-hero ${carreira ? "carreira" : ""}">
      <div class="confete-area" id="confeteArea" aria-hidden="true"></div>
      <img src="assets/logo-white.png" alt="Leadhunter" class="logo" width="72" height="26">
      <p class="res-kicker mono">${primeiroNome ? esc(primeiroNome) + ", seu" : "Seu"} arquétipo é</p>
      <div class="carta-palco"><div class="carta-flip" id="cartaFlip">
        ${cartaHTML(cod, res, estado.r)}
        <div class="carta-mini carta-verso carta-costas" aria-hidden="true"><span>?</span></div>
      </div></div>
      <p class="nota-niveis">Níveis calculados a partir das suas respostas.</p>
      <div class="hero-acoes">
        ${botaoWpp("ctaWppTopo")}
        <button type="button" class="btn btn-contorno-claro" id="btnStoryTopo">Postar meu card no story</button>
      </div>
    </div>
    <div class="res-corpo">
      ${secao("01", "Quem é você", quem)}
      <div class="duo">${secao("02", "Seu superpoder", t.superpoder)}${secao("03", "Seu ponto cego", t.pontoCego)}</div>
      ${secao("04", "Se nada mudar…", t.seNadaMudar)}
      ${res.seloAutoridade ? `<div class="caixa alerta"><p class="mono">§ Alerta de autoridade</p><h3>${esc(Q.extras.alerta.titulo)}</h3><p>${fmt(Q.extras.alerta.texto)}</p></div>` : ""}
      <div class="caixa oferta">
        <p class="mono">§ O caminho que a gente recomenda</p>
        <h2>${esc(t.ofertaTitulo)}</h2>
        <p>${fmt(t.oferta)}</p>
        ${semLinkedin ? `<p class="bonus-res">🔗 <strong>${esc(Q.extras.semLinkedin.titulo)}.</strong> ${fmt(Q.extras.semLinkedin.texto)}</p>`
          : t.bonus ? `<p class="bonus-res">🎁 ${fmt(t.bonus)}</p>` : ""}
        ${conteudoTexto && CONFIG.PAGINA_CARREIRA_URL ? `<p class="conteudo">📚 <a href="${esc(CONFIG.PAGINA_CARREIRA_URL)}" target="_blank" rel="noopener">${fmt(conteudoTexto)} →</a></p>` : ""}
        ${botaoWpp("ctaWpp")}
        <p class="wpp-micro">Abre o WhatsApp do José com a mensagem pronta.</p>
      </div>
      <div class="caixa prova"><p class="mono">§ ${esc(Q.extras.prova.titulo)}</p><p>${fmt(Q.extras.prova.texto)}</p></div>
      ${res.conviteCarreira ? `<div class="caixa convite"><p class="mono">§ Bônus</p><h3>🚀 ${esc(Q.extras.convite.titulo)}</h3><p>${fmt(Q.extras.convite.texto)}</p>
        <button type="button" class="btn btn-contorno" id="btnCarreira">${esc(Q.extras.convite.botao)} →</button></div>` : ""}
      <div class="compartilhar">
        <p class="mono" style="color:var(--accent)">§ Compartilhe</p>
        <h3>Poste o seu card</h3>
        <p>Marque quem precisa descobrir o próprio arquétipo.</p>
        <div class="compartilhar-botoes">
          <button type="button" class="btn btn-primario" id="btnStory">Story</button>
          <button type="button" class="btn btn-contorno" id="btnFeed">Feed</button>
        </div>
        <button type="button" class="btn-link" id="btnShare">Compartilhar o link do quiz</button><br>
        <button type="button" class="btn-link" id="btnRefazer">Refazer o quiz</button>
      </div>
      <footer class="res-rodape"><img src="assets/logo-color.png" alt="Leadhunter" width="66" height="24"><span>Geração de demanda B2B · leadhunter.com.br</span></footer>
    </div>`;
  $("barraWpp").innerHTML = botaoWpp("ctaWppBarra");

  mostrar("resultado");
  const flip = $("cartaFlip");
  requestAnimationFrame(() => setTimeout(() => { flip.classList.add("revelada"); confete(); }, reduzMovimento() ? 0 : 350));

  ["ctaWppTopo", "ctaWpp", "ctaWppBarra"].forEach((id) => $(id).addEventListener("click", () =>
    trackEvent("whatsapp", { resultado: cod, posicao: id }, { fb: "Contact", ga: "contact" })));
  const shareCard = (formato) => compartilharCard(formato, res, d);
  $("btnStoryTopo").addEventListener("click", () => shareCard("story"));
  $("btnStory").addEventListener("click", () => shareCard("story"));
  $("btnFeed").addEventListener("click", () => shareCard("feed"));
  $("btnShare").addEventListener("click", async () => {
    const texto = genero(t.compartilhar) + (CONFIG.INSTAGRAM ? " " + CONFIG.INSTAGRAM : "") + " " + linkPublico();
    trackEvent("compartilhar", { resultado: cod, formato: "link" });
    try {
      if (navigator.share) await navigator.share({ text: texto });
      else { await navigator.clipboard.writeText(texto); toast("Texto copiado! Cola onde quiser 😉"); }
    } catch (_) {}
  });
  $("btnRefazer").addEventListener("click", () => {
    Object.assign(estado, { genero: "m", generoEscolhido: false, trilha: null, r: {}, i: 0, captura: null, rascunho: null, pularIntro: false });
    montarLanding();
    mostrar("landing");
  });
  const bc = $("btnCarreira");
  if (bc) bc.addEventListener("click", () => {
    Object.assign(estado, { trilha: "B", r: {}, i: 0, pularIntro: true });
    trackEvent("trilha", { trilha: "B", origem: "convite" });
    mostrar("quiz");
    renderPasso();
  });
  ligarBarraWpp();
}

/* Barra fixa do WhatsApp: aparece quando nenhum botão de WhatsApp está na tela */
let observador;
function ligarBarraWpp() {
  if (observador) observador.disconnect();
  const visiveis = new Set();
  const alvos = [$("ctaWppTopo"), $("ctaWpp")];
  observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
    const passouDoTopo = $("ctaWppTopo").getBoundingClientRect().bottom < 0;
    $("barraWpp").classList.toggle("visivel", !visiveis.size && passouDoTopo && !$("resultado").classList.contains("escondido"));
  });
  alvos.forEach((a) => observador.observe(a));
}

function confete() {
  if (reduzMovimento()) return;
  const area = $("confeteArea");
  const cores = ["#3344ff", "#ffffff", "#22c55e", "#eef0ff", "#aab3ff"];
  for (let i = 0; i < 46; i++) {
    const c = document.createElement("i");
    c.className = "confete";
    c.style.left = Math.random() * 100 + "%";
    c.style.background = cores[i % cores.length];
    c.style.animationDelay = Math.random() * 0.5 + "s";
    c.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
    area.appendChild(c);
    setTimeout(() => c.remove(), 4600);
  }
}

/* ---------- card de compartilhamento (PNG gerado no navegador) ---------- */
const FORMATOS = { story: [1080, 1920], feed: [1080, 1350] };
function carregarImagem(src) {
  return new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = erro; i.src = src; });
}
function quebrarLinhas(ctx, texto, largura) {
  const palavras = texto.split(" "), linhas = [];
  let linha = "";
  for (const p of palavras) {
    const teste = linha ? linha + " " + p : p;
    if (ctx.measureText(teste).width > largura && linha) { linhas.push(linha); linha = p; } else linha = teste;
  }
  if (linha) linhas.push(linha);
  return linhas;
}
function retanguloArredondado(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
async function desenharCard(formato, res) {
  const [W, H] = FORMATOS[formato];
  const story = formato === "story";
  const cod = res.resultado, t = Q.resultados[cod];
  await Promise.all(["500 80px Poppins", "italic 400 40px Poppins", "500 30px 'DM Sans'"].map((f) => document.fonts.load(f).catch(() => {})));
  const [logoBranca, logoCor] = await Promise.all([carregarImagem("assets/logo-white.png"), carregarImagem("assets/logo-color.png")]);
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");
  const carreira = res.trilha === "CARREIRA";
  const mono = (px) => `500 ${px}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;

  // fundo
  ctx.fillStyle = carreira ? "#3344ff" : "#0a0d14";
  ctx.fillRect(0, 0, W, H);
  const brilho = ctx.createRadialGradient(W / 2, H * 0.18, 0, W / 2, H * 0.18, W * 0.8);
  brilho.addColorStop(0, carreira ? "rgba(255,255,255,.22)" : "rgba(51,68,255,.5)");
  brilho.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = brilho;
  ctx.fillRect(0, 0, W, H);

  // topo
  const pad = 80;
  const lh = 58, lw = (logoBranca.width / logoBranca.height) * lh;
  const yTopo = story ? 150 : 80;
  ctx.drawImage(logoBranca, pad, yTopo, lw, lh);
  ctx.fillStyle = "rgba(255,255,255,.7)";
  ctx.font = mono(26);
  ctx.textAlign = "right";
  ctx.fillText("QUIZ · QUE TIPO DE CAÇADOR(A)?", W - pad, yTopo + lh / 2 + 9);

  // carta
  const cx = pad, cw = W - pad * 2;
  const cy = story ? 330 : 190;
  const ch = story ? 1180 : 960;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 60; ctx.shadowOffsetY = 24;
  retanguloArredondado(ctx, cx, cy, cw, ch, 36);
  ctx.fillStyle = "#ffffff"; ctx.fill();
  ctx.restore();
  const ix = cx + 56, iw = cw - 112;
  ctx.textAlign = "left"; ctx.fillStyle = "#545968"; ctx.font = mono(24);
  ctx.fillText("ARQUÉTIPO Nº " + numeroDe(cod), ix, cy + 76);
  ctx.textAlign = "right"; ctx.fillText("LEADHUNTER", ix + iw, cy + 76);

  // emoji + nome + frase: reduz a escala até caber acima dos atributos (nomes longos)
  const yAttr = cy + ch - (story ? 330 : 290);
  const topoLivre = cy + 120, baseLivre = yAttr - 90;
  const nomeTxt = ARQ[cod][estado.genero], fraseTxt = "“" + genero(t.frase) + "”";
  let er, tamNome, tamFrase, linhasNome, linhasFrase, altura;
  for (let k = 1; k >= 0.55; k -= 0.05) {
    er = (story ? 130 : 110) * k; tamNome = (story ? 84 : 72) * k; tamFrase = (story ? 40 : 36) * Math.max(k, 0.8);
    ctx.font = `500 ${tamNome}px Poppins, sans-serif`;
    linhasNome = quebrarLinhas(ctx, nomeTxt, iw);
    ctx.font = `italic 400 ${tamFrase}px Poppins, sans-serif`;
    linhasFrase = quebrarLinhas(ctx, fraseTxt, iw - 40);
    altura = er * 2 + tamNome * 1.3 + linhasNome.length * tamNome * 1.08 + 20 + linhasFrase.length * tamFrase * 1.35;
    if (altura <= baseLivre - topoLivre) break;
  }
  const ey = topoLivre + Math.max(0, (baseLivre - topoLivre - altura) / 2) + er;
  ctx.beginPath(); ctx.arc(W / 2, ey, er, 0, Math.PI * 2); ctx.fillStyle = "#eef0ff"; ctx.fill();
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `${Math.round(er * 1.1)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
  ctx.fillStyle = "#0a0d14";
  ctx.fillText(emojiDe(cod), W / 2, ey + 6);
  ctx.textBaseline = "alphabetic";

  // nome
  let y = ey + er + tamNome * 1.3;
  ctx.fillStyle = "#0a0d14";
  ctx.font = `500 ${tamNome}px Poppins, sans-serif`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "-2px";
  for (const l of linhasNome) { ctx.fillText(l, W / 2, y); y += tamNome * 1.08; }
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // frase
  y += 20;
  ctx.font = `italic 400 ${tamFrase}px Poppins, sans-serif`;
  ctx.fillStyle = "#545968";
  for (const l of linhasFrase) { ctx.fillText(l, W / 2, y); y += tamFrase * 1.35; }

  // atributos
  ctx.fillStyle = "#ebedf2"; ctx.fillRect(ix, yAttr - 50, iw, 2);
  atributos(res, estado.r).forEach(([rot, v], i) => {
    const ya = yAttr + i * 72;
    ctx.textAlign = "left"; ctx.fillStyle = "#1f2330"; ctx.font = mono(26);
    ctx.fillText(rot.toUpperCase(), ix, ya + 10);
    for (let s = 0; s < 5; s++) {
      const sw = 62, sx = ix + iw - (5 - s) * (sw + 10) + 10;
      retanguloArredondado(ctx, sx, ya - 10, sw, 22, 5);
      ctx.fillStyle = s < v ? "#3344ff" : "#ebedf2"; ctx.fill();
    }
  });

  // rodapé da carta
  const lh2 = 40, lw2 = (logoCor.width / logoCor.height) * lh2;
  ctx.fillStyle = "#ebedf2"; ctx.fillRect(ix, cy + ch - 100, iw, 2);
  ctx.drawImage(logoCor, ix + iw - lw2, cy + ch - 78, lw2, lh2);
  ctx.textAlign = "left"; ctx.fillStyle = "#545968"; ctx.font = mono(24);
  ctx.fillText(urlPublica().toUpperCase().replace(/\/$/, ""), ix, cy + ch - 50);

  // chamada
  if (story) {
    ctx.textAlign = "center"; ctx.fillStyle = "#ffffff";
    ctx.font = "500 54px Poppins, sans-serif";
    ctx.fillText("E você, que tipo de caçador(a) é?", W / 2, cy + ch + 130);
    ctx.font = "500 34px 'DM Sans', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.75)";
    ctx.fillText("Descubra em 2 minutos → " + urlPublica().replace(/\/$/, ""), W / 2, cy + ch + 196);
  } else {
    ctx.textAlign = "center"; ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.font = "500 34px 'DM Sans', sans-serif";
    ctx.fillText("E você? Descubra em 2 min → " + urlPublica().replace(/\/$/, ""), W / 2, cy + ch + 110);
  }
  return cv;
}
async function compartilharCard(formato, res, d) {
  trackEvent("compartilhar", { resultado: res.resultado, formato });
  toast("Gerando o seu card…", 1500);
  try {
    const cv = await desenharCard(formato, res);
    const blob = await new Promise((ok) => cv.toBlob(ok, "image/png"));
    const nome = `arquetipo-${ARQ[res.resultado][d.genero].toLowerCase().normalize("NFD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-")}-${formato}.png`;
    const arquivo = new File([blob], nome, { type: "image/png" });
    const texto = genero(Q.resultados[res.resultado].compartilhar) + (CONFIG.INSTAGRAM ? " " + CONFIG.INSTAGRAM : "");
    if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
      await navigator.share({ files: [arquivo], text: texto });
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(formato === "story" ? "Card baixado! Posta no story e marca a Leadhunter 😉" : "Card baixado! É só postar 😉", 3200);
  } catch (e) {
    if (e && e.name === "AbortError") return;
    console.warn("card falhou", e);
    toast("Não deu para gerar o card agora. Tenta de novo?");
  }
}

/* ---------- início ---------- */
$("comecar").addEventListener("click", () => {
  if (estado.trilhaFixa) estado.trilha = estado.trilhaFixa;
  estado.i = 0;
  mostrar("quiz");
  renderPasso();
  trackEvent("inicio", { trilha_fixa: estado.trilhaFixa || "" });
});
$("voltar").addEventListener("click", voltar);
montarLanding();
window.__quiz = { estado, desenharCard }; // para testes
