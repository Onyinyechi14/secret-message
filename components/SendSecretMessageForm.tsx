"use client";

import { useState } from "react";
import Loader from "./Loader";

type Props = {
  shareId: string;
};

export default function SendSecretMessageForm({ shareId }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/message/${shareId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setText("");
      setSuccess("Your secret message has been sent.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/30">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
        Anonymous note
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Drop your secret message here.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-slate-300">
        Write honestly. Your message will be stored for the owner of this link to
        read later in their private inbox.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
        placeholder="Write your secret message..."
        className="mt-8 w-full rounded-3xl border border-white/10 bg-slate-900 px-5 py-4 text-base text-white outline-none placeholder:text-slate-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
        className="mt-5 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send message"}
      </button>

      {loading && (
        <div className="mt-5">
          <Loader />
        </div>
      )}

      {error && <p className="mt-5 text-sm text-rose-300">{error}</p>}
      {success && <p className="mt-5 text-sm text-emerald-300">{success}</p>}
    </div>
  );
}
