# PRD — Quiz Funnel Leadhunter "Que tipo de caçador(a) você é?"

**Versão:** 1.0 (conteúdo e lógica v0.3) · **Dono:** José Henrique Mota · **Status:** funcional validado; falta o visual definitivo
**Para quem é este documento:** o agente de design/front que vai aplicar o design system da Leadhunter e publicar o quiz.

---

## 1. Contexto e objetivo

A Leadhunter vende três coisas para públicos diferentes e hoje não tem um filtro de entrada. O quiz é esse filtro: em 1 a 2 minutos a pessoa descobre o seu "arquétipo" (formato BuzzFeed, compartilhável) e termina numa conversa no **WhatsApp do José** já com a oferta certa. Nada é vendido na página — **sem link de pagamento**: a validação de oferta e preço acontece na conversa.

**Objetivos**
1. Gerar conversas qualificadas no WhatsApp do José, com contexto (trilha + arquétipo) na primeira mensagem.
2. Direcionar cada pessoa para a oferta que faz sentido (ninguém é desqualificado).
3. Ser divertido o bastante para ser compartilhado (arquétipos em versão masculina e feminina).
4. Validar demanda e preço da oferta de carreira antes de investir nela.

## 2. Públicos e ofertas

| Trilha | Público | Ofertas possíveis |
|---|---|---|
| **Negócio** (10 perguntas) | Donos, sócios, líderes comerciais, consultores, vendedores/SDRs | Serviço Completo (R$ 3.800–6.000/mês) · Plataforma Leadhunter (R$ 500/mês) · Consultoria de Autoridade (a definir) · Ajuste de LinkedIn (a definir) |
| **Carreira** (5 perguntas) | Quem quer crescer na carreira, trocar de emprego ou migrar para vendas (inclui gente do varejo sem LinkedIn) | Currículo + LinkedIn (preço a validar) |

**Arquétipos (10 × versão M/F)**
- Negócio: 🕶️ Especialista Invisível · 🏹 Caçador(a) Solitário(a) · 🎼 Maestro/Maestra · ⚔️ General sem Exército / 👑 Rainha sem Exército · 🎲 Refém da Indicação · 🧭 Explorador(a) de Outros Mares
- Carreira: 💎 Talento Escondido(a) · 👻 Candidato(a) Fantasma · 🚀 Foguete na Rampa / ⭐ Estrela em Ascensão · 🧳 Viajante de Rota Nova

## 3. Escopo

**Dentro (v1):** landing, escolha de gênero, escolha de trilha, perguntas, captura, carregamento, resultado, CTA WhatsApp, compartilhamento, convite para a Trilha Carreira, envio do lead para planilha, eventos de analytics, visual com o design system da Leadhunter.

**Fora (v1):** pagamento, área logada, e-mails automáticos, painel de leads (a planilha resolve), múltiplos idiomas, CMS.

## 4. Fluxo e telas

```
Landing → Caçador/Caçadora → "O que te trouxe até aqui?"
  ├─ Negócio:  Q1…Q10 → Captura (LinkedIn opcional)   ─┐
  └─ Carreira: C1…C5  → Captura (LinkedIn opcional)   ──┴→ Carregamento (~3 s) → Resultado → WhatsApp
```

| # | Tela | Conteúdo (fonte) | Comportamento |
|---|---|---|---|
| T1 | Landing | `copy/01` Tela 1 | Botão "Descobrir meu arquétipo" |
| T2 | Caçador ou Caçadora | `copy/01` Tela 2 | Define gênero de TODO o texto seguinte |
| T3 | Bifurcação | `copy/01` Tela 3 | Define a trilha; barra de progresso passa a contar só as telas da trilha |
| T4 | Perguntas | `copy/02` (Negócio) / `copy/03` (Carreira) | 1 por tela, avança sozinho ao escolher, botão voltar, barra de progresso |
| T4b | Reações | `copy/01` | Toast de ~2,5 s após algumas respostas (máx. 1 por tela) |
| T5 | Captura | `copy/01` (duas versões) | Nome, WhatsApp, e-mail, LinkedIn, consentimento LGPD; validação inline |
| T6 | Carregamento | `copy/01` | 3 frases alternando, ~3 s |
| T7 | Resultado | `copy/04` (Negócio) / `copy/05` (Carreira) | Ver seção 5.4 |

