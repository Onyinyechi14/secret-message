import { notFound } from "next/navigation";
import SendSecretMessageForm from "@/components/SendSecretMessageForm";
import { connectDB } from "@/lib/db";
import SecretLink from "@/models/SecretLink";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MessagePage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const secretLink = await SecretLink.findOne({ shareId: id }).lean();

  if (!secretLink) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(74,222,128,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-6 py-12">
      <section className="mx-auto max-w-3xl">
        <SendSecretMessageForm shareId={id} />
      </section>
    </main>
  );
}
