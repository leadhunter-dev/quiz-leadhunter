# Quiz Leadhunter — versão completa (v0.3)

> Arquivo gerado a partir da pasta copy/. Para editar, altere os arquivos originais.

---

## Telas de entrada, transição e captura

> Notação de gênero: `[m|f]` → o site mostra a forma masculina ou feminina conforme a escolha da Tela 2. Ex.: `[pronto|pronta]`.

---

### Tela 1 — Landing (neutra)

**Selo:** Quiz Leadhunter · 2 minutos

**Headline:** Que tipo de caçador(a) você é?

**Subheadline:** Perguntas rápidas para descobrir seu arquétipo — e o que está travando seus próximos clientes ou a sua próxima vaga.

**Bônus (destaque):** 🎁 Bônus: uma análise completa e pessoal do seu LinkedIn, feita pelo José Henrique, especialista em LinkedIn e fundador da Leadhunter.

> Nota: o título ficou sem "B2B" porque agora o quiz também atende quem quer crescer na carreira. Nos anúncios dá para usar variações por público: "Que tipo de caçador(a) B2B você é?" (negócio) e "Que tipo de caçador(a) de oportunidades você é?" (carreira).

**Botão:** Descobrir meu arquétipo →

**Rodapé:** Sem enrolação. Sem resposta certa. Só seja [sincero|sincera]. 😉

---

### Tela 2 — Escolha do avatar (define o gênero do quiz)

**Pergunta:** Antes de tudo: quem vai para a caçada?

- 🏹 **Caçador**
- 🏹 **Caçadora**

*(Não aparece como pergunta de pontuação. Só define a linguagem e o visual.)*

---

### Tela 3 — Bifurcação (define a trilha)

**Pergunta:** O que te trouxe até aqui?

- 🏢 **Quero mais clientes para a minha empresa ou negócio** → Trilha Negócio (10 perguntas)
- 🚀 **Quero crescer na carreira ou conseguir um emprego melhor** → Trilha Carreira (5 perguntas)

*(Não pontua. Só escolhe a trilha.)*

---

### Reações entre perguntas (microcopy opcional, 1 segundo na tela)

Usar no máximo 3 durante o quiz para manter o ritmo:

- Depois da Q4 = A (indicação): *"Indicação é ótimo… até o mês em que ela não vem."*
- Depois da Q5 = B (sem tempo): *"Clássico. Quem mais vende é quem menos tem tempo pra prospectar."*
- Depois da Q7 = C ou D (perfil fraco): *"Anotado. Vamos falar sobre isso no final. 👀"*
- Trilha Carreira, depois da C2 = A (vendeu em loja/rua): *"Quem vende no balcão vende em qualquer lugar. Guarda essa."*
- Na metade (depois da Q5): *"Metade do caminho. Seu arquétipo já está tomando forma…"*

---

### Tela de captura — Trilha Negócio (antes do resultado)

**Headline:** Seu arquétipo está pronto 🎯

**Sub:** Onde a gente te manda o resultado completo e a análise do seu LinkedIn?

**Campos:**
1. Seu nome
2. WhatsApp (com DDD)
3. E-mail profissional
4. Link do seu perfil no LinkedIn — **opcional** — *microcopy:* "Opcional, mas é ele que libera o seu bônus: o José Henrique, especialista em LinkedIn e fundador da Leadhunter, abre o seu perfil e te manda uma análise completa e pessoal. Sem link, sem análise."

**Checkbox (LGPD):** Aceito receber meu resultado e contato da Leadhunter por WhatsApp e e-mail.

**Botão:** Ver meu resultado →

**Microcopy abaixo do botão:** A análise do seu perfil chega no seu WhatsApp em até 48h úteis.

---

### Tela de captura — Trilha Carreira (antes do resultado)

**Headline:** Seu arquétipo está pronto 🎯

**Sub:** Onde a gente te manda o resultado e as dicas para o seu currículo e LinkedIn?

**Campos:**
1. Seu nome
2. WhatsApp (com DDD)
3. E-mail
4. Link do seu LinkedIn — **opcional** — *microcopy:* "Não tem LinkedIn? Sem problema, a gente começa do zero."

