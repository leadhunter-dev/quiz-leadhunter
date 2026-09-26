"""Motor de resultado do quiz Leadhunter (v0.2 — duas trilhas).
Uso: python3 motor.py  -> roda casos-teste + simulação e gera pontuacao.md
Fonte da verdade: quiz-config.json (mude pesos lá, não aqui)."""
import json, random, collections, pathlib

AQUI = pathlib.Path(__file__).parent
CFG = json.loads((AQUI / "quiz-config.json").read_text(encoding="utf-8"))
PN = {p["id"]: p for p in CFG["perguntas_negocio"]}
PC = {p["id"]: p for p in CFG["perguntas_carreira"]}
DESEMPATE_N = ["GEN", "REF", "MAE", "CAC", "ESP"]
DESEMPATE_C = ["TAL", "FAN", "VIA", "FOG"]


def _somar(perguntas, respostas, chaves):
    pontos = collections.Counter({k: 0 for k in chaves})
    flags, autoridade, decisor = set(), 0, True
    for qid, letra in respostas.items():
        op = perguntas[qid]["opcoes"][letra]
        pontos.update(op.get("pontos", {}))
        if "flag" in op:
            flags.add(op["flag"])
        autoridade += op.get("autoridade", 0)
        if op.get("decisor") is False:
            decisor = False
    return pontos, flags, autoridade, decisor


def calcular_carreira(respostas):
    pontos, *_ = _somar(PC, respostas, DESEMPATE_C)
    melhor = max(pontos.values())
    resultado = next(c for c in DESEMPATE_C if pontos[c] == melhor)
    return {"trilha": "CARREIRA", "resultado": resultado, "pontos": dict(pontos), "temperatura": "CARREIRA"}


def calcular_negocio(respostas):
    pontos, flags, autoridade, decisor = _somar(PN, respostas, DESEMPATE_N)
    score = PN["Q3"]["opcoes"][respostas["Q3"]]["score"] + PN["Q10"]["opcoes"][respostas["Q10"]]["score"]
    score += (1 if decisor else 0) + (1 if respostas["Q9"] != "E" else 0)
    temperatura = "QUENTE" if score >= 6 else "MORNO" if score >= 3 else "FRIO"

    if "TICKET_BAIXO" in flags or ("B2C" in flags and "BUDGET_BAIXO" in flags):
        resultado = "EXP"
    elif "B2C" in flags:
        resultado = "ESP"
    elif autoridade <= 2 and "QUER_AUTORIDADE" in flags:
        resultado = "ESP"
    else:
        cand = set(DESEMPATE_N)
        if "BUDGET_BAIXO" in flags:
            cand -= {"GEN", "REF"}
        if "TEM_TIME" in flags:
            cand -= {"GEN"}
        melhor = max(pontos[c] for c in cand)
        emp = [c for c in DESEMPATE_N if c in cand and pontos[c] == melhor]
        resultado = "ESP" if (len(emp) > 1 and autoridade <= 2 and "ESP" in emp) else emp[0]

    if resultado == "EXP":
        temperatura = "FRIO"
    return {"trilha": "NEGOCIO", "resultado": resultado, "pontos": dict(pontos), "autoridade": autoridade,
            "flags": sorted(flags), "temperatura": temperatura, "score": score,
            "selo_autoridade": autoridade <= 2 and resultado in ("CAC", "MAE", "GEN", "REF"),
            "convite_carreira": "CONVITE_CARREIRA" in flags}


def calcular(q0, respostas):
    return calcular_negocio(respostas) if q0 == "A" else calcular_carreira(respostas)


