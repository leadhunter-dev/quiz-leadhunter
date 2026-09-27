"""Gera app/quiz-data.js a partir dos textos em copy/ e da lógica em logica/quiz-config.json.

Uso (na pasta quiz-funnel):  python3 app/build.py
Rode sempre que mudar algum texto ou peso. O quiz lê apenas quiz-data.js.
"""
import json, re, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
COPY = RAIZ / "copy"
CFG = json.loads((RAIZ / "logica" / "quiz-config.json").read_text(encoding="utf-8"))
NOTA = re.compile(r"\s*\*\([^)]*\)\*\s*$")  # remove notas "*(...)*" no fim da linha


def perguntas(arquivo, prefixo):
    out, atual = [], None
    for linha in (COPY / arquivo).read_text(encoding="utf-8").splitlines():
        m = re.match(rf"^### ({prefixo}\d+) — (.+)$", linha)
        if m:
            atual = {"id": m.group(1), "titulo": NOTA.sub("", m.group(2)).strip(), "opcoes": []}
            out.append(atual)
            continue
        m = re.match(r"^- \*\*([A-E])\)\*\* (.+)$", linha)
        if m and atual:
            atual["opcoes"].append({"valor": m.group(1), "texto": NOTA.sub("", m.group(2)).strip()})
    return out


def secoes(arquivo):
    texto = (COPY / arquivo).read_text(encoding="utf-8")
    return [s for s in re.split(r"\n## ", texto)[1:]]


def campos(secao):
    """Lê blocos '**Rótulo:** valor' ou '**Rótulo**\\nparágrafo'."""
    linhas = secao.splitlines()
    res, chave = {"_titulo": linhas[0].strip()}, None
    for l in linhas[1:]:
        if l.startswith(">") or l.strip() == "---":
            chave = None
            continue
        m = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", l)
        if m:
            rot, resto = m.group(1).strip(), m.group(2).strip()
            if rot.endswith(":"):  # inline
                res[rot[:-1].strip()] = resto.strip('"').strip()
                chave = None
            else:
                chave = rot
                res[chave] = ""
            continue
        if chave and l.strip():
            res[chave] = (res[chave] + " " + l.strip()).strip()
    return res


def resultados():
    out, extras = {}, {}
    for arq in ("04-resultados-negocio.md", "05-resultados-carreira.md"):
        for s in secoes(arq):
            c = campos(s)
            tit = c["_titulo"]
            cod = next((k for k, a in CFG["arquetipos"].items() if a["m"] in tit), None)
            if cod:
                caminho = next(k for k in c if k.startswith("O caminho"))
                out[cod] = {
                    "frase": c.get("Frase de efeito", ""),
                    "quem": c.get("Quem é você", ""),
                    "superpoder": c.get("Seu superpoder", ""),
                    "pontoCego": c.get("Seu ponto cego", ""),
                    "seNadaMudar": c.get("Se nada mudar…", ""),
                    "ofertaTitulo": caminho.split(":", 1)[1].strip(),
                    "oferta": c[caminho],
                    "bonus": c.get("Bônus", ""),
                    "conteudo": c.get("Conteúdo para você", ""),
                    "botao": c.get("Botão", "").rstrip(" →"),
                    "botaoSecundario": c.get("Botão secundário", "").rstrip(" →"),
                    "compartilhar": c.get("Compartilhamento", ""),
                }
            elif "Alerta de autoridade" in tit:
                extras["alerta"] = {"titulo": c.get("Título", ""), "texto": c.get("Texto", "")}
            elif "Convite para a Trilha Carreira" in tit:
                extras["convite"] = {"titulo": c.get("Título", ""), "texto": c.get("Texto", ""),
                                     "botao": c.get("Botão secundário", "").rstrip(" →")}
    return out, extras


def whatsapp():
    ordem = ["ESP", "CAC", "MAE", "GEN", "REF", "EXP", "TAL", "FAN", "FOG", "VIA"]
    txt = (COPY / "06-whatsapp-e-pos-quiz.md").read_text(encoding="utf-8")
    txt = txt.split("## 1.", 1)[1].split("## 2.", 1)[0]
    m = re.findall(r'- \*\*Masculino:\*\* "(.+?)"\n.*?\n- \*\*Feminino:\*\* "(.+?)"', txt)
    assert len(m) == len(ordem), f"esperava {len(ordem)} mensagens de WhatsApp, achei {len(m)}"
    return {cod: {"m": a, "f": b} for cod, (a, b) in zip(ordem, m)}


if __name__ == "__main__":
    res, extras = resultados()
    faltando = [k for k in CFG["arquetipos"] if k not in res]
    assert not faltando, f"resultados sem texto: {faltando}"
    dados = {
        "config": CFG,
        "perguntasNegocio": perguntas("02-perguntas-negocio.md", "Q"),
        "perguntasCarreira": perguntas("03-perguntas-carreira.md", "C"),
        "resultados": res,
        "extras": extras,
        "whatsapp": whatsapp(),
    }
    assert len(dados["perguntasNegocio"]) == 10 and len(dados["perguntasCarreira"]) == 5
    destino = RAIZ / "app" / "quiz-data.js"
    destino.write_text("// GERADO por app/build.py — não edite à mão. Edite copy/ e logica/ e rode o build.\n"
                       "window.QUIZ = " + json.dumps(dados, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"ok: {destino.name} — 10 + 5 perguntas, {len(res)} resultados, extras: {list(extras)}")
