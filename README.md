# Volcan — Modelos de página de entrega / Delivery page templates

Modelos gratuitos de página de entrega de lead magnet. Pegue uma pasta, troque o
conteúdo pelo seu e publique.

Free lead magnet delivery page templates. Take a folder, swap the content for
yours and publish.

## Estrutura / Structure

| Pasta | O que é |
|---|---|
| `pt/` | Página em português — publicada em `modelos.volcangrowthtech.com.br` |
| `en/` | English page — published at `models.volcangrowthtech.com.br` |
| `pt/modelos/{ferramenta,material,video}/` | Os três modelos em português |
| `en/models/{tool,material,video}/` | The three templates in English |

Cada pasta de modelo é autocontida: `index.html` + `style.css` (+ `assets/` no
modelo de vídeo). Abra o `index.html` no navegador e já funciona — sem build,
sem dependência.

Each template folder is self-contained: `index.html` + `style.css` (+ `assets/`
for the video one). Open `index.html` in a browser and it works — no build, no
dependencies.

## Como adaptar / How to adapt

1. Copie a pasta do modelo que combina com a sua isca.
2. Troque o recurso, a instrução de uso, o resultado e o próximo passo.
3. Publique onde quiser (Vercel, Netlify, GitHub Pages, seu servidor).

Na página há um prompt pronto para a IA fazer a adaptação com você.
The live page includes a ready-made prompt so an AI can do the adaptation with you.

## Captura de leads / Lead capture

`pt/api/lead.js` e `en/api/lead.js` são funções serverless da Vercel que gravam
o lead no Notion. Precisam de `NOTION_API_KEY` e `NOTION_DATABASE_ID`. Se não
estiverem configuradas, a página libera a entrega do mesmo jeito — a entrega
nunca fica refém do backend.

These are Vercel serverless functions that write the lead to Notion. They need
`NOTION_API_KEY` and `NOTION_DATABASE_ID`. Without them the page still unlocks
the delivery — the delivery is never held hostage by the backend.

---

Volcan Growth Tech · [Volcan Lab](https://ferramentas.volcangrowthtech.com.br)
