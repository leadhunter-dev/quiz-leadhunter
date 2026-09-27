"""Confere se o site (app/motor.js) dá o mesmo resultado que o motor.py.

Uso (na raiz do repositório):  python3 logica/teste-paridade.py
Precisa de Node.js. Testa todas as combinações da Trilha Carreira e uma amostra
fixa (semente 42) de 50.000 combinações da Trilha Negócio.
"""
import itertools, json, pathlib, random, subprocess, sys

AQUI = pathlib.Path(__file__).parent
sys.path.insert(0, str(AQUI))
import motor  # noqa: E402

APP = AQUI.parent / "app"
AMOSTRA_NEGOCIO = 50_000


def combinacoes(perguntas):
    ids = [p["id"] for p in perguntas]
    letras = [sorted(p["opcoes"]) for p in perguntas]
    return ids, letras


def casos():
    ids_c, letras_c = combinacoes(motor.CFG["perguntas_carreira"])
    carreira = [dict(zip(ids_c, combo)) for combo in itertools.product(*letras_c)]
    ids_n, letras_n = combinacoes(motor.CFG["perguntas_negocio"])
    rnd = random.Random(42)
    negocio = [dict(zip(ids_n, (rnd.choice(l) for l in letras_n))) for _ in range(AMOSTRA_NEGOCIO)]
    return carreira, negocio


JS = """
global.window = global;
const fs = require("fs");
eval(fs.readFileSync(process.argv[1] + "/quiz-data.js", "utf8"));
eval(fs.readFileSync(process.argv[1] + "/motor.js", "utf8"));
const { carreira, negocio } = JSON.parse(fs.readFileSync(0, "utf8"));
const out = {
  carreira: carreira.map((r) => calcularCarreira(r).resultado),
  negocio: negocio.map((r) => { const x = calcularNegocio(r); return [x.resultado, x.temperatura, x.autoridade]; }),
};
process.stdout.write(JSON.stringify(out));
"""

if __name__ == "__main__":
    carreira, negocio = casos()
    proc = subprocess.run(["node", "-e", JS, str(APP)], input=json.dumps({"carreira": carreira, "negocio": negocio}),
                          capture_output=True, text=True, check=True)
    js = json.loads(proc.stdout)
    falhas = 0
    for r, res_js in zip(carreira, js["carreira"]):
        if motor.calcular_carreira(r)["resultado"] != res_js:
            falhas += 1
            print("CARREIRA diverge:", r)
    for r, res_js in zip(negocio, js["negocio"]):
        py = motor.calcular_negocio(r)
        if [py["resultado"], py["temperatura"], py["autoridade"]] != res_js:
            falhas += 1
            if falhas <= 10:
                print("NEGÓCIO diverge:", r, py["resultado"], res_js)
    print(f"Carreira: {len(carreira)} combinações · Negócio: {len(negocio)} combinações · Falhas: {falhas}")
    sys.exit(1 if falhas else 0)
