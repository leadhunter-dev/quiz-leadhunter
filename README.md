# Quiz Funnel Leadhunter — "Que tipo de caçador(a) você é?"

Quiz com duas trilhas. **Negócio:** direciona entre Plataforma Leadhunter, Serviço Completo, Consultoria de Autoridade e Ajuste de LinkedIn. **Carreira:** leva quem quer crescer ou conseguir um emprego melhor para Currículo + LinkedIn. Resultados em arquétipos (versões masculina e feminina) e CTA para o WhatsApp do José.

```
quiz-funnel/
├── docs/
│   ├── 01-framework.md            ← estratégia, jornada, arquétipos, motor, métricas, pendências
│   ├── 02-mapa-mental.html        ← mapa mental visual (abrir no navegador)
│   ├── 02-mapa-mental.mmd         ← mesmo mapa em Mermaid (editável)
│   └── 03-campanhas-e-conteudo.md ← Instagram: campanhas pagas, conteúdo orgânico, links e métricas
├── copy/
│   ├── 01-telas-de-entrada-e-captura.md
│   ├── 02-perguntas-negocio.md
│   ├── 03-perguntas-carreira.md
│   ├── 04-resultados-negocio.md
│   ├── 05-resultados-carreira.md
│   ├── 06-whatsapp-e-pos-quiz.md
│   └── 07-diagnostico-linkedin.md
├── logica/
│   ├── quiz-config.json           ← FONTE DA VERDADE dos pesos e travas
│   ├── motor.py                   ← calcula o resultado, roda testes, gera a tabela
│   ├── teste-paridade.py          ← confere se o site dá o mesmo resultado que o motor.py
│   └── pontuacao.md               ← tabela gerada automaticamente
├── handoff/
│   ├── PRD.md                     ← requisitos completos para o agente de design
│   └── brief-design.md            ← resumo curto
└── app/                           ← QUIZ FUNCIONANDO (abrir app/index.html) — ver app/README.md
```

## Convenções
- `[m|f]` nos textos = forma masculina ou feminina, trocada pela escolha da Tela 2.
- Mudou um peso? Edite `quiz-config.json` e rode `python3 logica/motor.py` para testar e regenerar a tabela.

## Status

- **Quiz em `app/` com o design system da Leadhunter** (sem bibliotecas; carta do arquétipo, cards para story/feed, Meta Pixel/GA4 prontos para configurar). Mudou texto em `copy/`? Rode `python3 app/build.py`.
v1.1 — redesign completo. v0.2 — Trilha Carreira adicionada, ninguém é desqualificado. Pendências em `docs/01-framework.md`, seção 8.
