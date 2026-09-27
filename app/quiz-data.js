// GERADO por app/build.py — não edite à mão. Edite copy/ e logica/ e rode o build.
window.QUIZ = {
 "config": {
  "versao": "0.2",
  "bifurcacao": {
   "id": "Q0",
   "pergunta": "O que te trouxe até aqui?",
   "opcoes": {
    "A": "NEGOCIO",
    "B": "CARREIRA"
   }
  },
  "arquetipos": {
   "ESP": {
    "trilha": "NEGOCIO",
    "m": "O Especialista Invisível",
    "f": "A Especialista Invisível",
    "emoji": "🕶️",
    "oferta": "Consultoria de Autoridade"
   },
   "CAC": {
    "trilha": "NEGOCIO",
    "m": "O Caçador Solitário",
    "f": "A Caçadora Solitária",
    "emoji": "🏹",
    "oferta": "Plataforma Leadhunter"
   },
   "MAE": {
    "trilha": "NEGOCIO",
    "m": "O Maestro",
    "f": "A Maestra",
    "emoji": "🎼",
    "oferta": "Plataforma Leadhunter (plano para time)"
   },
   "GEN": {
    "trilha": "NEGOCIO",
    "m": "O General sem Exército",
    "f": "A Rainha sem Exército",
    "emoji_m": "⚔️",
    "emoji_f": "👑",
    "oferta": "Serviço Completo"
   },
   "REF": {
    "trilha": "NEGOCIO",
    "m": "O Refém da Indicação",
    "f": "A Refém da Indicação",
    "emoji": "🎲",
    "oferta": "Serviço Completo + Autoridade"
   },
   "EXP": {
    "trilha": "NEGOCIO",
    "m": "O Explorador de Outros Mares",
    "f": "A Exploradora de Outros Mares",
    "emoji": "🧭",
    "oferta": "Ajuste de LinkedIn (oferta de entrada)"
   },
   "TAL": {
    "trilha": "CARREIRA",
    "m": "O Talento Escondido",
    "f": "A Talento Escondida",
    "emoji": "💎",
    "oferta": "Currículo + LinkedIn"
   },
   "FAN": {
    "trilha": "CARREIRA",
    "m": "O Candidato Fantasma",
    "f": "A Candidata Fantasma",
    "emoji": "👻",
    "oferta": "Currículo + LinkedIn"
   },
   "FOG": {
    "trilha": "CARREIRA",
    "m": "O Foguete na Rampa",
    "f": "A Estrela em Ascensão",
    "emoji_m": "🚀",
    "emoji_f": "⭐",
    "oferta": "Currículo + LinkedIn"
   },
   "VIA": {
    "trilha": "CARREIRA",
    "m": "O Viajante de Rota Nova",
    "f": "A Viajante de Rota Nova",
    "emoji": "🧳",
    "oferta": "Currículo + LinkedIn"
   }
  },
  "perguntas_negocio": [
   {
    "id": "Q1",
    "tema": "cargo",
    "opcoes": {
     "A": {
      "pontos": {
       "CAC": 2,
       "GEN": 1
      },
      "decisor": true
     },
     "B": {
      "pontos": {
       "MAE": 2,
       "GEN": 1
      },
      "decisor": true
     },
     "C": {
      "pontos": {
       "MAE": 3
      },
      "decisor": true
     },
     "D": {
      "pontos": {
       "ESP": 2,
       "REF": 1
      },
      "decisor": true
     },
     "E": {
      "pontos": {
       "CAC": 2
      },
      "decisor": false,
      "flag": "CONVITE_CARREIRA"
     }
    }
   },
   {
    "id": "Q2",
    "tema": "b2b_b2c",
    "opcoes": {
     "A": {
      "pontos": {}
     },
     "B": {
      "pontos": {}
     },
     "C": {
      "pontos": {
       "ESP": 2
      },
      "flag": "B2C"
     }
    }
   },
   {
    "id": "Q3",
    "tema": "ticket",
    "opcoes": {
     "A": {
      "pontos": {},
      "flag": "TICKET_BAIXO",
      "score": 0
     },
     "B": {
      "pontos": {
       "CAC": 2,
       "ESP": 1
      },
      "score": 1
     },
     "C": {
      "pontos": {
       "GEN": 1,
       "MAE": 1,
       "REF": 1
      },
      "score": 2
     },
     "D": {
      "pontos": {
       "GEN": 2,
       "REF": 2
      },
      "score": 3
     }
    }
   },
   {
    "id": "Q4",
    "tema": "origem_clientes",
    "opcoes": {
     "A": {
      "pontos": {
       "REF": 3
      }
     },
     "B": {
      "pontos": {
       "CAC": 2
      }
     },
     "C": {
      "pontos": {
       "MAE": 2
      }
     },
     "D": {
      "pontos": {
       "MAE": 1,
       "GEN": 1
      }
     },
     "E": {
      "pontos": {
       "REF": 1,
       "GEN": 1
      }
     }
    }
   },
   {
    "id": "Q5",
    "tema": "quem_executa",
    "opcoes": {
     "A": {
      "pontos": {
       "CAC": 3
      }
     },
     "B": {
      "pontos": {
       "GEN": 3,
       "REF": 1
      }
     },
     "C": {
      "pontos": {
       "MAE": 3
      },
      "flag": "TEM_TIME"
     },
     "D": {
      "pontos": {
       "REF": 2,
       "GEN": 1
      }
     }
    }
   },
   {
    "id": "Q6",
    "tema": "horas_semana",
    "opcoes": {
     "A": {
      "pontos": {
       "GEN": 2,
       "REF": 2
      }
     },
     "B": {
      "pontos": {
       "CAC": 1,
       "ESP": 1
      }
     },
     "C": {
      "pontos": {
       "CAC": 2
      }
     },
     "D": {
      "pontos": {
       "MAE": 3
      },
      "flag": "TEM_TIME"
     }
    }
   },
   {
    "id": "Q7",
    "tema": "clareza_perfil",
    "opcoes": {
     "A": {
      "pontos": {
       "GEN": 1,
       "MAE": 1
      },
      "autoridade": 3
     },
     "B": {
      "pontos": {
       "CAC": 1,
       "REF": 1
      },
      "autoridade": 2
     },
     "C": {
      "pontos": {
       "ESP": 3
      },
      "autoridade": 1
     },
     "D": {
      "pontos": {
       "ESP": 3
      },
      "autoridade": 0
     }
    }
   },
   {
    "id": "Q8",
    "tema": "presenca_linkedin",
    "opcoes": {
     "A": {
      "pontos": {
       "GEN": 1
      },
      "autoridade": 3
     },
     "B": {
      "pontos": {
       "CAC": 1
      },
      "autoridade": 2
     },
     "C": {
      "pontos": {
       "ESP": 2,
       "REF": 1
      },
      "autoridade": 1
     },
     "D": {
      "pontos": {
       "ESP": 2
      },
      "autoridade": 0
     }
    }
   },
   {
    "id": "Q9",
    "tema": "gargalo",
    "opcoes": {
     "A": {
      "pontos": {
       "ESP": 3
      },
      "flag": "QUER_AUTORIDADE"
     },
     "B": {
      "pontos": {
       "GEN": 2,
       "CAC": 1
      }
     },
     "C": {
      "pontos": {
       "REF": 3
      }
     },
     "D": {
      "pontos": {
       "MAE": 3
      }
     },
     "E": {
      "pontos": {
       "REF": 1
      },
      "flag": "GARGALO_FECHAMENTO"
     }
    }
   },
   {
    "id": "Q10",
    "tema": "orcamento",
    "opcoes": {
     "A": {
      "pontos": {
       "CAC": 2,
       "ESP": 1
      },
      "flag": "BUDGET_BAIXO",
      "score": 0
     },
     "B": {
      "pontos": {
       "CAC": 2,
       "MAE": 1,
       "ESP": 1
      },
      "flag": "BUDGET_BAIXO",
      "score": 1
     },
     "C": {
      "pontos": {
       "GEN": 1,
       "REF": 1,
       "MAE": 1
      },
      "score": 2
     },
     "D": {
      "pontos": {
       "GEN": 2,
       "REF": 2
      },
      "score": 3
     }
    }
   }
  ],
  "perguntas_carreira": [
   {
    "id": "C1",
    "tema": "momento",
    "opcoes": {
     "A": {
      "pontos": {
       "FAN": 1,
       "TAL": 1
      }
     },
     "B": {
      "pontos": {
       "FAN": 2,
       "FOG": 1
      }
     },
     "C": {
      "pontos": {
       "FOG": 3
      }
     },
     "D": {
      "pontos": {
       "VIA": 3
      }
     },
     "E": {
      "pontos": {
       "FAN": 2,
       "TAL": 1
      }
     }
    }
   },
   {
    "id": "C2",
    "tema": "bagagem",
    "opcoes": {
     "A": {
      "pontos": {
       "TAL": 3
      }
     },
     "B": {
      "pontos": {
       "FAN": 1,
       "FOG": 1
      }
     },
     "C": {
      "pontos": {
       "FOG": 2
      }
     },
     "D": {
      "pontos": {
       "FOG": 2,
       "FAN": 1
      }
     },
     "E": {
      "pontos": {
       "VIA": 2,
       "FAN": 1
      }
     }
    }
   },
   {
    "id": "C3",
    "tema": "curriculo",
    "opcoes": {
     "A": {
      "pontos": {
       "FOG": 1
      }
     },
     "B": {
      "pontos": {
       "FAN": 1,
       "FOG": 1
      }
     },
     "C": {
      "pontos": {
       "TAL": 2
      }
     }
    }
   },
   {
    "id": "C4",
    "tema": "linkedin",
    "opcoes": {
     "A": {
      "pontos": {
       "FOG": 1
      }
     },
     "B": {
      "pontos": {
       "FAN": 2
      }
     },
     "C": {
      "pontos": {
       "TAL": 2
      }
     }
    }
   },
   {
    "id": "C5",
    "tema": "trava",
    "opcoes": {
     "A": {
      "pontos": {
       "FAN": 3
      }
     },
     "B": {
      "pontos": {
       "FOG": 1,
       "FAN": 1
      }
     },
     "C": {
      "pontos": {
       "TAL": 2
      }
     },
     "D": {
      "pontos": {
       "VIA": 3
      }
     },
     "E": {
      "pontos": {
       "FOG": 2
      }
     }
    }
   }
  ],
  "travas_negocio_em_ordem": [
   "1. Q3=A (ticket até R$ 5 mil/ano) -> EXP (oferta de entrada)",
   "2. Q2=C (B2C) E orçamento baixo (Q10=A/B) -> EXP",
   "3. Q2=C (B2C) com orçamento maior -> ESP (marca pessoal)",
   "4. autoridade <= 2 E Q9=A -> ESP",
   "5. BUDGET_BAIXO -> GEN e REF saem da disputa",
   "6. TEM_TIME -> GEN sai da disputa",
   "7. maior pontuação vence; empate: se autoridade <= 2, ESP; senão GEN > REF > MAE > CAC > ESP"
  ],
  "desempate_carreira": "maior pontuação vence; empate: TAL > FAN > VIA > FOG",
  "selo_autoridade": "Trilha Negócio: se autoridade <= 2 e o resultado for CAC, MAE, GEN ou REF, a página exibe o bloco 'Alerta de autoridade'.",
  "convite_carreira": "Trilha Negócio: se Q1=E (vendedor/SDR), a página de resultado mostra um botão secundário para fazer a Trilha Carreira.",
  "temperatura_lead": {
   "regra": "Só Trilha Negócio. score = Q3.score + Q10.score + (decisor ? 1 : 0) + (Q9 != E ? 1 : 0) -> 0 a 8",
   "QUENTE": ">= 6 -> resposta do José no mesmo dia útil",
   "MORNO": "3 a 5 -> análise do perfil em até 48h úteis",
   "FRIO": "<= 2 ou EXP -> análise do perfil + nutrição",
   "CARREIRA": "Trilha Carreira -> etiqueta própria no WhatsApp Business, atendimento por ordem de chegada"
  },
  "whatsapp": "5521969353524"
 },
 "perguntasNegocio": [
  {
   "id": "Q1",
   "titulo": "Qual cadeira você ocupa?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Sou [sócio ou fundador|sócia ou fundadora] e faço de tudo um pouco"
    },
    {
     "valor": "B",
     "texto": "Sou [sócio ou diretor|sócia ou diretora] e já tenho time comercial"
    },
    {
     "valor": "C",
     "texto": "Lidero o time comercial (gerente, head, coordenador[a])"
    },
    {
     "valor": "D",
     "texto": "Sou [consultor|consultora] ou especialista e vendo o meu próprio serviço"
    },
    {
     "valor": "E",
     "texto": "Sou [vendedor|vendedora] ou SDR"
    }
   ]
  },
  {
   "id": "Q2",
   "titulo": "Quem assina o seu contrato?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Um CNPJ, sempre"
    },
    {
     "valor": "B",
     "texto": "Às vezes CNPJ, às vezes CPF"
    },
    {
     "valor": "C",
     "texto": "Só CPF — vendo para pessoa física"
    }
   ]
  },
  {
   "id": "Q3",
   "titulo": "Quanto vale um cliente novo para você no primeiro ano?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Até R$ 5 mil"
    },
    {
     "valor": "B",
     "texto": "De R$ 5 mil a R$ 30 mil"
    },
    {
     "valor": "C",
     "texto": "De R$ 30 mil a R$ 100 mil"
    },
    {
     "valor": "D",
     "texto": "Mais de R$ 100 mil"
    }
   ]
  },
  {
   "id": "Q4",
   "titulo": "De onde vieram seus últimos 5 clientes?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Quase todos de indicação"
    },
    {
     "valor": "B",
     "texto": "Do meu esforço pessoal, indo atrás"
    },
    {
     "valor": "C",
     "texto": "Do meu time comercial prospectando"
    },
    {
     "valor": "D",
     "texto": "De marketing: anúncios, conteúdo, site"
    },
    {
     "valor": "E",
     "texto": "Sinceramente? Não sei dizer"
    }
   ]
  },
  {
   "id": "Q5",
   "titulo": "Se amanhã fosse preciso abordar 30 empresas novas por dia, quem faria isso?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Eu [mesmo|mesma], e com prazer"
    },
    {
     "valor": "B",
     "texto": "Eu… mas de onde vou tirar tempo?"
    },
    {
     "valor": "C",
     "texto": "Meu time"
    },
    {
     "valor": "D",
     "texto": "Ninguém. Aqui a gente não prospecta"
    }
   ]
  },
  {
   "id": "Q6",
   "titulo": "Quantas horas por semana você dedica a gerar novos clientes?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Menos de 2 horas"
    },
    {
     "valor": "B",
     "texto": "De 2 a 5 horas"
    },
    {
     "valor": "C",
     "texto": "De 5 a 10 horas"
    },
    {
     "valor": "D",
     "texto": "Tenho gente dedicada a isso em tempo integral"
    }
   ]
  },
  {
   "id": "Q7",
   "titulo": "Um decisor abre seu LinkedIn agora. Em 5 segundos ele entende o que você resolve e para quem?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Na hora. Meu perfil é uma vitrine"
    },
    {
     "valor": "B",
     "texto": "Mais ou menos. Se ler com calma, entende"
    },
    {
     "valor": "C",
     "texto": "Não. Parece um currículo"
    },
    {
     "valor": "D",
     "texto": "Meu LinkedIn está abandonado 🕸️"
    }
   ]
  },
  {
   "id": "Q8",
   "titulo": "E a sua presença por lá?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Publico toda semana e as pessoas interagem"
    },
    {
     "valor": "B",
     "texto": "Publico de vez em quando"
    },
    {
     "valor": "C",
     "texto": "Só leio, não publico"
    },
    {
     "valor": "D",
     "texto": "Entro quando alguém me marca"
    }
   ]
  },
  {
   "id": "Q9",
   "titulo": "Se você pudesse resolver uma coisa amanhã, seria…",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Ser [visto|vista] como referência no meu mercado"
    },
    {
     "valor": "B",
     "texto": "Ter mais reuniões com gente qualificada"
    },
    {
     "valor": "C",
     "texto": "Ter previsibilidade e parar de depender da sorte"
    },
    {
     "valor": "D",
     "texto": "Fazer meu time produzir mais"
    },
    {
     "valor": "E",
     "texto": "Fechar as reuniões que eu já tenho"
    }
   ]
  },
  {
   "id": "Q10",
   "titulo": "Quanto você investiria por mês para ter uma máquina de novos clientes rodando?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Até R$ 1 mil"
    },
    {
     "valor": "B",
     "texto": "De R$ 1 mil a R$ 3 mil"
    },
    {
     "valor": "C",
     "texto": "De R$ 3 mil a R$ 8 mil"
    },
    {
     "valor": "D",
     "texto": "Mais de R$ 8 mil"
    }
   ]
  }
 ],
 "perguntasCarreira": [
  {
   "id": "C1",
   "titulo": "Qual é o seu momento?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Estou buscando meu primeiro emprego"
    },
    {
     "valor": "B",
     "texto": "Tenho emprego, mas quero trocar por um melhor"
    },
    {
     "valor": "C",
     "texto": "Quero crescer onde estou (promoção, aumento, reconhecimento)"
    },
    {
     "valor": "D",
     "texto": "Quero mudar de área — de preferência para vendas"
    },
    {
     "valor": "E",
     "texto": "Estou sem emprego no momento"
    }
   ]
  },
  {
   "id": "C2",
   "titulo": "Qual é a sua bagagem?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Já vendi muito: loja, rua, varejo, porta a porta"
    },
    {
     "valor": "B",
     "texto": "De 1 a 3 anos trabalhando em empresa"
    },
    {
     "valor": "C",
     "texto": "Mais de 3 anos de experiência na minha área"
    },
    {
     "valor": "D",
     "texto": "Já liderei pessoas ou equipes"
    },
    {
     "valor": "E",
     "texto": "Estou começando agora"
    }
   ]
  },
  {
   "id": "C3",
   "titulo": "E o seu currículo hoje?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Atualizado e bem feito"
    },
    {
     "valor": "B",
     "texto": "Existe, mas está desatualizado"
    },
    {
     "valor": "C",
     "texto": "Nem tenho currículo pronto"
    }
   ]
  },
  {
   "id": "C4",
   "titulo": "E o seu LinkedIn?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Tenho e está bem montado"
    },
    {
     "valor": "B",
     "texto": "Tenho, mas está parado"
    },
    {
     "valor": "C",
     "texto": "Não tenho LinkedIn"
    }
   ]
  },
  {
   "id": "C5",
   "titulo": "O que mais te trava hoje?",
   "opcoes": [
    {
     "valor": "A",
     "texto": "Mando currículo e ninguém me chama"
    },
    {
     "valor": "B",
     "texto": "Me chamam para entrevista, mas não passo"
    },
    {
     "valor": "C",
     "texto": "Não sei me vender, nem no papel nem na conversa"
    },
    {
     "valor": "D",
     "texto": "Não sei qual caminho seguir"
    },
    {
     "valor": "E",
     "texto": "Faço um bom trabalho, mas ninguém percebe"
    }
   ]
  }
 ],
 "resultados": {
  "ESP": {
   "frase": "O melhor do mercado que o mercado ainda não conhece.",
   "quem": "Você é [bom|boa] no que faz. Seus clientes sabem disso, quem trabalhou com você sabe disso. O problema é que o resto do mercado não sabe. Seu LinkedIn conta a sua história como um currículo, não como a vitrine de alguém que resolve um problema caro.",
   "superpoder": "Entrega. Quando alguém chega até você, a chance de virar cliente — e de ficar — é alta.",
   "pontoCego": "Achar que competência se divulga sozinha. Não se divulga. Antes de comprar, o decisor B2B abre o seu perfil. Se ele não entende em 5 segundos o que você resolve, ele segue rolando.",
   "seNadaMudar": "Você continua perdendo espaço para concorrentes menos preparados, mas mais visíveis. E qualquer prospecção que você fizer vai render menos, porque o perfil não sustenta a abordagem.",
   "ofertaTitulo": "Consultoria de Autoridade",
   "oferta": "Antes de sair prospectando, a gente reposiciona o seu LinkedIn para falar com quem compra de você: headline, capa, sobre, destaques e uma linha de conteúdo que prova o que você sabe. Autoridade primeiro, volume depois.",
   "bonus": "O José Henrique vai abrir o seu perfil e te mandar, no WhatsApp, o que ele mudaria primeiro. Sem custo.",
   "conteudo": "",
   "botao": "Quero que o José analise meu perfil",
   "botaoSecundario": "",
   "compartilhar": "Deu Especialista Invisível 🕶️ — [bom|boa] demais pra continuar [escondido|escondida]. E você, que tipo de caçador(a) B2B é?"
  },
  "CAC": {
   "frase": "Vai pra cima [sozinho|sozinha] — e ainda assim traz resultado.",
   "quem": "Você não espera cliente cair do céu. Você vai atrás, manda mensagem, puxa conversa, faz follow-up. Boa parte dos seus clientes existe porque você foi buscar.",
   "superpoder": "Iniciativa. Você tem a parte mais difícil da prospecção: disposição para começar.",
   "pontoCego": "Tudo depende de você. Quando a agenda aperta com entregas, a prospecção para — e dois meses depois o pipeline sente.",
   "seNadaMudar": "Você vira o gargalo da própria empresa. O volume de novos clientes fica preso ao número de horas que você consegue tirar da semana.",
   "ofertaTitulo": "Plataforma Leadhunter",
   "oferta": "A mesma metodologia que a Leadhunter usa nas operações dos clientes, numa ferramenta que você [mesmo|mesma] opera: listas no perfil certo, mensagens personalizadas com IA e cadência organizada. Você continua no comando, mas deixa de fazer tudo na mão.",
   "bonus": "O José Henrique vai analisar seu LinkedIn e te dizer se o seu perfil está pronto para aguentar mais volume de abordagem.",
   "conteudo": "",
   "botao": "Quero ver a plataforma funcionando",
   "botaoSecundario": "",
   "compartilhar": "Deu [Caçador Solitário|Caçadora Solitária] 🏹 — prospecto [sozinho|sozinha] e ainda trago resultado. E você?"
  },
  "MAE": {
   "frase": "Tem a orquestra. Falta a partitura.",
   "quem": "Você já tem gente vendendo — SDRs, vendedores, um time comercial. Seu desafio não é começar a prospectar, é fazer o time prospectar melhor, com método e sem depender do talento individual de cada um.",
   "superpoder": "Estrutura. Você já passou da fase do \"eu faço tudo\" e tem braços para escalar.",
   "pontoCego": "Cada vendedor prospecta do seu jeito: listas diferentes, mensagens diferentes, resultados diferentes. Sem padrão, você não sabe o que funciona — e não consegue replicar.",
   "seNadaMudar": "O custo do time sobe, o volume de reuniões não acompanha e a meta vira loteria de quem teve o melhor mês.",
   "ofertaTitulo": "Plataforma Leadhunter para times",
   "oferta": "Uma operação padronizada para todo o time: mesmas listas qualificadas, mensagens personalizadas por perfil de cliente e visão clara do que está gerando reunião. Seu time com a partitura na mão.",
   "bonus": "O José Henrique vai analisar o seu LinkedIn — e, se você quiser, conversar sobre como os perfis do seu time estão se apresentando para o mercado.",
   "conteudo": "",
   "botao": "Quero dar método pro meu time",
   "botaoSecundario": "",
   "compartilhar": "Deu [Maestro|Maestra] 🎼 — tenho a orquestra, agora quero a partitura. E você?"
  },
  "GEN": {
   "frase": "Sabe exatamente onde atacar. Só falta quem vá ao campo.",
   "quem": "Você tem autoridade, tem um produto que vale caro e sabe quem é o cliente ideal. O que falta é tempo — e gente — para ir buscar esses clientes todos os dias. Sua agenda é de estratégia, negociação e fechamento, não de mandar 30 convites por dia.",
   "superpoder": "Visão e poder de fechamento. Coloque você numa reunião com o decisor certo e a chance de negócio é alta.",
   "pontoCego": "Achar que vai \"arrumar um tempinho\" para prospectar. Não vai. E contratar e treinar um time de pré-vendas do zero leva meses e custa caro.",
   "seNadaMudar": "Você continua fechando bem as poucas reuniões que aparecem, mas o crescimento fica limitado ao que chega sozinho.",
   "ofertaTitulo": "Serviço Completo Leadhunter",
   "oferta": "A Leadhunter vira o seu exército. A gente mergulha no seu negócio, monta as listas, cria as abordagens, opera LinkedIn e e-mail todos os dias e entrega reuniões qualificadas na sua agenda. Você entra em campo só para o que faz de melhor: negociar e fechar.",
   "bonus": "O José Henrique vai analisar o seu LinkedIn — que é o perfil que vai abrir as portas — e te mandar os ajustes antes de qualquer campanha.",
   "conteudo": "",
   "botao": "Quero o meu exército",
   "botaoSecundario": "",
   "compartilhar": "Deu [General sem Exército ⚔️|Rainha sem Exército 👑] — sei onde atacar, só falta quem vá ao campo. E você?"
  },
  "REF": {
   "frase": "Quando a indicação vem, é festa. Quando não vem…",
   "quem": "Seu negócio foi construído no boca a boca, e isso diz muito sobre a qualidade do que você entrega. O problema é que a indicação não tem agenda: tem mês que chove, tem mês que seca, e você não controla nenhum dos dois.",
   "superpoder": "Reputação. Quem compra de você indica você. Isso é prova social pronta para ser usada.",
   "pontoCego": "Confundir \"tenho clientes\" com \"tenho um processo para ter clientes\". Sem prospecção ativa, o crescimento depende da boa vontade dos outros.",
   "seNadaMudar": "O faturamento continua em montanha-russa, e fica difícil planejar contratação, investimento ou qualquer coisa além do próximo trimestre.",
   "ofertaTitulo": "Serviço Completo + Autoridade",
   "oferta": "Duas frentes juntas: a gente ajusta o seu LinkedIn para que a sua reputação fique visível para quem ainda não te conhece e, ao mesmo tempo, opera a prospecção todos os dias para gerar reuniões com o seu cliente ideal. A indicação continua vindo — mas deixa de ser o único caminho.",
   "bonus": "O José Henrique vai analisar o seu LinkedIn e te mostrar como transformar a sua reputação em prova social no perfil.",
   "conteudo": "",
   "botao": "Quero parar de depender da sorte",
   "botaoSecundario": "",
   "compartilhar": "Deu Refém da Indicação 🎲 — hora de parar de depender da sorte. E você?"
  },
  "EXP": {
   "frase": "Seu tesouro está num mapa diferente — e a vitrine vem primeiro.",
   "quem": "Você tem vontade de crescer e não tem medo de ir atrás. O seu jogo é diferente do outbound B2B tradicional: [você vende para pessoa física|o seu ticket pede volume], e nesse jogo quem ganha é quem é lembrado. Antes de pensar em máquina de prospecção, o primeiro passo é ter uma vitrine que trabalhe por você.",
   "superpoder": "Agilidade. Negócios como o seu testam, ajustam e aprendem rápido.",
   "pontoCego": "Achar que o LinkedIn \"não é para o seu tipo de negócio\". É onde estão parceiros, fornecedores, indicadores e clientes com poder de compra — e quase ninguém do seu mercado usa bem.",
   "seNadaMudar": "Você continua dependendo só dos canais de sempre, disputando atenção com todo mundo pelo preço.",
   "ofertaTitulo": "Ajuste de LinkedIn",
   "oferta": "Uma repaginada objetiva no seu perfil — headline, capa, sobre e destaques — para você passar a ser [encontrado e lembrado|encontrada e lembrada]. Rápido e com um investimento que cabe no seu momento.",
   "bonus": "O José Henrique vai abrir o seu perfil e te mandar no WhatsApp o que ele mudaria primeiro.",
   "conteudo": "",
   "botao": "Quero repaginar meu LinkedIn",
   "botaoSecundario": "",
   "compartilhar": "Deu [Explorador|Exploradora] de Outros Mares 🧭. E você, que tipo de caçador(a) é?"
  },
  "TAL": {
   "frase": "Vende como poucos. Só falta o mundo ficar sabendo.",
   "quem": "Você já provou na prática que sabe vender: no balcão, na rua, no porta a porta, no atendimento. Sabe ler cliente, contornar objeção e fechar. O problema é que nada disso aparece no papel — e quem contrata olha primeiro para o currículo e para o LinkedIn.",
   "superpoder": "Experiência real de venda. Tem muito profissional com currículo bonito que nunca ouviu um \"não\" de cliente. Você já ouviu vários — e fechou mesmo assim.",
   "pontoCego": "Achar que a sua experiência \"não conta\" porque não foi em escritório. Conta, e muito. Só precisa ser traduzida para a linguagem de quem contrata.",
   "seNadaMudar": "Você continua sendo [avaliado|avaliada] pelo que o papel mostra, e não pelo que você sabe fazer.",
   "ofertaTitulo": "Currículo + LinkedIn",
   "oferta": "A gente pega a sua história de vendas e transforma em currículo e perfil que recrutador entende: resultados, números, habilidades. Se você ainda não tem LinkedIn, a gente monta do zero.",
   "bonus": "",
   "conteudo": "Por que quem vendeu no varejo tem vantagem numa carreira de vendas → [LINK DA PÁGINA DE CARREIRA]",
   "botao": "Quero mostrar o meu talento",
   "botaoSecundario": "",
   "compartilhar": "Deu [Talento Escondido|Talento Escondida] 💎 — vendo como poucos, agora o mundo vai saber. E você?"
  },
  "FAN": {
   "frase": "Manda currículo pra todo lado. Ninguém vê.",
   "quem": "Você se candidata, se candidata de novo, e o retorno não vem. Não é falta de esforço — é que o seu currículo e o seu perfil estão passando despercebidos, seja pelos filtros automáticos, seja pelos poucos segundos que um recrutador dedica a cada um.",
   "superpoder": "Persistência. Quem continua tentando depois de tanto silêncio tem uma resiliência que muita empresa procura.",
   "pontoCego": "Mandar o mesmo currículo para vagas diferentes e achar que o LinkedIn é só \"mais um lugar para ter conta\". Hoje, quem é [encontrado|encontrada] tem vantagem sobre quem só se candidata.",
   "seNadaMudar": "Você continua investindo tempo e energia em candidaturas que não viram entrevista.",
   "ofertaTitulo": "Currículo + LinkedIn",
   "oferta": "A gente refaz o seu currículo para ele passar pelos filtros e prender o olho de quem lê, e ajusta o seu LinkedIn para você começar a ser [encontrado|encontrada] por recrutadores — em vez de só procurar.",
   "bonus": "",
   "conteudo": "Como os recrutadores leem o seu currículo (e o que faz eles pararem de ler) → [LINK DA PÁGINA DE CARREIRA]",
   "botao": "Quero sair do modo fantasma",
   "botaoSecundario": "",
   "compartilhar": "Deu [Candidato Fantasma|Candidata Fantasma] 👻 — hora de aparecer. E você?"
  },
  "FOG": {
   "frase": "Combustível tem. Falta a contagem regressiva.",
   "quem": "Você já tem bagagem e entrega bem. Agora quer o próximo degrau: uma promoção, uma empresa maior, um salário que acompanhe o que você faz. O que falta é vitrine — as pessoas certas precisam enxergar o seu valor.",
   "superpoder": "Resultado. Você tem história para contar, e isso é o que mais pesa na hora de subir.",
   "pontoCego": "Esperar ser [notado|notada] só pelo trabalho. Quem sobe mais rápido não é só quem faz bem, é quem faz bem **e** mostra.",
   "seNadaMudar": "As oportunidades continuam indo para quem é mais visível — nem sempre para quem é melhor.",
   "ofertaTitulo": "Currículo + LinkedIn",
   "oferta": "A gente reposiciona o seu currículo e o seu LinkedIn em torno dos seus resultados, para você chegar na próxima conversa — interna ou com outra empresa — como a pessoa óbvia para a vaga.",
   "bonus": "",
   "conteudo": "Como usar o LinkedIn para crescer sem parecer que está procurando emprego → [LINK DA PÁGINA DE CARREIRA]",
   "botao": "Quero decolar",
   "botaoSecundario": "",
   "compartilhar": "Deu [Foguete na Rampa 🚀|Estrela em Ascensão ⭐] — contagem regressiva começou. E você?"
  },
  "VIA": {
   "frase": "Mala pronta para uma carreira nova.",
   "quem": "Você quer mudar de área — e vendas está no seu radar. Pode ser pela possibilidade de ganhar por resultado, pela chance de crescer rápido ou simplesmente porque você gosta de gente. Só não sabe bem por onde começar, nem como contar a sua história para uma área nova.",
   "superpoder": "Coragem. Mudar de rota exige mais do que continuar no mesmo lugar.",
   "pontoCego": "Achar que precisa \"começar do zero\". Quase toda experiência tem algo de vendas: negociar, convencer, atender, resolver problema. O segredo é mostrar isso.",
   "seNadaMudar": "A mudança fica sempre para \"o ano que vem\".",
   "ofertaTitulo": "Currículo + LinkedIn",
   "oferta": "A gente reescreve a sua história com foco na nova área: destaca o que você já tem de transferível e monta um perfil que faz sentido para quem contrata em vendas.",
   "bonus": "",
   "conteudo": "Por que vendas é uma das carreiras que mais abre portas → [LINK DA PÁGINA DE CARREIRA]",
   "botao": "Quero mudar de rota",
   "botaoSecundario": "",
   "compartilhar": "Deu Viajante de Rota Nova 🧳 — mala pronta pra carreira nova. E você?"
  }
 },
 "extras": {
  "alerta": {
   "titulo": "Um alerta antes de você acelerar",
   "texto": "Pelas suas respostas, o seu LinkedIn ainda não sustenta a sua abordagem. Na prática, isso significa que cada convite e cada mensagem vai converter menos, porque o decisor abre o seu perfil e não encontra motivo para responder. Antes de colocar volume, vale ajustar a vitrine. A análise que o José vai te mandar começa exatamente por aqui."
  },
  "convite": {
   "titulo": "E a sua carreira?",
   "texto": "Você respondeu como quem está na linha de frente. Quer descobrir também o seu arquétipo de carreira? São 5 perguntas.",
   "botao": "Fazer a Trilha Carreira"
  }
 },
 "whatsapp": {
  "ESP": {
   "m": "Oi José! Fiz o quiz da Leadhunter e deu Especialista Invisível 🕶️. Quero entender como fazer meu LinkedIn trabalhar por mim.",
   "f": "Oi José! Fiz o quiz da Leadhunter e deu Especialista Invisível 🕶️. Quero entender como fazer meu LinkedIn trabalhar por mim."
  },
  "CAC": {
   "m": "Oi José! Fiz o quiz da Leadhunter e deu Caçador Solitário 🏹. Prospecto sozinho e quero ver como a plataforma Leadhunter pode me dar escala.",
   "f": "Oi José! Fiz o quiz da Leadhunter e deu Caçadora Solitária 🏹. Prospecto sozinha e quero ver como a plataforma Leadhunter pode me dar escala."
  },
  "MAE": {
   "m": "Oi José! Fiz o quiz da Leadhunter e deu Maestro 🎼. Tenho time comercial e quero dar mais método e volume para a prospecção deles.",
   "f": "Oi José! Fiz o quiz da Leadhunter e deu Maestra 🎼. Tenho time comercial e quero dar mais método e volume para a prospecção deles."
  },
  "GEN": {
   "m": "Oi José! Fiz o quiz da Leadhunter e deu General sem Exército ⚔️. Quero entender como a Leadhunter monta a prospecção por mim.",
   "f": "Oi José! Fiz o quiz da Leadhunter e deu Rainha sem Exército 👑. Quero entender como a Leadhunter monta a prospecção por mim."
  },
  "REF": {
   "m": "Oi José! Fiz o quiz da Leadhunter e deu Refém da Indicação 🎲. Cansei de depender de indicação e quero previsibilidade.",
   "f": "Oi José! Fiz o quiz da Leadhunter e deu Refém da Indicação 🎲. Cansei de depender de indicação e quero previsibilidade."
  },
  "EXP": {
   "m": "Oi José! Fiz o quiz da Leadhunter e deu Explorador de Outros Mares 🧭. Quero repaginar meu LinkedIn.",
   "f": "Oi José! Fiz o quiz da Leadhunter e deu Exploradora de Outros Mares 🧭. Quero repaginar meu LinkedIn."
  },
  "TAL": {
   "m": "Oi José! Fiz o quiz de carreira e deu Talento Escondido 💎. Quero montar meu currículo e LinkedIn.",
   "f": "Oi José! Fiz o quiz de carreira e deu Talento Escondida 💎. Quero montar meu currículo e LinkedIn."
  },
  "FAN": {
   "m": "Oi José! Fiz o quiz de carreira e deu Candidato Fantasma 👻. Quero sair do modo fantasma e ser chamado para entrevistas.",
   "f": "Oi José! Fiz o quiz de carreira e deu Candidata Fantasma 👻. Quero sair do modo fantasma e ser chamada para entrevistas."
  },
  "FOG": {
   "m": "Oi José! Fiz o quiz de carreira e deu Foguete na Rampa 🚀. Quero ajustar meu currículo e LinkedIn para crescer na carreira.",
   "f": "Oi José! Fiz o quiz de carreira e deu Estrela em Ascensão ⭐. Quero ajustar meu currículo e LinkedIn para crescer na carreira."
  },
  "VIA": {
   "m": "Oi José! Fiz o quiz de carreira e deu Viajante de Rota Nova 🧳. Quero migrar de área e preciso ajustar meu currículo e LinkedIn.",
   "f": "Oi José! Fiz o quiz de carreira e deu Viajante de Rota Nova 🧳. Quero migrar de área e preciso ajustar meu currículo e LinkedIn."
  }
 }
};
