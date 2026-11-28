const LIST_ID = "bab0a82a-18a7-11f1-beac-2708e717015f";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: "Mailing-list signup is not configured yet." });
  }

  const { email, name, neighbourhood, organisation } = request.body || {};
  if (!email || !name || !neighbourhood) {
    return response.status(400).json({ error: "Please complete your name, email and neighbourhood." });
  }

  const upstream = await fetch(`https://api.emailoctopus.com/lists/${LIST_ID}/contacts`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email_address: String(email).trim().toLowerCase(),
      fields: {
        FirstName: String(name).trim(),
        Organisation: String(organisation || "").trim(),
        Notes: `Neighbourhood: ${String(neighbourhood).trim()}`
      },
      status: "subscribed"
    })
  });

  if (!upstream.ok) {
    const details = await upstream.json().catch(() => ({}));
    console.error("EmailOctopus signup failed", upstream.status, details.title || details.detail || "Unknown error");
    return response.status(502).json({ error: "We could not add you right now. Please try again shortly." });
  }

  return response.status(200).json({ ok: true });
}
