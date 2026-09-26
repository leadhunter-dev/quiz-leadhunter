# Tabela de pontuação (gerada por motor.py — não editar à mão)

Pontos que cada resposta soma para cada arquétipo. ESP = Especialista Invisível · CAC = Caçador(a) Solitário(a) · MAE = Maestro/Maestra · GEN = General/Rainha sem Exército · REF = Refém da Indicação.

| Pergunta | Opção | ESP | CAC | MAE | GEN | REF | Autoridade | Flag |
|---|---|---|---|---|---|---|---|---|
| Q1 (cargo) | A |  | 2 |  | 1 |  |  |  |
| Q1 (cargo) | B |  |  | 2 | 1 |  |  |  |
| Q1 (cargo) | C |  |  | 3 |  |  |  |  |
| Q1 (cargo) | D | 2 |  |  |  | 1 |  |  |
| Q1 (cargo) | E |  | 2 |  |  |  |  |  |
| Q2 (b2b_b2c) | A |  |  |  |  |  |  |  |
| Q2 (b2b_b2c) | B |  |  |  |  |  |  |  |
| Q2 (b2b_b2c) | C |  |  |  |  |  |  | B2C |
| Q3 (ticket) | A |  |  |  |  |  |  | TICKET_BAIXO |
| Q3 (ticket) | B | 1 | 2 |  |  |  |  |  |
| Q3 (ticket) | C |  |  | 1 | 1 | 1 |  |  |
| Q3 (ticket) | D |  |  |  | 2 | 2 |  |  |
| Q4 (origem_clientes) | A |  |  |  |  | 3 |  |  |
| Q4 (origem_clientes) | B |  | 2 |  |  |  |  |  |
| Q4 (origem_clientes) | C |  |  | 2 |  |  |  |  |
| Q4 (origem_clientes) | D |  |  | 1 | 1 |  |  |  |
| Q4 (origem_clientes) | E |  |  |  | 1 | 1 |  |  |
| Q5 (quem_executa) | A |  | 3 |  |  |  |  |  |
| Q5 (quem_executa) | B |  |  |  | 3 | 1 |  |  |
| Q5 (quem_executa) | C |  |  | 3 |  |  |  | TEM_TIME |
| Q5 (quem_executa) | D |  |  |  | 1 | 2 |  |  |
| Q6 (horas_semana) | A |  |  |  | 2 | 2 |  |  |
| Q6 (horas_semana) | B | 1 | 1 |  |  |  |  |  |
| Q6 (horas_semana) | C |  | 2 |  |  |  |  |  |
| Q6 (horas_semana) | D |  |  | 3 |  |  |  | TEM_TIME |
| Q7 (clareza_perfil) | A |  |  | 1 | 1 |  | 3 |  |
| Q7 (clareza_perfil) | B |  | 1 |  |  | 1 | 2 |  |
| Q7 (clareza_perfil) | C | 3 |  |  |  |  | 1 |  |
| Q7 (clareza_perfil) | D | 3 |  |  |  |  | 0 |  |
| Q8 (presenca_linkedin) | A |  |  |  | 1 |  | 3 |  |
| Q8 (presenca_linkedin) | B |  | 1 |  |  |  | 2 |  |
| Q8 (presenca_linkedin) | C | 2 |  |  |  | 1 | 1 |  |
| Q8 (presenca_linkedin) | D | 2 |  |  |  |  | 0 |  |
| Q9 (gargalo) | A | 3 |  |  |  |  |  | QUER_AUTORIDADE |
| Q9 (gargalo) | B |  | 1 |  | 2 |  |  |  |
| Q9 (gargalo) | C |  |  |  |  | 3 |  |  |
| Q9 (gargalo) | D |  |  | 3 |  |  |  |  |
| Q9 (gargalo) | E |  |  |  |  | 1 |  | GARGALO_FECHAMENTO |
| Q10 (orcamento) | A | 1 | 2 |  |  |  |  | BUDGET_BAIXO |
| Q10 (orcamento) | B | 1 | 2 | 1 |  |  |  | BUDGET_BAIXO |
| Q10 (orcamento) | C |  |  | 1 | 1 | 1 |  |  |
| Q10 (orcamento) | D |  |  |  | 2 | 2 |  |  |

## Travas (aplicadas nesta ordem)

- 1. Q2=C (B2C) -> DESQ
- 2. Q3=A (ticket baixo) -> DESQ
- 3. autoridade <= 2 E Q9=A -> ESP (forçado)
- 4. BUDGET_BAIXO -> GEN e REF saem da disputa
- 5. TEM_TIME -> GEN sai da disputa
- 6. maior pontuação vence; empate: se autoridade <= 2, ESP; senão GEN > REF > MAE > CAC > ESP

## Selo de autoridade

Se autoridade <= 2 e o resultado não for ESP/DESQ, a página de resultado exibe o bloco 'Alerta de autoridade' e a análise do perfil foca nisso (upsell da Consultoria de Autoridade).

## Temperatura do lead

- **regra**: score = Q3.score + Q10.score + (decisor ? 1 : 0) + (Q9 != E ? 1 : 0)  -> 0 a 8
- **QUENTE**: >= 6 -> alerta imediato no WhatsApp do José
- **MORNO**: 3 a 5 -> análise do perfil em até 48h úteis
- **FRIO**: <= 2 (ou DESQ) -> análise do perfil + nutrição
