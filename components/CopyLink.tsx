"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  link: string;
};

export default function CopyLink({ link }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!link) return;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <input
        readOnly
        value={link}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none"
      />
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <Link
          href={link}
          target="_blank"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Open link
        </Link>
      </div>
    </div>
  );
}