**Checkbox (LGPD):** Aceito receber meu resultado e contato da Leadhunter por WhatsApp e e-mail.

**Botão:** Ver meu resultado →

**Microcopy abaixo do botão:** No resultado você chama o José no WhatsApp e pode mandar seu currículo por lá mesmo.

---

### Tela de carregamento (2 a 3 segundos, frases alternando)

- Analisando suas respostas…
- Comparando com os perfis de prospecção que a Leadhunter já operou…
- Revelando seu arquétipo…

> Não usar números que não existem ("+10 mil perfis" etc.). Se quiser um número real aqui, validar com a base de clientes antes.

---

## Trilha Negócio — as 10 perguntas

> As letras (A, B, C…) batem com `logica/quiz-config.json`. Pontuação completa em `logica/pontuacao.md`.
> Notação `[m|f]` = forma masculina ou feminina.
> Eixos: **Execução** (quem prospecta) · **Estrutura comercial** (quem fecha) · **Investimento** (ticket e faturamento) · **Autoridade** (perfil) · **Qualificação** (B2B, gargalo).

---

### Q1 — Qual cadeira você ocupa? *(eixo: execução / decisor)*
- **A)** Sou [sócio ou fundador|sócia ou fundadora] e faço de tudo um pouco
- **B)** Sou [sócio ou diretor|sócia ou diretora] e já tenho time comercial
- **C)** Lidero o time comercial (gerente, head, coordenador[a])
- **D)** Sou [consultor|consultora] ou especialista e vendo o meu próprio serviço
- **E)** Sou [vendedor|vendedora] ou SDR *(o resultado ganha um convite para a Trilha Carreira)*

### Q2 — Quem assina o seu contrato? *(qualificação)*
- **A)** Um CNPJ, sempre
- **B)** Às vezes CNPJ, às vezes CPF
- **C)** Só CPF — vendo para pessoa física *(não desqualifica: com orçamento maior → Especialista Invisível; com orçamento baixo → Explorador[a])*

### Q3 — Quanto vale um cliente novo para você no primeiro ano? *(investimento)*
- **A)** Até R$ 5 mil *(→ Explorador[a], oferta de entrada)*
- **B)** De R$ 5 mil a R$ 30 mil
- **C)** De R$ 30 mil a R$ 100 mil
- **D)** Mais de R$ 100 mil

### Q4 — De onde vieram seus últimos 5 clientes? *(execução)*
- **A)** Quase todos de indicação
- **B)** Do meu esforço pessoal, indo atrás
- **C)** Do meu time comercial prospectando
- **D)** De marketing: anúncios, conteúdo, site
- **E)** Sinceramente? Não sei dizer

### Q5 — Se amanhã fosse preciso abordar 30 empresas novas por dia, quem faria isso? *(execução)*
- **A)** Eu [mesmo|mesma], e com prazer
- **B)** Eu… mas de onde vou tirar tempo?
- **C)** Meu time
- **D)** Ninguém. Aqui a gente não prospecta

### Q6 — Quem atende as reuniões e fecha as vendas hoje? *(eixo: estrutura comercial)*
- **A)** Só eu
- **B)** Eu e mais 1 ou 2 pessoas
- **C)** Um time comercial, com alguém liderando
- **D)** Ainda não tenho um processo de vendas definido

### Q7 — Um decisor abre seu LinkedIn agora. Em 5 segundos ele entende o que você resolve e para quem? *(autoridade)*
- **A)** Na hora. Meu perfil é uma vitrine
- **B)** Mais ou menos. Se ler com calma, entende
- **C)** Não. Parece um currículo
- **D)** Meu LinkedIn está abandonado 🕸️

### Q8 — E a sua presença por lá? *(autoridade)*
- **A)** Publico toda semana e as pessoas interagem
- **B)** Publico de vez em quando
- **C)** Só leio, não publico
- **D)** Entro quando alguém me marca

### Q9 — Se você pudesse resolver uma coisa amanhã, seria… *(gargalo)*
- **A)** Ser [visto|vista] como referência no meu mercado
- **B)** Ter mais reuniões com gente qualificada
- **C)** Ter previsibilidade e parar de depender da sorte
- **D)** Fazer meu time produzir mais
- **E)** Fechar as reuniões que eu já tenho

