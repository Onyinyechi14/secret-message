type Props = {
  message: string;
  createdAt?: string;
};

export default function MessageCard({ message, createdAt }: Props) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/85 p-5 shadow-lg shadow-slate-950/20">
      <p className="text-sm leading-7 text-slate-100 whitespace-pre-wrap break-words">
        {message}
      </p>
      {createdAt && (
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          Received {createdAt}
        </p>
      )}
    </article>
  );
}
