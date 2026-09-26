# Brief para o agente de design (passo 2)

Use o design system da Leadhunter para transformar este repositório em um quiz em HTML hospedável.

## Leia nesta ordem
1. `docs/01-framework.md` — jornada, arquétipos, motor
2. `copy/01-telas-de-entrada-e-captura.md` · `copy/02-perguntas.md` · `copy/03-resultados.md`
3. `copy/04-whatsapp-e-pos-quiz.md` — links de CTA
4. `logica/quiz-config.json` — pesos e travas (**não reescreva a lógica: porte `logica/motor.py` para JS e rode os mesmos casos-teste**)

## Requisitos
- Mobile first (a maior parte do tráfego vem de Instagram e LinkedIn no celular)
- Uma pergunta por tela, barra de progresso, avanço automático ao clicar na resposta, botão voltar
- Tela 2 define gênero: substituir toda notação `[m|f]` pela forma escolhida
- 6 arquétipos × 2 versões = **11 ilustrações/avatares** (Especialista, Refém e Explorador compartilham conceito, mudando só o personagem; General ⚔️ e Rainha 👑 são distintos)
- Card de compartilhamento por resultado (1080×1920 para stories e 1200×627 para LinkedIn) com nome, emoji e frase de efeito
- CTA WhatsApp montado dinamicamente com o primeiro nome do lead
- Bloco "Alerta de autoridade" condicional
- Enviar todos os dados do lead (lista em `docs/01-framework.md`, seção 5) para um webhook
- UTMs capturadas da URL
- Eventos de analytics: início, cada pergunta respondida, captura, resultado, clique no WhatsApp, compartilhamento

## Tom visual
Divertido nos personagens, profissional no resto. É B2B: o card precisa ser algo que um diretor compartilharia no LinkedIn sem vergonha.
