import { Suspense } from "react";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { ToolDetail } from "@/components/ToolDetail";
import { getOrGenerateTodaysTool } from "@/lib/getTodaysTool";
import { toToolDetailData } from "@/lib/types";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

async function TodaysTool() {
  const tool = await getOrGenerateTodaysTool();
  const data = toToolDetailData(tool);

  return (
    <div className="space-y-6">
      <p className="eyebrow text-center">
        Tool of the Day · {data.featuredDate}
      </p>
      <ToolDetail tool={data} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <Suspense fallback={<LoadingState />}>
          <TodaysTool />
        </Suspense>
      </main>
    </>
  );
}