### Q10 — Quanto o seu negócio fatura por mês hoje? *(investimento)*
- **A)** Ainda não faturo, estou validando um produto
- **B)** Até R$ 3 mil
- **C)** De R$ 3 mil a R$ 10 mil
- **D)** De R$ 10 mil a R$ 50 mil
- **E)** De R$ 50 mil a R$ 100 mil
- **F)** Mais de R$ 100 mil

---

> **Corte do Serviço Completo (R$ 3.800 a R$ 6.000/mês):** o resultado General/Rainha ou Refém só aparece para quem fatura **mais de R$ 100 mil/mês (Q10 = F)** e tem **time de vendas mínimo (Q6 = B ou C)**. Abaixo disso o time comercial costuma ser imaturo e a operação fica arriscada e cara; o caminho é a Plataforma (R$ 500/mês).
> **Exceção (fora do quiz):** produto MUITO vendável no LinkedIn e demanda muito forte → o José pode oferecer o Serviço Completo na conversa.
> ⚠️ **A VALIDAR:** as faixas de ticket da Q3.

---

## Páginas de resultado — Trilha Negócio

> Notação `[m|f]` = forma masculina ou feminina. O diagnóstico é idêntico nas duas versões; só mudam linguagem, nome e visual.
> Estrutura fixa de cada página:
> 1. Nome + emoji + frase de efeito (é o que vai no card de compartilhamento)
> 2. Quem é você
> 3. Seu superpoder
> 4. Seu ponto cego
> 5. Se nada mudar…
> 6. O caminho que a gente recomenda (a oferta)
> 7. Bônus: análise do LinkedIn
> 8. CTA WhatsApp (texto do botão + mensagem pré-preenchida → ver `06-whatsapp-e-pos-quiz.md`)
> 9. Texto de compartilhamento
>
> **Bloco condicional "Alerta de autoridade"** — aparece em CAC, MAE, GEN e REF quando a nota de autoridade (Q7 + Q8) for ≤ 2. Texto no fim do arquivo.

---

### 🕶️ O Especialista Invisível / A Especialista Invisível

**Frase de efeito:** "O melhor do mercado que o mercado ainda não conhece."

**Quem é você**
Você é [bom|boa] no que faz. Seus clientes sabem disso, quem trabalhou com você sabe disso. O problema é que o resto do mercado não sabe. Seu LinkedIn conta a sua história como um currículo, não como a vitrine de alguém que resolve um problema caro.

**Seu superpoder**
Entrega. Quando alguém chega até você, a chance de virar cliente — e de ficar — é alta.

**Seu ponto cego**
Achar que competência se divulga sozinha. Não se divulga. Antes de comprar, o decisor B2B abre o seu perfil. Se ele não entende em 5 segundos o que você resolve, ele segue rolando.

**Se nada mudar…**
Você continua perdendo espaço para concorrentes menos preparados, mas mais visíveis. E qualquer prospecção que você fizer vai render menos, porque o perfil não sustenta a abordagem.

**O caminho que a gente recomenda: Consultoria de Autoridade**
Antes de sair prospectando, a gente reposiciona o seu LinkedIn para falar com quem compra de você: headline, capa, sobre, destaques e uma linha de conteúdo que prova o que você sabe. Autoridade primeiro, volume depois.

**Bônus**
O José Henrique vai abrir o seu perfil e te mandar, no WhatsApp, o que ele mudaria primeiro. Sem custo.

**Botão:** Quero que o José analise meu perfil →

**Compartilhamento:** "Deu Especialista Invisível 🕶️ — [bom|boa] demais pra continuar [escondido|escondida]. E você, que tipo de caçador(a) B2B é?"

---

### 🏹 O Caçador Solitário / A Caçadora Solitária

**Frase de efeito:** "Vai pra cima [sozinho|sozinha] — e ainda assim traz resultado."

**Quem é você**
Você não espera cliente cair do céu. Você vai atrás, manda mensagem, puxa conversa, faz follow-up. Boa parte dos seus clientes existe porque você foi buscar.

