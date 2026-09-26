"""Motor de resultado do quiz Leadhunter.
Uso: python3 motor.py            -> roda casos-teste + simulação e gera pontuacao.md
Fonte da verdade: quiz-config.json (mude pesos lá, não aqui)."""
import json, random, itertools, collections, pathlib

AQUI = pathlib.Path(__file__).parent
CFG = json.loads((AQUI / "quiz-config.json").read_text(encoding="utf-8"))
PERG = {p["id"]: p for p in CFG["perguntas"]}
DESEMPATE = ["GEN", "REF", "MAE", "CAC", "ESP"]


def calcular(respostas: dict) -> dict:
    """respostas = {"Q1": "A", ...}. Retorna resultado, pontos, autoridade, temperatura, selo."""
    pontos = collections.Counter({k: 0 for k in DESEMPATE})
    flags, autoridade, decisor = set(), 0, True
    for qid, letra in respostas.items():
        op = PERG[qid]["opcoes"][letra]
        pontos.update(op.get("pontos", {}))
        if "flag" in op:
            flags.add(op["flag"])
        autoridade += op.get("autoridade", 0)
        if op.get("decisor") is False:
            decisor = False

    score = PERG["Q3"]["opcoes"][respostas["Q3"]]["score"] + PERG["Q10"]["opcoes"][respostas["Q10"]]["score"]
    score += (1 if decisor else 0) + (1 if respostas["Q9"] != "E" else 0)
    temperatura = "QUENTE" if score >= 6 else "MORNO" if score >= 3 else "FRIO"

    # Travas em ordem
    if "B2C" in flags or "TICKET_BAIXO" in flags:
        resultado = "DESQ"
    elif autoridade <= 2 and "QUER_AUTORIDADE" in flags:
        resultado = "ESP"
    else:
        candidatos = set(DESEMPATE)
        if "BUDGET_BAIXO" in flags:
            candidatos -= {"GEN", "REF"}
        if "TEM_TIME" in flags:
            candidatos -= {"GEN"}
        melhor = max(pontos[c] for c in candidatos)
        empatados = [c for c in DESEMPATE if c in candidatos and pontos[c] == melhor]
        if len(empatados) > 1 and autoridade <= 2 and "ESP" in empatados:
            resultado = "ESP"
        else:
            resultado = empatados[0]

    if resultado == "DESQ":
        temperatura = "FRIO"
    selo = autoridade <= 2 and resultado not in ("ESP", "DESQ")
    return {"resultado": resultado, "pontos": dict(pontos), "autoridade": autoridade,
            "flags": sorted(flags), "temperatura": temperatura, "score": score,
            "selo_autoridade": selo}


CASOS = [
    ("Founder consultor, perfil abandonado, quer referência",
     dict(Q1="D", Q2="A", Q3="C", Q4="A", Q5="B", Q6="A", Q7="D", Q8="C", Q9="A", Q10="C"), "ESP"),
    ("Founder mão na massa, budget baixo",
     dict(Q1="A", Q2="A", Q3="B", Q4="B", Q5="A", Q6="C", Q7="B", Q8="B", Q9="B", Q10="B"), "CAC"),
    ("Head comercial com SDRs",
     dict(Q1="C", Q2="A", Q3="C", Q4="C", Q5="C", Q6="D", Q7="A", Q8="B", Q9="D", Q10="C"), "MAE"),
    ("CEO sem tempo, ticket alto, budget alto",
     dict(Q1="A", Q2="A", Q3="D", Q4="E", Q5="B", Q6="A", Q7="A", Q8="A", Q9="B", Q10="D"), "GEN"),
    ("Vive de indicação, quer previsibilidade",
     dict(Q1="D", Q2="A", Q3="D", Q4="A", Q5="D", Q6="A", Q7="B", Q8="C", Q9="C", Q10="D"), "REF"),
    ("B2C",
     dict(Q1="A", Q2="C", Q3="D", Q4="A", Q5="B", Q6="A", Q7="A", Q8="A", Q9="B", Q10="D"), "DESQ"),
    ("Ticket baixo",
     dict(Q1="A", Q2="A", Q3="A", Q4="B", Q5="A", Q6="C", Q7="B", Q8="B", Q9="B", Q10="A"), "DESQ"),
    ("Perfil de General mas budget baixo -> não pode ser GEN",
     dict(Q1="A", Q2="A", Q3="D", Q4="E", Q5="B", Q6="A", Q7="A", Q8="A", Q9="B", Q10="A"), None),
]


def gerar_tabela():
    L = ["# Tabela de pontuação (gerada por motor.py — não editar à mão)\n",
         "Pontos que cada resposta soma para cada arquétipo. ESP = Especialista Invisível · CAC = Caçador(a) Solitário(a) · MAE = Maestro/Maestra · GEN = General/Rainha sem Exército · REF = Refém da Indicação.\n",
         "| Pergunta | Opção | ESP | CAC | MAE | GEN | REF | Autoridade | Flag |", "|---|---|---|---|---|---|---|---|---|"]
    for p in CFG["perguntas"]:
        for letra, op in p["opcoes"].items():
            pt = op.get("pontos", {})
            cel = [str(pt.get(k, "")) for k in ["ESP", "CAC", "MAE", "GEN", "REF"]]
            L.append(f"| {p['id']} ({p['tema']}) | {letra} | " + " | ".join(cel) +
                     f" | {op.get('autoridade', '')} | {op.get('flag', '')} |")
    L += ["\n## Travas (aplicadas nesta ordem)\n"] + [f"- {t}" for t in CFG["travas_em_ordem"]]
    L += [f"\n## Selo de autoridade\n\n{CFG['selo_autoridade']}",
          "\n## Temperatura do lead\n"] + [f"- **{k}**: {v}" for k, v in CFG["temperatura_lead"].items()]
    return "\n".join(L) + "\n"


if __name__ == "__main__":
    print("== Casos-teste ==")
    falhas = 0
    for nome, resp, esperado in CASOS:
        r = calcular(resp)
        ok = (r["resultado"] == esperado) if esperado else r["resultado"] not in ("GEN", "REF")
        falhas += not ok
        print(f"{'OK ' if ok else 'ERRO'} {nome}: {r['resultado']} | aut={r['autoridade']} | {r['temperatura']} | selo={r['selo_autoridade']}")
    print("\n== Distribuição com respostas aleatórias (100 mil) ==")
    random.seed(1)
    dist = collections.Counter()
    for _ in range(100_000):
        resp = {p["id"]: random.choice(list(p["opcoes"])) for p in CFG["perguntas"]}
        dist[calcular(resp)["resultado"]] += 1
    for k, v in dist.most_common():
        print(f"{k}: {v/1000:.1f}%")
    (AQUI / "pontuacao.md").write_text(gerar_tabela(), encoding="utf-8")
    print("\npontuacao.md gerado. Falhas:", falhas)
