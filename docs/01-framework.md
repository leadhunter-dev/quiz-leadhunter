# Framework — Quiz Funnel Leadhunter

**Objetivo:** transformar visitantes em conversas no WhatsApp do José já com o direcionamento certo entre três ofertas: **Plataforma Leadhunter (software)**, **Serviço Completo** e **Consultoria de Autoridade** (LinkedIn).

**Nome do quiz:** Que tipo de caçador(a) B2B você é?

---

## 1. Jornada

```
Tráfego → Landing → Caçador ou Caçadora? → 10 perguntas → Captura (nome, WhatsApp, e-mail, LinkedIn)
→ Carregamento → Resultado (arquétipo) → CTA WhatsApp com mensagem pré-preenchida
→ José responde com a análise do LinkedIn (até 48h úteis) → Call de 20 min → Proposta
```

## 2. Os três eixos que decidem a oferta

| Eixo | Perguntas | O que mede |
|---|---|---|
| **Execução** | Q1, Q4, Q5, Q6 | Quem prospecta hoje e quanto tempo existe para isso |
| **Investimento** | Q3, Q10 | Ticket do cliente e orçamento mensal |
| **Autoridade** | Q7, Q8 | Se o LinkedIn sustenta a abordagem (nota 0 a 6) |
| **Qualificação** | Q2, Q9 | B2B ou B2C e qual é o gargalo real |

## 3. Arquétipos → ofertas

| Código | Masculino | Feminino | Oferta | Perfil típico |
|---|---|---|---|---|
| ESP | 🕶️ O Especialista Invisível | 🕶️ A Especialista Invisível | Consultoria de Autoridade | Bom no que faz, perfil fraco, quer ser referência |
| CAC | 🏹 O Caçador Solitário | 🏹 A Caçadora Solitária | Plataforma Leadhunter | Founder que prospecta sozinho, orçamento enxuto |
| MAE | 🎼 O Maestro | 🎼 A Maestra | Plataforma para times | Já tem SDRs/vendedores, precisa de método |
| GEN | ⚔️ O General sem Exército | 👑 A Rainha sem Exército | Serviço Completo | Ticket e orçamento altos, sem tempo nem time |
| REF | 🎲 O Refém da Indicação | 🎲 A Refém da Indicação | Serviço Completo + Autoridade | Vive de indicação, quer previsibilidade |
| DESQ | 🧭 O Explorador de Outros Mares | 🧭 A Exploradora de Outros Mares | Conteúdo/nutrição | B2C ou ticket muito baixo |

## 4. Motor de resultado

Sistema híbrido: **pontos** (estilo BuzzFeed, cada resposta soma para 1 a 3 arquétipos) + **travas** (regras comerciais que passam por cima dos pontos).

Travas, nesta ordem:
1. Vende só para CPF (Q2 = C) → Explorador(a)
2. Ticket até R$ 5 mil/ano (Q3 = A) → Explorador(a)
3. Autoridade ≤ 2 **e** gargalo "ser visto como referência" (Q9 = A) → Especialista Invisível
4. Orçamento até R$ 3 mil/mês (Q10 = A ou B) → General/Rainha e Refém saem da disputa
5. Tem time dedicado (Q5 = C ou Q6 = D) → General/Rainha sai da disputa
6. Maior pontuação vence. Empate: se autoridade ≤ 2, Especialista; senão General > Refém > Maestro > Caçador > Especialista

**Alerta de autoridade:** qualquer resultado (exceto ESP/DESQ) com autoridade ≤ 2 mostra um bloco extra e a análise do José começa por aí → upsell da Consultoria de Autoridade.

**Temperatura do lead:** score 0–8 (ticket + orçamento + decisor + gargalo de geração de demanda). Quente ≥ 6 dispara alerta imediato.

Fonte da verdade: `logica/quiz-config.json`. Implementação de referência e testes: `logica/motor.py`.

## 5. O que o quiz gera para a Leadhunter

Para cada lead, o sistema deve registrar (planilha, Notion ou CRM):
nome · WhatsApp · e-mail · link do LinkedIn · gênero escolhido · todas as respostas · arquétipo · pontos por arquétipo · nota de autoridade (0–6) · alerta de autoridade (s/n) · temperatura · data · origem (UTM).

## 6. Métricas

| Métrica | Meta inicial |
|---|---|
| Landing → início do quiz | > 50% |
| Início → conclusão | > 60% |
| Conclusão → captura | > 70% |
| Resultado → clique no WhatsApp | > 30% |
| Análise enviada → call agendada | acompanhar por arquétipo |
| Distribuição de arquétipos | acompanhar: se um arquétipo passar de 40%, rever pesos |

> Metas iniciais são referência para começar a medir, não benchmarks da Leadhunter. Ajustar após as primeiras 100 respostas.

## 7. Canais de tráfego

- Carrossel founder-led no Meta Ads (direto para o quiz)
- Posts e comentários do José no LinkedIn ("descubra seu arquétipo")
- Etapa de follow-up nas próprias campanhas outbound da Leadhunter
- QR code em eventos e palestras
- Compartilhamento orgânico dos cards de resultado (versões masculina e feminina)

## 8. Pendências para decidir

- [ ] Calibrar faixas de ticket (Q3) e orçamento (Q10) com a tabela de preços real
- [ ] Definir escopo e preço da Consultoria de Autoridade (produto novo)
- [ ] Confirmar o número de WhatsApp que recebe os leads
- [ ] Escolher onde os leads ficam registrados (Notion, planilha ou CRM)
- [ ] Definir capacidade de análises por semana (a promessa de 48h úteis precisa caber)