**Seu superpoder**
Iniciativa. Você tem a parte mais difícil da prospecção: disposição para começar.

**Seu ponto cego**
Tudo depende de você. Quando a agenda aperta com entregas, a prospecção para — e dois meses depois o pipeline sente.

**Se nada mudar…**
Você vira o gargalo da própria empresa. O volume de novos clientes fica preso ao número de horas que você consegue tirar da semana.

**O caminho que a gente recomenda: Plataforma Leadhunter**
A mesma metodologia que a Leadhunter usa nas operações dos clientes, numa ferramenta que você [mesmo|mesma] opera: listas no perfil certo, mensagens personalizadas com IA e cadência organizada. Você continua no comando, mas deixa de fazer tudo na mão.

**Bônus**
O José Henrique vai analisar seu LinkedIn e te dizer se o seu perfil está pronto para aguentar mais volume de abordagem.

**Botão:** Quero ver a plataforma funcionando →

**Compartilhamento:** "Deu [Caçador Solitário|Caçadora Solitária] 🏹 — prospecto [sozinho|sozinha] e ainda trago resultado. E você?"

---

### 🎼 O Maestro / A Maestra

**Frase de efeito:** "Tem a orquestra. Falta a partitura."

**Quem é você**
Você já tem gente vendendo — SDRs, vendedores, um time comercial. Seu desafio não é começar a prospectar, é fazer o time prospectar melhor, com método e sem depender do talento individual de cada um.

**Seu superpoder**
Estrutura. Você já passou da fase do "eu faço tudo" e tem braços para escalar.

**Seu ponto cego**
Cada vendedor prospecta do seu jeito: listas diferentes, mensagens diferentes, resultados diferentes. Sem padrão, você não sabe o que funciona — e não consegue replicar.

**Se nada mudar…**
O custo do time sobe, o volume de reuniões não acompanha e a meta vira loteria de quem teve o melhor mês.

**O caminho que a gente recomenda: Plataforma Leadhunter para times**
Uma operação padronizada para todo o time: mesmas listas qualificadas, mensagens personalizadas por perfil de cliente e visão clara do que está gerando reunião. Seu time com a partitura na mão.

**Bônus**
O José Henrique vai analisar o seu LinkedIn — e, se você quiser, conversar sobre como os perfis do seu time estão se apresentando para o mercado.

**Botão:** Quero dar método pro meu time →

**Compartilhamento:** "Deu [Maestro|Maestra] 🎼 — tenho a orquestra, agora quero a partitura. E você?"

---

### ⚔️ O General sem Exército / 👑 A Rainha sem Exército

**Frase de efeito:** "Sabe exatamente onde atacar. Só falta quem vá ao campo."

**Quem é você**
Você tem autoridade, tem um produto que vale caro e sabe quem é o cliente ideal. O que falta é tempo — e gente — para ir buscar esses clientes todos os dias. Sua agenda é de estratégia, negociação e fechamento, não de mandar 30 convites por dia.

**Seu superpoder**
Visão e poder de fechamento. Coloque você numa reunião com o decisor certo e a chance de negócio é alta.

**Seu ponto cego**
Achar que vai "arrumar um tempinho" para prospectar. Não vai. E contratar e treinar um time de pré-vendas do zero leva meses e custa caro.

**Se nada mudar…**
Você continua fechando bem as poucas reuniões que aparecem, mas o crescimento fica limitado ao que chega sozinho.

**O caminho que a gente recomenda: Serviço Completo Leadhunter**
A Leadhunter vira o seu exército. A gente mergulha no seu negócio, monta as listas, cria as abordagens, opera LinkedIn e e-mail todos os dias e entrega reuniões qualificadas na sua agenda. Você entra em campo só para o que faz de melhor: negociar e fechar.

**Bônus**
O José Henrique vai analisar o seu LinkedIn — que é o perfil que vai abrir as portas — e te mandar os ajustes antes de qualquer campanha.

**Botão:** Quero o meu exército →

**Compartilhamento:** "Deu [General sem Exército ⚔️|Rainha sem Exército 👑] — sei onde atacar, só falta quem vá ao campo. E você?"

---

### 🎲 O Refém da Indicação / A Refém da Indicação

