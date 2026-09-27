# Tabela de pontuação (gerada por motor.py — não editar à mão)

**Q0 — O que te trouxe até aqui?** A = Trilha Negócio · B = Trilha Carreira

Negócio: ESP Especialista Invisível · CAC Caçador(a) Solitário(a) · MAE Maestro/Maestra · GEN General/Rainha sem Exército · REF Refém da Indicação · EXP Explorador(a) de Outros Mares
Carreira: TAL Talento Escondido(a) · FAN Candidato(a) Fantasma · FOG Foguete na Rampa / Estrela em Ascensão · VIA Viajante de Rota Nova

## Trilha Negócio

| Pergunta | Opção | GEN | REF | MAE | CAC | ESP | autoridade | flag |
|---|---|---|---|---|---|---|---|---|
| Q1 (cargo) | A | 1 |  |  | 2 |  |  |  |
| Q1 (cargo) | B | 1 |  | 2 |  |  |  |  |
| Q1 (cargo) | C |  |  | 3 |  |  |  |  |
| Q1 (cargo) | D |  | 1 |  |  | 2 |  |  |
| Q1 (cargo) | E |  |  |  | 2 |  |  | CONVITE_CARREIRA |
| Q2 (b2b_b2c) | A |  |  |  |  |  |  |  |
| Q2 (b2b_b2c) | B |  |  |  |  |  |  |  |
| Q2 (b2b_b2c) | C |  |  |  |  | 2 |  | B2C |
| Q3 (ticket) | A |  |  |  |  |  |  | TICKET_BAIXO |
| Q3 (ticket) | B |  |  |  | 2 | 1 |  |  |
| Q3 (ticket) | C | 1 | 1 | 1 |  |  |  |  |
| Q3 (ticket) | D | 2 | 2 |  |  |  |  |  |
| Q4 (origem_clientes) | A |  | 3 |  |  |  |  |  |
| Q4 (origem_clientes) | B |  |  |  | 2 |  |  |  |
| Q4 (origem_clientes) | C |  |  | 2 |  |  |  |  |
| Q4 (origem_clientes) | D | 1 |  | 1 |  |  |  |  |
| Q4 (origem_clientes) | E | 1 | 1 |  |  |  |  |  |
| Q5 (quem_executa) | A |  |  |  | 3 |  |  |  |
| Q5 (quem_executa) | B | 3 | 1 |  |  |  |  |  |
| Q5 (quem_executa) | C |  |  | 3 |  |  |  | TEM_TIME |
| Q5 (quem_executa) | D | 1 | 2 |  |  |  |  |  |
| Q6 (quem_fecha) | A |  |  |  | 2 |  |  |  |
| Q6 (quem_fecha) | B | 2 | 1 |  |  |  |  | TIME_MINIMO |
| Q6 (quem_fecha) | C | 1 |  | 2 |  |  |  | TIME_MINIMO |
| Q6 (quem_fecha) | D |  |  |  | 1 | 1 |  |  |
| Q7 (clareza_perfil) | A | 1 |  | 1 |  |  | 3 |  |
| Q7 (clareza_perfil) | B |  | 1 |  | 1 |  | 2 |  |
| Q7 (clareza_perfil) | C |  |  |  |  | 3 | 1 |  |
| Q7 (clareza_perfil) | D |  |  |  |  | 3 | 0 |  |
| Q8 (presenca_linkedin) | A | 1 |  |  |  |  | 3 |  |
| Q8 (presenca_linkedin) | B |  |  |  | 1 |  | 2 |  |
| Q8 (presenca_linkedin) | C |  | 1 |  |  | 2 | 1 |  |
| Q8 (presenca_linkedin) | D |  |  |  |  | 2 | 0 |  |
| Q9 (gargalo) | A |  |  |  |  | 3 |  | QUER_AUTORIDADE |
| Q9 (gargalo) | B | 2 |  |  | 1 |  |  |  |
| Q9 (gargalo) | C |  | 3 |  |  |  |  |  |
| Q9 (gargalo) | D |  |  | 3 |  |  |  |  |
| Q9 (gargalo) | E |  | 1 |  |  |  |  | GARGALO_FECHAMENTO |
| Q10 (faturamento_mensal) | A |  |  |  | 2 | 1 |  | BUDGET_BAIXO |
| Q10 (faturamento_mensal) | B |  |  |  | 2 | 1 |  | BUDGET_BAIXO |
| Q10 (faturamento_mensal) | C |  |  |  | 2 | 1 |  | BUDGET_BAIXO |
| Q10 (faturamento_mensal) | D |  |  | 1 | 2 |  |  |  |
| Q10 (faturamento_mensal) | E | 1 | 1 | 1 |  |  |  |  |
| Q10 (faturamento_mensal) | F | 2 | 2 | 1 |  |  |  | FAT_100K |

