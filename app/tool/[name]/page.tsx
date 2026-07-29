import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ToolDetail } from "@/components/ToolDetail";
import { prisma } from "@/lib/prisma";
import { toToolDetailData } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const tool = await prisma.tool.findUnique({
    where: { name: decodeURIComponent(name) },
  });

  if (!tool) {
    notFound();
  }

  const data = toToolDetailData(tool);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        <Link
          href="/library"
          className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Library
        </Link>
        <p className="eyebrow text-center">
          Featured · {data.featuredDate}
        </p>
        <ToolDetail tool={data} />
      </main>
    </>
  );
}
