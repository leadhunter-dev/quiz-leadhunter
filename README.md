# Quiz Funnel Leadhunter — "Que tipo de caçador(a) B2B você é?"

Quiz que direciona o lead entre **Plataforma Leadhunter**, **Serviço Completo** e **Consultoria de Autoridade**, com resultados em arquétipos (versões masculina e feminina) e CTA para o WhatsApp do José.

```
quiz-funnel/
├── docs/
│   ├── 01-framework.md            ← estratégia, jornada, arquétipos, motor, métricas, pendências
│   ├── 02-mapa-mental.html        ← mapa mental visual (abrir no navegador)
│   └── 02-mapa-mental.mmd         ← mesmo mapa em Mermaid (editável)
├── copy/
│   ├── 01-telas-de-entrada-e-captura.md
│   ├── 02-perguntas.md
│   ├── 03-resultados.md
│   ├── 04-whatsapp-e-pos-quiz.md
│   └── 05-diagnostico-linkedin.md
├── logica/
│   ├── quiz-config.json           ← FONTE DA VERDADE dos pesos e travas
│   ├── motor.py                   ← calcula o resultado, roda testes, gera a tabela
│   └── pontuacao.md               ← tabela gerada automaticamente
└── handoff/
    └── brief-design.md            ← instruções para o agente de design (passo 2)
```

## Convenções
- `[m|f]` nos textos = forma masculina ou feminina, trocada pela escolha da Tela 2.
- Mudou um peso? Edite `quiz-config.json` e rode `python3 logica/motor.py` para testar e regenerar a tabela.

## Status
v0.1 — textos base prontos para revisão. Pendências em `docs/01-framework.md`, seção 8.
