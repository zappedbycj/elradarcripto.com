import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, type, message } = await request.json();

    if (!name || !email || !type || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // TODO: Wire to Telegram Bot API
    // const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    // const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    // await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     chat_id: TELEGRAM_CHAT_ID,
    //     text: `📩 Contacto Radar Cripto\n\nNombre: ${name}\nEmail: ${email}\nTipo: ${type}\nMensaje: ${message}`,
    //     parse_mode: "HTML",
    //   }),
    // });

    console.log("[Contact]", { name, email, type, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
