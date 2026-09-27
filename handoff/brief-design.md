# Brief para o agente de design (passo 2)

Use o design system da Leadhunter para transformar este repositório em um quiz em HTML hospedável.

> **Documento principal: `handoff/PRD.md`.** O quiz já funciona em `app/` — o trabalho é o visual, não refazer a lógica.

## Leia nesta ordem
1. `docs/01-framework.md` — jornada, arquétipos, motor
2. `copy/01-telas-de-entrada-e-captura.md` (inclui a bifurcação e as duas capturas)
3. `copy/02-perguntas-negocio.md` · `copy/03-perguntas-carreira.md`
4. `copy/04-resultados-negocio.md` · `copy/05-resultados-carreira.md`
5. `copy/06-whatsapp-e-pos-quiz.md` — links de CTA
6. `logica/quiz-config.json` — pesos e travas (**não reescreva a lógica: porte `logica/motor.py` para JS e rode os mesmos casos-teste**)

## Requisitos
- Mobile first (a maior parte do tráfego vem de Instagram e LinkedIn no celular)
- Uma pergunta por tela, barra de progresso, avanço automático ao clicar na resposta, botão voltar
- Tela 2 define gênero: substituir toda notação `[m|f]` pela forma escolhida
- Tela 3 define a trilha (Negócio: 10 perguntas · Carreira: 5 perguntas); a barra de progresso se ajusta à trilha
- 10 arquétipos × 2 versões = **20 avatares** (General ⚔️/Rainha 👑 e Foguete 🚀/Estrela ⭐ têm conceitos diferentes entre as versões)
- Visual da Trilha Carreira pode ser um pouco mais leve e acessível — o público inclui gente do varejo e em busca de emprego
- Card de compartilhamento por resultado (1080×1920 para stories e 1200×627 para LinkedIn) com nome, emoji e frase de efeito
- CTA WhatsApp montado dinamicamente com o primeiro nome do lead
- Blocos condicionais: "Alerta de autoridade" e "Convite para a Trilha Carreira"
- Enviar todos os dados do lead (lista em `docs/01-framework.md`, seção 5) para um webhook
- UTMs capturadas da URL
- Eventos de analytics: início, cada pergunta respondida, captura, resultado, clique no WhatsApp, compartilhamento

## Tom visual
Divertido nos personagens, profissional no resto. É B2B: o card precisa ser algo que um diretor compartilharia no LinkedIn sem vergonha.