### Travas (nesta ordem)

- 1. Q3=A (ticket até R$ 5 mil/ano) -> EXP (oferta de entrada)
- 2. Q2=C (B2C) E faturamento até R$ 10 mil/mês (Q10=A/B/C) -> EXP
- 3. Q2=C (B2C) com faturamento maior -> ESP (marca pessoal)
- 4. autoridade <= 2 E Q9=A -> ESP
- 5. Corte do Serviço Completo: só fica na disputa GEN/REF quem fatura R$ 100 mil+/mês (Q10=F) E tem time de vendas mínimo (Q6=B/C). Senão GEN e REF saem.
- 6. TEM_TIME (Q5=C, time já prospecta) -> GEN sai da disputa
- 7. maior pontuação vence; empate: se autoridade <= 2, ESP; senão GEN > REF > MAE > CAC > ESP

## Trilha Carreira

| Pergunta | Opção | TAL | FAN | VIA | FOG |
|---|---|---|---|---|---|
| C1 (momento) | A | 1 | 1 |  |  |
| C1 (momento) | B |  | 2 |  | 1 |
| C1 (momento) | C |  |  |  | 3 |
| C1 (momento) | D |  |  | 3 |  |
| C1 (momento) | E | 1 | 2 |  |  |
| C2 (bagagem) | A | 3 |  |  |  |
| C2 (bagagem) | B |  | 1 |  | 1 |
| C2 (bagagem) | C |  |  |  | 2 |
| C2 (bagagem) | D |  | 1 |  | 2 |
| C2 (bagagem) | E |  | 1 | 2 |  |
| C3 (curriculo) | A |  |  |  | 1 |
| C3 (curriculo) | B |  | 1 |  | 1 |
| C3 (curriculo) | C | 2 |  |  |  |
| C4 (linkedin) | A |  |  |  | 1 |
| C4 (linkedin) | B |  | 2 |  |  |
| C4 (linkedin) | C | 2 |  |  |  |
| C5 (trava) | A |  | 3 |  |  |
| C5 (trava) | B |  | 1 |  | 1 |
| C5 (trava) | C | 2 |  |  |  |
| C5 (trava) | D |  |  | 3 |  |
| C5 (trava) | E |  |  |  | 2 |

Desempate: maior pontuação vence; empate: TAL > FAN > VIA > FOG

## Regras extras

- Trilha Negócio: se autoridade <= 2 e o resultado for CAC, MAE, GEN ou REF, a página exibe o bloco 'Alerta de autoridade'.
- Trilha Negócio: se Q1=E (vendedor/SDR), a página de resultado mostra um botão secundário para fazer a Trilha Carreira.

## Temperatura do lead

- **regra**: Só Trilha Negócio. score = Q3.score + Q10.score + (decisor ? 1 : 0) + (Q9 != E ? 1 : 0) -> 0 a 8
- **QUENTE**: >= 6 -> resposta do José no mesmo dia útil
- **MORNO**: 3 a 5 -> análise do perfil em até 48h úteis
- **FRIO**: <= 2 ou EXP -> análise do perfil + nutrição
- **CARREIRA**: Trilha Carreira -> etiqueta própria no WhatsApp Business, atendimento por ordem de chegada
