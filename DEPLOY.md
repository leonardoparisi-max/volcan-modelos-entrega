# Deploy e DNS

## Repositório

https://github.com/leonardoparisi-max/volcan-modelos-entrega — **público**.
Os botões "Abrir página no GitHub" apontam para as pastas de modelo dentro dele.

## Projetos na Vercel

| Projeto | Pasta | URL atual | Domínio final |
|---|---|---|---|
| `volcan-modelos-pt` | `pt/` | https://volcan-modelos-pt.vercel.app | `modelos.volcangrowthtech.com.br` |
| `volcan-modelos-en` | `en/` | https://volcan-modelos-en.vercel.app | `models.volcangrowthtech.com.br` |

Os dois domínios já estão **adicionados aos projetos**; falta só o DNS apontar.

Para republicar depois de editar:

```bash
cd pt && vercel deploy --prod --yes     # ou cd en
```

## DNS na Cloudflare

Dois registros CNAME, no mesmo padrão dos outros subdomínios da Volcan
(`constraint.`, `cactest.`, `ferramentas.` já usam isto):

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `modelos` | `cname.vercel-dns.com` | **DNS only** (nuvem cinza) |
| CNAME | `models` | `cname.vercel-dns.com` | **DNS only** (nuvem cinza) |

**Feito em 11/10/2026.** Os dois domínios estão no ar.

O proxy da Cloudflare precisa ficar **desligado**, senão a Vercel não consegue
emitir o certificado.

Conferir depois de propagar:

```bash
vercel domains inspect modelos.volcangrowthtech.com.br
```

## Captura de leads — ligada e testada

O formulário grava no Notion via `api/lead.js`, no DB compartilhado **"Applications"**
(o mesmo dos outros lead magnets). `NOTION_API_KEY` e `NOTION_DATABASE_ID` já estão
nos dois projetos da Vercel, como `sensitive`. Testado em 11/10/2026: lead PT e EN
entraram no banco com `Lead Magnet = Modelos de Entrega` e o Market correto; as duas
linhas de teste foram apagadas.

**Cuidado ao mexer no `lead.js`:** só escreva propriedades que existem no
"Applications" (`Name`, `Email`, `Phone`, `Company`, `Lead Magnet`, `Market`).
Uma propriedade inexistente faz o Notion recusar a página inteira e o lead se perde.
Foi o que aconteceu com um campo `Notes` na primeira versão.

Se a API cair, a página **libera a entrega mesmo assim** — de propósito. A entrega
nunca fica refém do backend; o custo é perder aquele lead.

## Root Directory — não mexer

Cada projeto tem **Root Directory** apontando para a sua pasta (`pt` e `en`). Sem
isso o Vercel builda da raiz do repo e a home vira 404, com a página caindo em
`/pt/`. Já aconteceu uma vez. Se alguém recriar os projetos, configurar isso antes.

## Ainda pendente

- Gravar o vídeo "Como usar" (hoje o bloco está marcado como pendente na página).