## 5. Requisitos funcionais

### 5.1 Gênero
- RF1 — Todo texto com a notação `[masculino|feminino]` é exibido na forma escolhida na T2 (títulos, opções, resultados, mensagem de WhatsApp, texto de compartilhamento).
- RF2 — Nome, emoji e avatar do resultado mudam por gênero (General ⚔️ ↔ Rainha 👑; Foguete 🚀 ↔ Estrela ⭐ são conceitos diferentes).

### 5.2 Perguntas
- RF3 — Uma pergunta por tela, escolha única, avanço automático (~400 ms) e botão voltar que preserva respostas.
- RF4 — Só aparecem as perguntas da trilha escolhida.

### 5.3 Captura
- RF5 — Campos: nome (obrigatório) · WhatsApp com DDD (obrigatório, 10–13 dígitos) · e-mail (obrigatório, válido) · LinkedIn (opcional nas duas trilhas; se preenchido, deve conter `linkedin.com/`). Na Negócio, o microcopy reforça: sem link, sem análise · consentimento LGPD (obrigatório).
- RF6 — A captura vem **antes** do resultado.

### 5.4 Resultado
- RF7 — Ordem: "[Nome], seu arquétipo é" · avatar/emoji animado · nome do arquétipo · frase de efeito · Quem é você · Superpoder · Ponto cego · Se nada mudar · [Alerta de autoridade, se aplicável] · Bloco da oferta (título, texto, bônus, link de conteúdo na Carreira) · [Aviso "sem LinkedIn", se a Negócio veio sem link] · **Botão WhatsApp** · Por trás deste diagnóstico (prova da Leadhunter, as duas trilhas) · [Convite Trilha Carreira, se aplicável] · Compartilhar · Refazer.
- RF8 — **Alerta de autoridade:** aparece em Caçador(a), Maestro/Maestra, General/Rainha e Refém quando a nota de autoridade (Q7+Q8) ≤ 2.
- RF9 — **Convite para a Trilha Carreira:** aparece quando Q1 = E (vendedor/SDR). Ao clicar, reinicia na C1 mantendo gênero e dados da captura.
- RF10 — **Botão WhatsApp:** `https://wa.me/5521969353524?text=<mensagem>` com a mensagem do arquétipo (`copy/06`, seção 1) na forma do gênero e com o primeiro nome inserido ("Oi José! Aqui é Ana. Fiz o quiz…"). Abre em nova aba.
- RF11 — **Compartilhar:** Web Share API no celular; no desktop copia o texto + URL e mostra toast.
- RF12 — Link "conteúdo para você" (Carreira) só aparece se `PAGINA_CARREIRA_URL` estiver preenchida.

### 5.5 Lógica de resultado — NÃO reescrever
- RF13 — A lógica vive em `logica/quiz-config.json` (pesos, travas) e está implementada em `logica/motor.py` e em `app/app.js` (`calcularNegocio`, `calcularCarreira`). Qualquer nova interface deve **reusar `app.js`/`quiz-data.js` ou portar a função sem mudanças**.
- RF14 — Regra-chave: **Serviço Completo** (General/Rainha, Refém) só é resultado se faturamento **> R$ 100 mil/mês (Q10 = F)** **e** time de vendas mínimo **(Q6 = B ou C)**. Demais travas em `docs/01-framework.md`.

### 5.6 Dados e integrações
- RF15 — Ao concluir, enviar o lead por `POST` (no-cors, `text/plain` com JSON) para `WEBHOOK_URL` (Google Apps Script → Planilha; script pronto em `app/planilha-google-apps-script.js`). Campos: `data, nome, whatsapp, email, linkedin, genero, trilha, arquetipo, arquetipo_nome, temperatura, autoridade, alerta_autoridade, pontos, respostas, utm, pagina`.
- RF16 — Capturar todos os parâmetros `utm_*` da URL.
- RF17 — Eventos (GA4 `gtag` e Meta `fbq`, se presentes): `quiz_inicio`, `quiz_trilha`, `quiz_pergunta`, `quiz_resultado`, `quiz_whatsapp`, `quiz_compartilhar`.

