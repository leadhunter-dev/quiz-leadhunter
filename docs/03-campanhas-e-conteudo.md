# Campanhas no Instagram e conteúdo orgânico

> Como levar tráfego para o quiz e transformar os arquétipos em pauta. Números de meta são referência inicial para começar a medir, não benchmarks da Leadhunter.

---

## 1. Links

Cada peça aponta para um link com trilha + UTMs. A trilha pula a bifurcação e troca a headline; as UTMs vão para a planilha.

| Uso | Link (troque o domínio) |
|---|---|
| Anúncio Negócio | `leadhunter.com.br/quiz/?t=negocio&utm_source=instagram&utm_medium=paid&utm_campaign=quiz-negocio&utm_content=<criativo>` |
| Anúncio Carreira | `leadhunter.com.br/quiz/?t=carreira&utm_source=instagram&utm_medium=paid&utm_campaign=quiz-carreira&utm_content=<criativo>` |
| Link na bio | `leadhunter.com.br/quiz/?utm_source=instagram&utm_medium=bio` |
| Stories orgânicos | `…/?t=negocio&utm_source=instagram&utm_medium=stories&utm_content=<tema>` |
| DM por palavra-chave | `…/?utm_source=instagram&utm_medium=dm&utm_content=cacador` |
| Posts do José no LinkedIn | `…/?t=negocio&utm_source=linkedin&utm_medium=organico` |

Sem `t` = o visitante escolhe a trilha (use na bio e em conteúdos que falam com os dois públicos).

---

## 2. Campanhas pagas (Meta Ads)

**Estrutura:** duas campanhas separadas — **Quiz Negócio** e **Quiz Carreira**. Públicos, valor do lead e orçamento são diferentes; a Carreira não pode consumir a verba da Negócio.

| | Quiz Negócio | Quiz Carreira |
|---|---|---|
| Objetivo | Leads (conversão no site) | Leads (conversão no site) |
| Evento de otimização | `Lead` (captura enviada). Com volume, testar `Contact` (clique no WhatsApp) | `Lead` |
| Público | Donos, sócios, diretores e heads comerciais de empresas B2B (interesses + cargos + lookalike da base de clientes, quando houver) | Pessoas buscando emprego, crescimento ou migração para vendas |
| Link | `?t=negocio` | `?t=carreira` |

**Pré-requisito:** `META_PIXEL_ID` preenchido no `app.js` e o domínio verificado no Gerenciador de Negócios.

### Ângulos de criativo (testar em paralelo)

1. **"Qual desses é você?"** — carrossel com as cartas dos arquétipos (verso "?" na capa, uma carta por slide, CTA no último). Formato mais direto do quiz.
2. **Founder** — Reels do José falando de um arquétipo por vez: *"Se você é Refém da Indicação, esse vídeo é pra você."* Termina com "faz o quiz, link aqui".
3. **Pergunta do quiz como gancho** — a Q7 em tela: *"Um decisor abre seu LinkedIn agora. Em 5 segundos ele entende o que você resolve?"*
4. **Diagnóstico** (para o público mais sênior) — *"Diagnóstico de prospecção em 2 minutos: qual é o seu perfil de caçador B2B?"*. Mesmo quiz, tom mais sério. Comparar CTR e conclusão com o ângulo 1.
5. **Prova** (depois do lançamento, com autorização) — cards reais que as pessoas postaram.

**Ganchos prontos (Negócio)**
- "Seus melhores clientes vieram de indicação? Então você pode ser Refém da Indicação."
- "Você é bom no que faz. O mercado sabe disso?"
- "Tem time comercial e a meta ainda é loteria?"
- "Sabe exatamente onde atacar. Só falta quem vá ao campo."

**Ganchos prontos (Carreira)**
- "Manda currículo pra todo lado e ninguém chama?"
- "Vendeu no balcão a vida toda? Isso conta — e muito."
- "Quer migrar para vendas e não sabe por onde começar?"

### Remarketing

| Público | Mensagem |
|---|---|
| Iniciou o quiz e não mandou a captura (`quiz_inicio` sem `Lead`) | "Seu arquétipo ficou pela metade. Faltam poucas perguntas." |
| Mandou a captura e não clicou no WhatsApp (`Lead` sem `Contact`) | Criativo do José: "Sua análise de LinkedIn está te esperando — me chama no WhatsApp." |

### O que medir (por trilha e por criativo)

- Custo por lead (`Lead`) e custo por conversa (`Contact`)
- Taxas do funil: landing → início → captura → WhatsApp (metas em `01-framework.md`, seção 6)
- **Arquétipo por campanha** (planilha): se a Negócio só traz Explorador/Especialista, o público está errado para o Serviço Completo — ajustar segmentação antes de aumentar verba.

---

## 3. Conteúdo orgânico

Os 10 arquétipos são uma série pronta: os textos de `copy/04` e `copy/05` já têm quem é, superpoder, ponto cego e "se nada mudar".

### Série fixa: "Arquétipo da semana"
Carrossel de 6 slides no visual da carta:
1. Capa: carta com verso "?" + "Você é [arquétipo]?"
2. Quem é você
3. Superpoder
4. Ponto cego
5. Se nada mudar…
6. "Descubra o seu: link na bio" + palavra-chave na DM

10 arquétipos ≈ 10 semanas de pauta. Alternar Negócio e Carreira conforme o público que você quer puxar.

### Outros formatos
- **Reels do José** comentando o ponto cego de um arquétipo (30–45 s, fala direta, sem roteiro decorado).
- **Stories com enquete:** "Qual desses você acha que é?" (2–4 opções) → no dia seguinte, story com link do quiz.
- **Destaque fixo "QUIZ"** no perfil, com o story do link e os cards das pessoas.
- **Palavra-chave na DM:** "Comenta CAÇADOR que eu te mando o link" (ManyChat ou similar), com link `utm_medium=dm`.
- **Dados reais da planilha** (quando houver volume): "O arquétipo mais comum entre quem fez o quiz este mês". Sem inventar números.
- **Repost dos cards** que as pessoas postarem marcando a Leadhunter.

### Cadência sugerida (primeiras 4 semanas)
- 1 carrossel "Arquétipo da semana"
- 1 Reels do José
- 1 post de gancho/pergunta do quiz
- Stories diários (enquete, bastidor, link)

---

## 4. Decisões em aberto

- **Nome do Explorador(a) de Outros Mares:** é o resultado de quem tem ticket baixo ou vende para pessoa física, e o nome não nomeia uma dor. Ideias para avaliar: "O Vendedor de Vitrine", "O Atirador de Varejo". Mudar em `logica/quiz-config.json` (m/f) e nos textos de `copy/04` e `copy/06`, depois rodar o build e os testes.
- **Frase "centenas de reuniões toda semana"** no bloco "Por trás deste diagnóstico": conferir contra os números reais antes de escalar anúncio.
- **Ilustrações dos 20 arquétipos:** hoje a carta usa o emoji num círculo. Um estilo único (duotone azul/tinta, objeto-símbolo do arquétipo) substitui o emoji sem mudar o layout.
