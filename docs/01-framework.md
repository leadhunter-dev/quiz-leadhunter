# Framework — Quiz Funnel Leadhunter (v0.3)

**Objetivo:** transformar visitantes em conversas no WhatsApp do José já com o direcionamento certo. Ninguém é desqualificado: cada pessoa cai na oferta que faz sentido para o momento dela.

**Nome do quiz:** Que tipo de caçador(a) você é?

**Ofertas**
| Oferta | Para quem | Preço | Status |
|---|---|---|---|
| Serviço Completo | Fatura R$ 100 mil+/mês e tem time de vendas mínimo | R$ 3.800 a R$ 6.000/mês | Ativa |
| Plataforma Leadhunter | Negócio que prospecta sozinho ou com time próprio | R$ 500/mês | Ativa |
| Consultoria de Autoridade | Negócio cujo perfil não sustenta a venda | a definir | A criar |
| Ajuste de LinkedIn (entrada) | Negócio B2C ou de ticket baixo | a definir | A criar |
| Currículo + LinkedIn | Pessoas querendo crescer na carreira ou conseguir emprego | a validar | A validar no WhatsApp |

---

## 1. Jornada

```
Tráfego → Landing → Caçador ou Caçadora? → O que te trouxe até aqui?
   ├─ Negócio  → 10 perguntas → Captura (LinkedIn opcional)    → Resultado → WhatsApp → análise do perfil (48h úteis) → call → proposta
   └─ Carreira →  5 perguntas → Captura (LinkedIn opcional)    → Resultado → WhatsApp → lead manda currículo → 2 ajustes → oferta
```

## 2. Trilha Negócio

**Eixos**
| Eixo | Perguntas | O que mede |
|---|---|---|
| Execução | Q1, Q4, Q5 | Quem prospecta hoje |
| Estrutura comercial | Q6 | Quem atende as reuniões e fecha (time de vendas mínimo?) |
| Investimento | Q3, Q10 | Ticket do cliente e faturamento mensal |
| Autoridade | Q7, Q8 | Se o LinkedIn sustenta a abordagem (nota 0 a 6) |
| Contexto | Q2, Q9 | B2B ou B2C e qual é o gargalo real |

**Arquétipos**
| Código | Masculino | Feminino | Oferta |
|---|---|---|---|
| ESP | 🕶️ O Especialista Invisível | 🕶️ A Especialista Invisível | Consultoria de Autoridade |
| CAC | 🏹 O Caçador Solitário | 🏹 A Caçadora Solitária | Plataforma Leadhunter |
| MAE | 🎼 O Maestro | 🎼 A Maestra | Plataforma para times |
| GEN | ⚔️ O General sem Exército | 👑 A Rainha sem Exército | Serviço Completo |
| REF | 🎲 O Refém da Indicação | 🎲 A Refém da Indicação | Serviço Completo + Autoridade |
| EXP | 🧭 O Explorador de Outros Mares | 🧭 A Exploradora de Outros Mares | Ajuste de LinkedIn (entrada) |

**Travas (nesta ordem, passam por cima dos pontos)**
1. Ticket até R$ 5 mil/ano (Q3 = A) → Explorador(a)
2. B2C (Q2 = C) faturando até R$ 10 mil/mês → Explorador(a)
3. B2C faturando mais → Especialista Invisível (marca pessoal)
4. Autoridade ≤ 2 **e** gargalo "ser visto como referência" → Especialista Invisível
5. **Corte do Serviço Completo:** General/Rainha e Refém só entram na disputa se o negócio fatura **R$ 100 mil+/mês (Q10 = F)** e tem **time de vendas mínimo (Q6 = B ou C)**. Abaixo disso o time comercial costuma ser imaturo e a operação fica arriscada e cara → Plataforma.
6. O time já prospecta (Q5 = C) → General/Rainha sai da disputa
7. Maior pontuação vence (desempate: autoridade ≤ 2 favorece Especialista; senão General > Refém > Maestro > Caçador)

**Exceção (decisão do José na conversa, fora do quiz):** produto MUITO vendável no LinkedIn e demanda muito forte → pode oferecer o Serviço Completo mesmo abaixo do corte.