**Frase de efeito:** "Quando a indicação vem, é festa. Quando não vem…"

**Quem é você**
Seu negócio foi construído no boca a boca, e isso diz muito sobre a qualidade do que você entrega. O problema é que a indicação não tem agenda: tem mês que chove, tem mês que seca, e você não controla nenhum dos dois.

**Seu superpoder**
Reputação. Quem compra de você indica você. Isso é prova social pronta para ser usada.

**Seu ponto cego**
Confundir "tenho clientes" com "tenho um processo para ter clientes". Sem prospecção ativa, o crescimento depende da boa vontade dos outros.

**Se nada mudar…**
O faturamento continua em montanha-russa, e fica difícil planejar contratação, investimento ou qualquer coisa além do próximo trimestre.

**O caminho que a gente recomenda: Serviço Completo + Autoridade**
Duas frentes juntas: a gente ajusta o seu LinkedIn para que a sua reputação fique visível para quem ainda não te conhece e, ao mesmo tempo, opera a prospecção todos os dias para gerar reuniões com o seu cliente ideal. A indicação continua vindo — mas deixa de ser o único caminho.

**Bônus**
O José Henrique vai analisar o seu LinkedIn e te mostrar como transformar a sua reputação em prova social no perfil.

**Botão:** Quero parar de depender da sorte →

**Compartilhamento:** "Deu Refém da Indicação 🎲 — hora de parar de depender da sorte. E você?"

---

### 🧭 O Explorador de Outros Mares / A Exploradora de Outros Mares *(oferta de entrada)*

> Aparece para quem tem ticket até R$ 5 mil/ano (Q3 = A) ou vende para pessoa física com orçamento de até R$ 3 mil/mês (Q2 = C e Q10 = A ou B). Ninguém é desqualificado: esse é o primeiro degrau.

**Frase de efeito:** "Seu tesouro está num mapa diferente — e a vitrine vem primeiro."

**Quem é você**
Você tem vontade de crescer e não tem medo de ir atrás. O seu jogo é diferente do outbound B2B tradicional: [você vende para pessoa física|o seu ticket pede volume], e nesse jogo quem ganha é quem é lembrado. Antes de pensar em máquina de prospecção, o primeiro passo é ter uma vitrine que trabalhe por você.

**Seu superpoder**
Agilidade. Negócios como o seu testam, ajustam e aprendem rápido.

**Seu ponto cego**
Achar que o LinkedIn "não é para o seu tipo de negócio". É onde estão parceiros, fornecedores, indicadores e clientes com poder de compra — e quase ninguém do seu mercado usa bem.

**Se nada mudar…**
Você continua dependendo só dos canais de sempre, disputando atenção com todo mundo pelo preço.

**O caminho que a gente recomenda: Ajuste de LinkedIn**
Uma repaginada objetiva no seu perfil — headline, capa, sobre e destaques — para você passar a ser [encontrado e lembrado|encontrada e lembrada]. Rápido e com um investimento que cabe no seu momento.

**Bônus**
O José Henrique vai abrir o seu perfil e te mandar no WhatsApp o que ele mudaria primeiro.

**Botão:** Quero repaginar meu LinkedIn →

**Compartilhamento:** "Deu [Explorador|Exploradora] de Outros Mares 🧭. E você, que tipo de caçador(a) é?"

> Nota: "Quem é você" tem duas variações — "você vende para pessoa física" (Q2 = C) ou "o seu ticket pede volume" (Q3 = A).

---

### Bloco condicional — ⚠️ Alerta de autoridade

> Aparece em CAC, MAE, GEN e REF quando autoridade (Q7 + Q8) ≤ 2. Entra logo antes do Bônus.

**Título:** Um alerta antes de você acelerar

**Texto:** Pelas suas respostas, o seu LinkedIn ainda não sustenta a sua abordagem. Na prática, isso significa que cada convite e cada mensagem vai converter menos, porque o decisor abre o seu perfil e não encontra motivo para responder. Antes de colocar volume, vale ajustar a vitrine. A análise que o José vai te mandar começa exatamente por aqui.

---

### Bloco condicional — 🚀 Convite para a Trilha Carreira

