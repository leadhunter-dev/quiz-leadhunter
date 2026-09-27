# Arte dos arquétipos

## O que está no ar (v1.2)

Cada arquétipo tem um **emblema**: a "mira de caçador" (círculo azul-soft, anel tracejado, 4 marcas de mira) com um ícone de traço branco no centro. É desenhado em SVG no próprio código (`emblemaSVG` em `app/app.js`), então sai igual na página, na landing e no card de story/feed, sem arquivos de imagem.

Ícones: [Lucide](https://lucide.dev) (licença ISC, uso comercial livre), em `app/icones.js`.

| Arquétipo | Ícone |
|---|---|
| Especialista Invisível | `glasses` (óculos) |
| Caçador(a) Solitário(a) | `crosshair` (mira) |
| Maestro/Maestra | `music` |
| General sem Exército / Rainha sem Exército | `swords` / `crown` |
| Refém da Indicação | `dices` |
| Explorador(a) de Outros Mares | `compass` |
| Talento Escondido(a) | `gem` |
| Candidato(a) Fantasma | `ghost` |
| Foguete na Rampa / Estrela em Ascensão | `rocket` / `star` |
| Viajante de Rota Nova | `luggage` |

Trocar um ícone: mude `ICONE_ARQ` no `app.js` e adicione o SVG do Lucide em `app/icones.js`.

## Se quiser ilustrações com personagem (próximo passo opcional)

O layout da carta aceita trocar o emblema por uma imagem sem mudar mais nada. Caminhos:

| Caminho | Prós | Contras |
|---|---|---|
| **Gerar com IA** (Midjourney, Ideogram, Gamma, Higgsfield) usando o prompt-base abaixo | Rápido, 20 imagens com o mesmo estilo | Precisa de curadoria; mãos/rostos às vezes saem estranhos |
| **Ilustrador(a) freelancer** | Personagens próprios, consistência total, vira ativo da marca | Custo e prazo |
| **Bibliotecas livres** (Open Peeps e Humaaans — CC0; unDraw — livre, recolorível para `#3344ff`) | Grátis, na hora | Não são específicas de cada arquétipo; ficam genéricas |

### Prompt-base para IA (manter igual nas 20)

> Flat vector illustration, half-body character, [DESCRIÇÃO DO ARQUÉTIPO], holding [OBJETO-SÍMBOLO], two-color palette electric blue #3344ff and near-black #0a0d14 on white, soft light-blue #eef0ff circular background, clean geometric shapes, no gradients, no text, professional B2B editorial style, friendly but serious expression, centered, square 1:1.

Descrições sugeridas (trocar "man/woman" pela versão M/F):

- **Especialista Invisível:** a competent professional partially fading into the background, wearing glasses — objeto: a glowing briefcase
- **Caçador(a) Solitário(a):** a determined professional working alone at a laptop — objeto: a target with an arrow in the center
- **Maestro/Maestra:** a sales leader conducting — objeto: a conductor's baton, small team silhouettes behind
- **General sem Exército:** a confident executive pointing at a map, empty space behind — objeto: a strategy map
- **Rainha sem Exército:** a confident executive wearing a subtle crown pin, pointing at a map — objeto: a strategy map
- **Refém da Indicação:** a professional waiting by a phone — objeto: dice
- **Explorador(a):** a professional looking through binoculars — objeto: a compass
- **Talento Escondido(a):** a retail salesperson with a proud smile — objeto: a gem
- **Candidato(a) Fantasma:** a job seeker holding a résumé, semi-transparent outline — objeto: a stack of résumés
- **Foguete na Rampa / Estrela em Ascensão:** a young professional climbing steps — objeto: a small rocket / a star
- **Viajante de Rota Nova:** a professional with a suitcase at a crossroads sign — objeto: a suitcase

Exportar em PNG 512×512 com fundo transparente, nomear `assets/arquetipos/<CODIGO>-<m|f>.png` (ex.: `GEN-f.png`).