## 6. Requisitos de design (escopo do agente de design)

- D1 — **Mobile first** (tráfego vem de Instagram e LinkedIn no celular). Alvos de toque ≥ 48 px, sem scroll horizontal, funciona em 360 px.
- D2 — Aplicar o design system da Leadhunter (cores, tipografia, componentes). Hoje as cores provisórias estão em `app/style.css` `:root`.
- D3 — **20 avatares/ilustrações** (10 arquétipos × M/F). Tom: divertido nos personagens, profissional no resto — é B2B; um diretor precisa se sentir à vontade compartilhando.
- D4 — Trilha Carreira pode ter um visual um pouco mais leve e acessível (público inclui varejo e pessoas buscando emprego).
- D5 — **Cards de compartilhamento** por resultado e gênero: 1080×1920 (stories) e 1200×627 (LinkedIn), com avatar, nome do arquétipo, frase de efeito e marca.
- D6 — Animações: entrada em cascata, transição entre perguntas, "pop" ao escolher, carregamento, revelação do resultado (confete leve), pulso no botão WhatsApp. Respeitar `prefers-reduced-motion`.
- D7 — Botão WhatsApp é o elemento mais forte da página de resultado.
- D8 — Acessibilidade: contraste AA, foco visível, textos dos botões descritivos.
- D9 — Performance: página inicial < 2 s em 4G; nada bloqueante além do necessário.

## 7. Conteúdo: fonte da verdade e build

- Textos: `copy/*.md`. Lógica: `logica/quiz-config.json`.
- `python3 app/build.py` gera `app/quiz-data.js` (o quiz lê só esse arquivo). **Nunca editar `quiz-data.js` à mão.**
- Se o design exigir novos textos, adicionar em `copy/` e no `build.py`, não direto no HTML.

## 8. Implementação atual (base funcional)

- `app/` — HTML/CSS/JS estático + **SurveyJS Form Library 3.1.1 (MIT)** via CDN (páginas, validação, voltar, transições).
- Pode trocar a camada visual (ou até o SurveyJS), desde que os RFs e os testes da seção 10 continuem passando.
- Hospedagem: qualquer estático (Netlify Drop, Vercel, GitHub Pages). Configuração no topo de `app/app.js`: `WEBHOOK_URL`, `PAGINA_CARREIRA_URL`.

## 9. Métricas de sucesso

| Métrica | Meta inicial |
|---|---|
| Landing → início | > 50% |
| Início → conclusão | > 60% |
| Conclusão → captura | > 70% |
| Resultado → clique no WhatsApp | > 30% |
| Carreira: conversa → compra | valida preço e demanda |

## 10. Critérios de aceite

1. `python3 logica/motor.py` → 0 falhas.
2. Mesmas respostas → mesmo arquétipo no site e no `motor.py` (a versão atual passou em 5.015 combinações).
3. Percorrer as duas trilhas nas duas versões de gênero até o resultado, sem erro no console.
4. Caso General: Q1=B, Q2=A, Q3=D, Q4=E, Q5=B, Q6=B, Q7=A, Q8=A, Q9=B, Q10=F → General sem Exército. Trocar Q10 para E → **não** pode ser General nem Refém.
5. Link do WhatsApp abre com nome e arquétipo corretos, na forma do gênero.
6. Lead aparece na planilha com todos os campos da RF15.
7. Layout ok em 360 px, 390 px e desktop; Lighthouse acessibilidade ≥ 90.

## 11. Pendências (não bloqueiam o visual)

- Preço/escopo: Consultoria de Autoridade, Ajuste de LinkedIn, Currículo + LinkedIn
- Link da página de conteúdo sobre carreira
- Faixas de ticket da Q3 (provisórias)
- Confirmar o WhatsApp que recebe os leads: (21) 96935-3524

## 12. Mapa do repositório

`docs/01-framework.md` (estratégia e regras) · `docs/02-mapa-mental.html` · `copy/` (todos os textos) · `logica/` (config, motor, tabela de pontuação) · `app/` (quiz funcionando) · `handoff/brief-design.md` (resumo curto) · `handoff/PRD.md` (este documento)