> Aparece quando Q1 = E (vendedor/SDR). Entra depois do CTA principal, como botão secundário.

**Título:** E a sua carreira?

**Texto:** Você respondeu como quem está na linha de frente. Quer descobrir também o seu arquétipo de carreira? São 5 perguntas.

**Botão secundário:** Fazer a Trilha Carreira →

---

## Trilha Carreira — as 5 perguntas

> Para quem escolheu "Quero crescer na carreira ou conseguir um emprego melhor". Curta de propósito: o resultado sai em menos de 1 minuto.
> Letras batem com `logica/quiz-config.json`. Notação `[m|f]` = forma masculina ou feminina.

---

### C1 — Qual é o seu momento?
- **A)** Estou buscando meu primeiro emprego
- **B)** Tenho emprego, mas quero trocar por um melhor
- **C)** Quero crescer onde estou (promoção, aumento, reconhecimento)
- **D)** Quero mudar de área — de preferência para vendas
- **E)** Estou sem emprego no momento

### C2 — Qual é a sua bagagem?
- **A)** Já vendi muito: loja, rua, varejo, porta a porta
- **B)** De 1 a 3 anos trabalhando em empresa
- **C)** Mais de 3 anos de experiência na minha área
- **D)** Já liderei pessoas ou equipes
- **E)** Estou começando agora

### C3 — E o seu currículo hoje?
- **A)** Atualizado e bem feito
- **B)** Existe, mas está desatualizado
- **C)** Nem tenho currículo pronto

### C4 — E o seu LinkedIn?
- **A)** Tenho e está bem montado
- **B)** Tenho, mas está parado
- **C)** Não tenho LinkedIn

### C5 — O que mais te trava hoje?
- **A)** Mando currículo e ninguém me chama
- **B)** Me chamam para entrevista, mas não passo
- **C)** Não sei me vender, nem no papel nem na conversa
- **D)** Não sei qual caminho seguir
- **E)** Faço um bom trabalho, mas ninguém percebe

---

## Páginas de resultado — Trilha Carreira

> Notação `[m|f]` = forma masculina ou feminina.
> Todos os resultados levam à mesma oferta: **Currículo + LinkedIn**, com preço acessível — **[PREÇO E ESCOPO A DEFINIR]**.
> Todos os resultados linkam a página de conteúdo sobre carreira do José: **[LINK DA PÁGINA DE CARREIRA]**.
> Estrutura: nome + frase de efeito · quem é você · seu superpoder · seu ponto cego · se nada mudar · o caminho · conteúdo · CTA WhatsApp · compartilhamento.
> Tom: próximo, encorajador e sem julgamento — muita gente aqui está num momento difícil.

---

### 💎 O Talento Escondido / A Talento Escondida

**Frase de efeito:** "Vende como poucos. Só falta o mundo ficar sabendo."

**Quem é você**
Você já provou na prática que sabe vender: no balcão, na rua, no porta a porta, no atendimento. Sabe ler cliente, contornar objeção e fechar. O problema é que nada disso aparece no papel — e quem contrata olha primeiro para o currículo e para o LinkedIn.

**Seu superpoder**
Experiência real de venda. Tem muito profissional com currículo bonito que nunca ouviu um "não" de cliente. Você já ouviu vários — e fechou mesmo assim.

**Seu ponto cego**
Achar que a sua experiência "não conta" porque não foi em escritório. Conta, e muito. Só precisa ser traduzida para a linguagem de quem contrata.

**Se nada mudar…**
Você continua sendo [avaliado|avaliada] pelo que o papel mostra, e não pelo que você sabe fazer.

**O caminho: Currículo + LinkedIn**
A gente pega a sua história de vendas e transforma em currículo e perfil que recrutador entende: resultados, números, habilidades. Se você ainda não tem LinkedIn, a gente monta do zero.

**Conteúdo para você:** Por que quem vendeu no varejo tem vantagem numa carreira de vendas → [LINK DA PÁGINA DE CARREIRA]

**Botão:** Quero mostrar o meu talento →

**Compartilhamento:** "Deu [Talento Escondido|Talento Escondida] 💎 — vendo como poucos, agora o mundo vai saber. E você?"

---

