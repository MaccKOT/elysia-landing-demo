import { Elysia } from "elysia";
import { readFile, writeFile } from "node:fs/promises";

// Basic sanitizer using Bun.escapeHTML + trim + length limit
const sanitize = (input: string): string => {
  if (typeof input !== "string") return "";
  // Escape HTML to prevent XSS
  const escaped = Bun.escapeHTML(input.trim());
  // Optional: strip control chars
  return escaped.replace(/[\x00-\x1F\x7F]/g, "").substring(0, 1000);
};

const app = new Elysia();

// Serve static landing
app.get("/", async () => {
  try {
    const html = await readFile("./src/index.html", "utf8");
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
});

// Handle form
app.post("/submit", async ({ body }) => {
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response("Invalid email", { status: 400 });
  }

  const entry = {
    name: sanitize(name),
    email: sanitize(email),
    subject: sanitize(subject),
    message: sanitize(message),
    timestamp: new Date().toISOString(),
  };

  // Read or init submissions
  let submissions: (typeof entry)[] = [];
  try {
    const raw = await readFile("./submissions.json", "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) submissions = parsed;
  } catch {
    // File missing or invalid → start fresh
  }

  submissions.push(entry);
  await writeFile("./submissions.json", JSON.stringify(submissions, null, 2));

  return { success: true };
});

app.listen(3000, () => {
  console.log("Server on http://localhost:3000");
});
