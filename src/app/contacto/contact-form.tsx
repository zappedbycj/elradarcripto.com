"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      type: (form.elements.namedItem("type") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-6 text-center">
        <p className="text-sm text-accent font-medium">Mensaje enviado</p>
        <p className="text-xs text-text-tertiary mt-1">
          Te responderemos lo antes posible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-border-subtle bg-surface-alt px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs text-text-tertiary mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs text-text-tertiary mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-xs text-text-tertiary mb-1">
          Tipo de consulta
        </label>
        <select
          id="type"
          name="type"
          required
          className={inputClass}
        >
          <option value="">Seleccionar...</option>
          <option value="correccion">Corrección de artículo</option>
          <option value="editorial">Consulta editorial</option>
          <option value="colaboracion">Colaboración</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-text-tertiary mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">
          Error al enviar. Intenta de nuevo o escríbenos en X.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-accent py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
