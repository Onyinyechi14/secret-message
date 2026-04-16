import { notFound } from "next/navigation";
import MessageCard from "@/components/MessageCard";
import { connectDB } from "@/lib/db";
import { decryptMessage } from "@/lib/encryption";
import Message from "@/models/Message";
import SecretLink from "@/models/SecretLink";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type InboxMessage = {
  id: string;
  text: string;
  createdAt: string;
};

export default async function InboxPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const secretLink = await SecretLink.findOne({ inboxId: id }).lean();

  if (!secretLink) {
    notFound();
  }

  const messages = await Message.find({ linkId: secretLink._id })
    .sort({ createdAt: -1 })
    .lean();

  const decryptedMessages = messages.reduce<InboxMessage[]>((items, message) => {
    const decrypted = decryptMessage(message.encryptedText);

    if (!decrypted) {
      return items;
    }

    items.push({
      id: String(message._id),
      text: decrypted,
      createdAt: new Date(message.createdAt).toLocaleString(),
    });

    return items;
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-6 py-12 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
          Private inbox
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Messages sent to your secret link.
        </h1>
        <p className="mt-4 text-base text-slate-300">
          Keep this page private. Anyone with this inbox link can read your
          messages.
        </p>

        {decryptedMessages.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-slate-950/70 p-8 text-slate-300">
            No messages yet. Share your public link and new messages will appear
            here.
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {decryptedMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message.text}
                createdAt={message.createdAt}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
