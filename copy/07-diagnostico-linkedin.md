# Diagnóstico de LinkedIn — Nota de Autoridade

Base do bônus prometido no quiz e da futura **Consultoria de Autoridade**. Segue a lógica do SOP de reposicionamento de perfil que o time já usa (captura do perfil → cruzamento com o ICP → diagnóstico → plano de ações).

## 1. Critérios (0 a 2 pontos cada → nota de 0 a 18)

| # | Item | 0 | 1 | 2 |
|---|---|---|---|---|
| 1 | **Foto** | Sem foto ou foto inadequada | Foto ok, pouco profissional | Rosto nítido, fundo limpo, transmite confiança |
| 2 | **Capa** | Padrão do LinkedIn | Imagem genérica | Diz o que resolve e para quem (ou traz prova) |
| 3 | **Headline** | Só o cargo | Cargo + área | Problema que resolve + para quem + prova |
| 4 | **Sobre** | Vazio | Currículo em 1ª pessoa | Fala da dor do cliente, método, provas e CTA |
| 5 | **Destaques** | Vazio | Itens soltos | Cases, materiais, depoimentos alinhados ao ICP |
| 6 | **Experiência** | Só cargos e datas | Descreve tarefas | Descreve resultados e clientes |
| 7 | **Recomendações** | Nenhuma | Poucas ou antigas | Recentes, de clientes do perfil que ele quer atrair |
| 8 | **Atividade** | Nenhuma nos últimos 90 dias | Esporádica | Publica ou comenta com frequência, no tema certo |
| 9 | **Rede** | Pouco alinhada ao ICP | Parcialmente alinhada | Cheia de decisores do mercado-alvo |

**Classificação**
- **0–6 · Invisível:** o perfil atrapalha a prospecção. Prioridade total: Consultoria de Autoridade.
- **7–12 · Em construção:** dá para prospectar, mas a conversão fica abaixo do potencial. Ajustes rápidos antes de acelerar.
- **13–18 · Vitrine:** perfil pronto para receber volume.

## 2. Prompt padrão para a análise (Claude for Chrome, com o perfil aberto)

```
Você é analista de autoridade no LinkedIn da Leadhunter.
Leia este perfil de cima a baixo (foto, capa, headline, sobre, destaques,
experiência, recomendações, atividade recente).

Contexto do quiz:
- Arquétipo: [ARQUÉTIPO]
- O que a pessoa vende / para quem (se souber): [ ]

Entregue:
1. Nota de 0 a 2 para cada um dos 9 critérios da tabela da Leadhunter, com uma
   linha de justificativa cada, e a nota total de 0 a 18.
2. O ponto mais forte do perfil (1 elogio específico e verdadeiro).
3. Os 2 ajustes de maior impacto, escritos de forma concreta
   (ex.: sugestão de nova headline).
4. Uma sugestão de headline reescrita.
Escreva em português, tom direto e humano. Não invente informações que não
estão no perfil.
```

## 3. Fluxo operacional

1. Lead entra (planilha/CRM com arquétipo, temperatura e link do LinkedIn).
2. Operação roda o prompt acima e cola o resultado no card do lead.
3. José revisa, personaliza e envia pelo WhatsApp usando o template de `06-whatsapp-e-pos-quiz.md`.
4. Registrar: data de envio, nota de autoridade, respondeu (s/n), call agendada (s/n).

> Nada sai para o lead sem a revisão do José — é o nome dele que está na promessa.
