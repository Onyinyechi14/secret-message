"use client";

import { useState } from "react";
import CopyLink from "./CopyLink";
import Loader from "./Loader";

type LinkPayload = {
  shareLink: string;
  inboxLink: string;
};

export default function CreateMessageForm() {
  const [links, setLinks] = useState<LinkPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateLink = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok || !data.shareId || !data.inboxId) {
        throw new Error(data.error || "Failed to create secret link");
      }

      setLinks({
        shareLink: `${window.location.origin}/message/${data.shareId}`,
        inboxLink: `${window.location.origin}/inbox/${data.inboxId}`,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create secret link",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-14">
      <div className="overflow-hidden rounded-[32px] border border-rose-200/80 bg-white/90 shadow-[0_24px_80px_rgba(190,24,93,0.12)] backdrop-blur">
        <div className="bg-[linear-gradient(135deg,_#be185d_0%,_#fb7185_55%,_#fdba74_100%)] px-8 py-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-50/90">
            Secret Message
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight">
            Create a beautiful anonymous messages.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-rose-50/90">
            Generate your personal secret link, share it anywhere, and keep a
            separate private inbox link just for yourself.
          </p>
        </div>

        <div className="grid gap-8 px-8 py-8 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="rounded-[24px] border border-rose-100 bg-rose-50/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-700">
                How it works
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <p>1. Create your secret link in one click.</p>
                <p>2. Share the public link with friends or followers.</p>
                <p>3. Open your private inbox link to read incoming messages.</p>
              </div>
            </div>

            <button
              onClick={handleCreateLink}
              disabled={loading}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,_#be185d_0%,_#f43f5e_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating your links..." : "Create Secret Link"}
            </button>

            {loading && (
              <div className="mt-6">
                <Loader />
              </div>
            )}

            {error && (
              <p className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            )}

            {links && (
              <div className="mt-8 space-y-5">
                <div className="rounded-[24px] border border-orange-100 bg-orange-50/70 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Share this link
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Send this to people so they can write you a secret message.
                  </p>
                  <div className="mt-4">
                    <CopyLink link={links.shareLink} />
                  </div>
                </div>

                <div className="rounded-[24px] border border-sky-100 bg-sky-50/80 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Your private inbox
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Keep this safe. It opens your inbox.
                  </p>
                  <div className="mt-4">
                    <CopyLink link={links.inboxLink} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Why people use it
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-sm font-semibold">For creators</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Share one link in your bio and collect honest anonymous notes.
                </p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-sm font-semibold">For friends</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Give people a safe way to send kind words, feedback, or secrets.
                </p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-sm font-semibold">For you</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  You control the inbox link while everyone else only sees the
                  public send page.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
