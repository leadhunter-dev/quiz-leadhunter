# App do quiz (versão de validação)

Quiz funcionando, pronto para hospedar. O visual é provisório: o design system da Leadhunter entra depois.

**Base:** [SurveyJS Form Library](https://github.com/surveyjs/survey-library) (MIT), carregada por CDN. Ela cuida de páginas, validação, voltar/avançar e animações de transição. O resto é só HTML/CSS/JS simples.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Página: landing, quiz, carregamento e resultado |
| `app.js` | Monta o quiz, calcula o resultado (mesma lógica de `logica/motor.py`) e gera o botão de WhatsApp. **Configuração no topo.** |
| `style.css` | Visual provisório (cores em `:root`) |
| `quiz-data.js` | **Gerado** a partir de `copy/` e `logica/quiz-config.json`. Não editar à mão. |
| `build.py` | Gera o `quiz-data.js` |
| `planilha-google-apps-script.js` | Script para salvar os leads numa Planilha Google |

## Testar agora

Dê dois cliques em `index.html` (precisa de internet para carregar a biblioteca).

## Mudou um texto?

1. Edite o arquivo em `copy/` (perguntas, resultados ou mensagens de WhatsApp) ou os pesos em `logica/quiz-config.json`.
2. Na pasta `quiz-funnel`, rode: `python3 app/build.py`
3. Recarregue a página.

## Antes de divulgar

1. **Salvar os leads:** siga o passo a passo no topo de `planilha-google-apps-script.js` e cole a URL em `WEBHOOK_URL` no `app.js`. Sem isso, os dados da captura não ficam salvos em lugar nenhum (só a conversa no WhatsApp).
2. **Link da página de carreira:** cole em `PAGINA_CARREIRA_URL` no `app.js`.
3. **Publicar:** arraste a pasta `app/` para [app.netlify.com/drop](https://app.netlify.com/drop) (grátis, gera um link na hora). Vercel ou GitHub Pages também funcionam.
4. (Opcional) Colar a tag do GA4 ou do Meta Pixel no `index.html`: os eventos `quiz_inicio`, `quiz_pergunta`, `quiz_resultado`, `quiz_whatsapp` e `quiz_compartilhar` já são disparados.
