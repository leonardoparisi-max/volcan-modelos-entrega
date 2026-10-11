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

O proxy da Cloudflare precisa ficar **desligado**, senão a Vercel não consegue
emitir o certificado.

Conferir depois de propagar:

```bash
vercel domains inspect modelos.volcangrowthtech.com.br
```

## Captura de leads

O formulário grava no Notion via `api/lead.js`, usando o mesmo banco
"Applications" dos outros lead magnets. **Faltam as variáveis nos dois projetos
novos** — hoje a API devolve 503 e a página libera a entrega mesmo assim.

Rode em `pt/` e depois em `en/` (a CLI pede o valor, nada passa por chat):

```bash
vercel env add NOTION_API_KEY production
```

```bash
vercel env add NOTION_DATABASE_ID production
```

Os valores são os mesmos já configurados em `volcan-lead-scorecard`. Depois de
adicionar, rode `vercel deploy --prod --yes` de novo para a função pegar as
variáveis.

## Ainda pendente

- Gravar o vídeo "Como usar" (hoje o bloco está marcado como pendente na página).
- Card nos dois Lab Hubs apontando para as duas páginas.