### 👻 O Candidato Fantasma / A Candidata Fantasma

**Frase de efeito:** "Manda currículo pra todo lado. Ninguém vê."

**Quem é você**
Você se candidata, se candidata de novo, e o retorno não vem. Não é falta de esforço — é que o seu currículo e o seu perfil estão passando despercebidos, seja pelos filtros automáticos, seja pelos poucos segundos que um recrutador dedica a cada um.

**Seu superpoder**
Persistência. Quem continua tentando depois de tanto silêncio tem uma resiliência que muita empresa procura.

**Seu ponto cego**
Mandar o mesmo currículo para vagas diferentes e achar que o LinkedIn é só "mais um lugar para ter conta". Hoje, quem é [encontrado|encontrada] tem vantagem sobre quem só se candidata.

**Se nada mudar…**
Você continua investindo tempo e energia em candidaturas que não viram entrevista.

**O caminho: Currículo + LinkedIn**
A gente refaz o seu currículo para ele passar pelos filtros e prender o olho de quem lê, e ajusta o seu LinkedIn para você começar a ser [encontrado|encontrada] por recrutadores — em vez de só procurar.

**Conteúdo para você:** Como os recrutadores leem o seu currículo (e o que faz eles pararem de ler) → [LINK DA PÁGINA DE CARREIRA]

**Botão:** Quero sair do modo fantasma →

**Compartilhamento:** "Deu [Candidato Fantasma|Candidata Fantasma] 👻 — hora de aparecer. E você?"

---

### 🚀 O Foguete na Rampa / ⭐ A Estrela em Ascensão

**Frase de efeito:** "Combustível tem. Falta a contagem regressiva."

**Quem é você**
Você já tem bagagem e entrega bem. Agora quer o próximo degrau: uma promoção, uma empresa maior, um salário que acompanhe o que você faz. O que falta é vitrine — as pessoas certas precisam enxergar o seu valor.

**Seu superpoder**
Resultado. Você tem história para contar, e isso é o que mais pesa na hora de subir.

**Seu ponto cego**
Esperar ser [notado|notada] só pelo trabalho. Quem sobe mais rápido não é só quem faz bem, é quem faz bem **e** mostra.

**Se nada mudar…**
As oportunidades continuam indo para quem é mais visível — nem sempre para quem é melhor.

**O caminho: Currículo + LinkedIn**
A gente reposiciona o seu currículo e o seu LinkedIn em torno dos seus resultados, para você chegar na próxima conversa — interna ou com outra empresa — como a pessoa óbvia para a vaga.

**Conteúdo para você:** Como usar o LinkedIn para crescer sem parecer que está procurando emprego → [LINK DA PÁGINA DE CARREIRA]

**Botão:** Quero decolar →

**Compartilhamento:** "Deu [Foguete na Rampa 🚀|Estrela em Ascensão ⭐] — contagem regressiva começou. E você?"

---

### 🧳 O Viajante de Rota Nova / A Viajante de Rota Nova

**Frase de efeito:** "Mala pronta para uma carreira nova."

**Quem é você**
Você quer mudar de área — e vendas está no seu radar. Pode ser pela possibilidade de ganhar por resultado, pela chance de crescer rápido ou simplesmente porque você gosta de gente. Só não sabe bem por onde começar, nem como contar a sua história para uma área nova.

**Seu superpoder**
Coragem. Mudar de rota exige mais do que continuar no mesmo lugar.

**Seu ponto cego**
Achar que precisa "começar do zero". Quase toda experiência tem algo de vendas: negociar, convencer, atender, resolver problema. O segredo é mostrar isso.

**Se nada mudar…**
A mudança fica sempre para "o ano que vem".

**O caminho: Currículo + LinkedIn**
A gente reescreve a sua história com foco na nova área: destaca o que você já tem de transferível e monta um perfil que faz sentido para quem contrata em vendas.

**Conteúdo para você:** Por que vendas é uma das carreiras que mais abre portas → [LINK DA PÁGINA DE CARREIRA]

**Botão:** Quero mudar de rota →

**Compartilhamento:** "Deu Viajante de Rota Nova 🧳 — mala pronta pra carreira nova. E você?"