N = lambda **k: k
CASOS = [
    ("N: consultor, perfil abandonado, quer referência", "A", N(Q1="D", Q2="A", Q3="C", Q4="A", Q5="B", Q6="A", Q7="D", Q8="C", Q9="A", Q10="C"), "ESP"),
    ("N: founder mão na massa, budget baixo", "A", N(Q1="A", Q2="A", Q3="B", Q4="B", Q5="A", Q6="C", Q7="B", Q8="B", Q9="B", Q10="B"), "CAC"),
    ("N: head comercial com SDRs", "A", N(Q1="C", Q2="A", Q3="C", Q4="C", Q5="C", Q6="D", Q7="A", Q8="B", Q9="D", Q10="C"), "MAE"),
    ("N: CEO sem tempo, ticket e budget altos", "A", N(Q1="A", Q2="A", Q3="D", Q4="E", Q5="B", Q6="A", Q7="A", Q8="A", Q9="B", Q10="D"), "GEN"),
    ("N: vive de indicação", "A", N(Q1="D", Q2="A", Q3="D", Q4="A", Q5="D", Q6="A", Q7="B", Q8="C", Q9="C", Q10="D"), "REF"),
    ("N: B2C ticket alto, budget alto (imóveis de luxo)", "A", N(Q1="A", Q2="C", Q3="D", Q4="A", Q5="B", Q6="A", Q7="B", Q8="C", Q9="B", Q10="D"), "ESP"),
    ("N: B2C com budget baixo", "A", N(Q1="A", Q2="C", Q3="B", Q4="A", Q5="A", Q6="B", Q7="C", Q8="C", Q9="B", Q10="A"), "EXP"),
    ("N: ticket baixo", "A", N(Q1="A", Q2="A", Q3="A", Q4="B", Q5="A", Q6="C", Q7="B", Q8="B", Q9="B", Q10="A"), "EXP"),
    ("C: vendedor de loja sem LinkedIn", "B", N(C1="B", C2="A", C3="C", C4="C", C5="C"), "TAL"),
    ("C: manda currículo e ninguém chama", "B", N(C1="B", C2="B", C3="B", C4="B", C5="A"), "FAN"),
    ("C: quer promoção onde está", "B", N(C1="C", C2="C", C3="A", C4="A", C5="E"), "FOG"),
    ("C: quer migrar para vendas", "B", N(C1="D", C2="E", C3="B", C4="B", C5="D"), "VIA"),
]


def tabela(titulo, perguntas, chaves, extra_cols):
    L = [f"\n## {titulo}\n", "| Pergunta | Opção | " + " | ".join(chaves) + "".join(f" | {c}" for c in extra_cols) + " |",
         "|---|---|" + "---|" * (len(chaves) + len(extra_cols))]
    for p in perguntas:
        for letra, op in p["opcoes"].items():
            pt = op.get("pontos", {})
            linha = f"| {p['id']} ({p['tema']}) | {letra} | " + " | ".join(str(pt.get(k, "")) for k in chaves)
            linha += "".join(f" | {op.get(c, '')}" for c in extra_cols)
            L.append(linha + " |")
    return L


def gerar_md():
    L = ["# Tabela de pontuação (gerada por motor.py — não editar à mão)\n",
         "**Q0 — O que te trouxe até aqui?** A = Trilha Negócio · B = Trilha Carreira\n",
         "Negócio: ESP Especialista Invisível · CAC Caçador(a) Solitário(a) · MAE Maestro/Maestra · GEN General/Rainha sem Exército · REF Refém da Indicação · EXP Explorador(a) de Outros Mares",
         "Carreira: TAL Talento Escondido(a) · FAN Candidato(a) Fantasma · FOG Foguete na Rampa / Estrela em Ascensão · VIA Viajante de Rota Nova"]
    L += tabela("Trilha Negócio", CFG["perguntas_negocio"], DESEMPATE_N, ["autoridade", "flag"])
    L += ["\n### Travas (nesta ordem)\n"] + [f"- {t}" for t in CFG["travas_negocio_em_ordem"]]
    L += tabela("Trilha Carreira", CFG["perguntas_carreira"], DESEMPATE_C, [])
    L += [f"\nDesempate: {CFG['desempate_carreira']}",
          f"\n## Regras extras\n\n- {CFG['selo_autoridade']}\n- {CFG['convite_carreira']}",
          "\n## Temperatura do lead\n"] + [f"- **{k}**: {v}" for k, v in CFG["temperatura_lead"].items()]
    return "\n".join(L) + "\n"


if __name__ == "__main__":
    falhas = 0
    print("== Casos-teste ==")
    for nome, q0, resp, esp in CASOS:
        r = calcular(q0, resp)
        ok = r["resultado"] == esp
        falhas += not ok
        print(f"{'OK ' if ok else 'ERRO'} {nome}: {r['resultado']} ({r['temperatura']})")
    random.seed(1)
    for rot, pergs in (("Negócio", CFG["perguntas_negocio"]), ("Carreira", CFG["perguntas_carreira"])):
        dist = collections.Counter()
        for _ in range(50_000):
            resp = {p["id"]: random.choice(list(p["opcoes"])) for p in pergs}
            dist[calcular("A" if rot == "Negócio" else "B", resp)["resultado"]] += 1
        print(f"\n== Distribuição aleatória {rot} ==  " + " · ".join(f"{k} {v/500:.0f}%" for k, v in dist.most_common()))
    (AQUI / "pontuacao.md").write_text(gerar_md(), encoding="utf-8")
    print("\npontuacao.md gerado. Falhas:", falhas)
