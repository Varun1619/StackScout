import { Header } from "@/components/Header";
import { LibraryGrid } from "@/components/LibraryGrid";
import { prisma } from "@/lib/prisma";
import { toLibraryCardData } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const tools = await prisma.tool.findMany({
    orderBy: { discoveredAt: "desc" },
  });
  const cards = tools.map(toLibraryCardData);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <p className="eyebrow mb-2">Archive</p>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Library
          </h1>
          <p className="text-muted-foreground mt-1">
            Every tool StackScout has ever surfaced, browsable by category.
          </p>
        </div>
        <LibraryGrid tools={cards} />
      </main>
    </>
  );
}