**Blocos condicionais:** Alerta de autoridade (autoridade ≤ 2 em CAC/MAE/GEN/REF) · Convite para a Trilha Carreira (Q1 = vendedor/SDR).

## 3. Trilha Carreira

5 perguntas: momento · bagagem · currículo · LinkedIn · trava.

| Código | Masculino | Feminino | Quem é |
|---|---|---|---|
| TAL | 💎 O Talento Escondido | 💎 A Talento Escondida | Vendeu muito (loja, rua, varejo), mas nada aparece no papel |
| FAN | 👻 O Candidato Fantasma | 👻 A Candidata Fantasma | Se candidata e ninguém chama |
| FOG | 🚀 O Foguete na Rampa | ⭐ A Estrela em Ascensão | Tem bagagem, quer o próximo degrau |
| VIA | 🧳 O Viajante de Rota Nova | 🧳 A Viajante de Rota Nova | Quer migrar de área, principalmente para vendas |

Todos → **Currículo + LinkedIn** + link para a página de conteúdo sobre carreira. Desempate: Talento > Fantasma > Viajante > Foguete.

## 4. O que o quiz registra de cada lead

nome · WhatsApp · e-mail · link do LinkedIn · gênero escolhido · trilha · todas as respostas · arquétipo · pontos por arquétipo · (Negócio) nota de autoridade, alerta, temperatura · data · origem (UTM).

Fonte da verdade da lógica: `logica/quiz-config.json`. Implementação de referência e testes: `logica/motor.py`.

## 5. WhatsApp: validar sem se afogar

Tudo cai no WhatsApp do José, sem link de pagamento. Para aguentar o volume do conteúdo em escala: WhatsApp Business com etiquetas por trilha, triagem pela primeira frase da mensagem, respostas rápidas e prioridade Negócio quente → Negócio → Carreira. Detalhes em `copy/06-whatsapp-e-pos-quiz.md`, seção 0.

## 6. Métricas

| Métrica | Meta inicial |
|---|---|
| Landing → início do quiz | > 50% |
| Início → conclusão | > 60% (Carreira deve ficar acima de Negócio) |
| Conclusão → captura | > 70% |
| Resultado → clique no WhatsApp | > 30% |
| Negócio: análise enviada → call agendada | acompanhar por arquétipo |
| Carreira: conversa → compra | é a métrica que valida preço e demanda |
| Divisão entre trilhas | acompanhar por canal de conteúdo |

> Metas iniciais servem de referência para começar a medir; não são benchmarks da Leadhunter.

## 7. Canais de tráfego

- Conteúdo em escala sobre carreira em vendas → Trilha Carreira
- Carrossel founder-led no Meta Ads e posts do José no LinkedIn → Trilha Negócio
- Follow-up nas campanhas outbound da Leadhunter, QR code em eventos
- Compartilhamento orgânico dos cards de resultado (versões masculina e feminina)

## 8. Pendências

- [ ] Preço e escopo de **Currículo + LinkedIn** (validar nas primeiras conversas)
- [ ] Link da página de conteúdo sobre carreira
- [ ] Preço e escopo da Consultoria de Autoridade e do Ajuste de LinkedIn
- [ ] Calibrar faixas de ticket (Q3)
- [x] Q10 virou faturamento mensal; corte do Serviço Completo definido (R$ 100 mil+/mês + time mínimo)
- [ ] Confirmar o número de WhatsApp
- [ ] Onde registrar os leads (Notion, planilha ou CRM)
- [ ] Revisar a frase "centenas de reuniões toda semana" (bloco "Por trás deste diagnóstico", `copy/04`) contra os números reais da operação antes de rodar anúncio
- [ ] Preencher no `app/app.js`: `URL_PUBLICA`, `META_PIXEL_ID`, `GA4_ID`, `INSTAGRAM`, `JOSE_FOTO_URL`, `WEBHOOK_URL`
- [ ] Trocar `og:image` por URL absoluta ao publicar (`app/index.html`)
- [ ] Nome do arquétipo Explorador(a) de Outros Mares (avaliar renomear — ver `docs/03-campanhas-e-conteudo.md`)
- [ ] 20 ilustrações dos arquétipos (hoje a carta usa o emoji dentro de um círculo)
