# App do quiz

Quiz pronto para hospedar, com o design system da Leadhunter aplicado. HTML/CSS/JS puro, sem bibliotecas (só as fontes do Google).

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Telas: landing, quiz, metade do caminho, carregamento e resultado |
| `app.js` | Interface: passos, captura, resultado, carta, cards de compartilhamento, WhatsApp, analytics. **Configuração no topo.** |
| `motor.js` | Lógica de resultado (porta fiel de `logica/motor.py`). Não mexer: mude `logica/quiz-config.json`. |
| `style.css` | Visual (tokens da marca em `:root`) |
| `icones.js` | Ícones Lucide (licença ISC) usados na interface e nos emblemas dos arquétipos |
| `quiz-data.js` | **Gerado** a partir de `copy/` e `logica/quiz-config.json`. Não editar à mão. |
| `build.py` | Gera o `quiz-data.js` |
| `og.png` | Imagem de prévia do link (WhatsApp, LinkedIn, Instagram) |
| `assets/` | Logos (branca e colorida) e favicon |
| `planilha-google-apps-script.js` | Script para salvar os leads numa Planilha Google |

## Testar agora

Na pasta `app/`, rode `python3 -m http.server` e abra `http://localhost:8000`. Abrir o `index.html` com dois cliques também funciona, mas o card de compartilhamento precisa de um servidor.

Links por trilha:
- `…/?t=negocio` → pula a bifurcação, headline "Seu LinkedIn está pronto pra prospectar?"
- `…/?t=carreira` → pula a bifurcação, headline "Seu LinkedIn está pronto pra próxima vaga?"
- Combine com UTMs: `?t=negocio&utm_source=instagram&utm_medium=paid&utm_campaign=quiz-negocio&utm_content=carrossel-arquetipos`

## Mudou um texto?

1. Edite o arquivo em `copy/` (perguntas, resultados, blocos, mensagens de WhatsApp) ou os pesos em `logica/quiz-config.json`.
2. Na raiz do repositório: `python3 app/build.py`
3. Testes: `python3 logica/motor.py` e `python3 logica/teste-paridade.py` (precisa de Node.js).

A microcopy de interface (headlines por trilha, rótulos dos eixos, frases do carregamento) fica no objeto `UI` no topo do `app.js`.

## Antes de divulgar

Preencha o `CONFIG` no topo do `app.js`:

| Campo | Para quê |
|---|---|
| `WEBHOOK_URL` | Salvar os leads na planilha (passo a passo em `planilha-google-apps-script.js`). Sem isso, nada fica salvo. |
| `META_PIXEL_ID` | Meta Pixel. Dispara `ViewContent` (landing), **`Lead`** (captura enviada) e **`Contact`** (clique no WhatsApp). Use `Lead` como evento de otimização da campanha. |
| `GA4_ID` | GA4. Dispara `generate_lead` e `contact`, além dos `quiz_*`. |
| `URL_PUBLICA` | Endereço impresso no card (ex.: `leadhunter.com.br/quiz`). |
| `INSTAGRAM` | @ da Leadhunter no texto de compartilhamento. |
| `JOSE_FOTO_URL` | Foto do José na landing (ex.: `assets/jose.jpg`). Sem ela, aparecem as iniciais. |
| `PAGINA_CARREIRA_URL` | Link do conteúdo de carreira no resultado da Trilha Carreira. |

Depois:
1. Em `index.html`, troque `og:image` por URL absoluta (ex.: `https://leadhunter.com.br/quiz/og.png`).
2. Publique a pasta `app/` (Netlify Drop, Vercel ou GitHub Pages).
3. Teste o link no WhatsApp para ver a prévia com a imagem.
