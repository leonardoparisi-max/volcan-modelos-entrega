// Vercel serverless function — grava o lead no Notion "Applications"
// (DB compartilhado por todos os Lead Magnets da Volcan).
// Env necessárias: NOTION_API_KEY, NOTION_DATABASE_ID.
// Só grave propriedades que existem no DB "Applications" — uma inexistente faz o Notion recusar tudo.
// Sem dependências: usa a REST API do Notion via fetch (Node 18+ na Vercel).
// Falha aqui nunca trava a pessoa — o front libera a entrega de qualquer forma.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};

  const s = (v) => (typeof v === "string" ? v.trim() : "");
  const nome = s(b.name || b.nome);
  const email = s(b.email);
  const telefone = s(b.phone || b.telefone);
  const empresa = s(b.business || b.empresa);
  const market = b.market === "EN" ? "EN" : "BR";
  const marketLabel = market === "EN" ? "🇺🇸 EN" : "🇧🇷 BR";

  if (!nome || !email || !telefone || !empresa) {
    return res.status(400).json({ ok: false, error: "name, email, phone and business are required." });
  }

  const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return res.status(503).json({ ok: false, error: "Notion not configured." });
  }

  const properties = {
    Name: { title: [{ text: { content: nome } }] },
    Email: { email },
    Phone: { phone_number: telefone },
    Company: { rich_text: [{ text: { content: empresa } }] },
    "Lead Magnet": { select: { name: "Modelos de Entrega" } },
    Market: { select: { name: marketLabel } },
  };

  try {
    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + NOTION_API_KEY,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parent: { database_id: NOTION_DATABASE_ID }, properties }),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error("[lead] Notion", r.status, t);
      return res.status(502).json({ ok: false, error: "Notion write failed." });
    }
    return res.status(200).json({ ok: true, stored: true });
  } catch (err) {
    console.error("[lead]", err);
    return res.status(502).json({ ok: false, error: "Notion write failed." });
  }
}
