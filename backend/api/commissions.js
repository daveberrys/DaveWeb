export async function POST(req) {
  const { selections, total, extraInfo, contact } = req.body;

  const selectionLines = Object.entries(selections)
    .map(([group, item]) => `**${group}:** ${item}`)
    .join("\n");

  const fields = [
    { name: "Selections", value: selectionLines || "*No selections*" },
    { name: "Total", value: `$${total}`, inline: true },
  ];

  if (extraInfo) {
    fields.push({ name: "Extra Info", value: extraInfo });
  }

  const embed = {
    title: "New Commission Request",
    color: 0x008BFF,
    fields,
    footer: { text: `Contact: ${contact}` },
  };

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });

  if (!response.ok) {
    throw new Error("Discord webhook failed");
  }

  return { success: true };
}
