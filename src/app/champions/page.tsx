import { Suspense } from "react";
import ChampionsServer from "./server";
import ChampionsLoading from "./loading";

export default function ChampionsPage() {
  return (
    <section className="flex flex-col items-center p-4">
      <h3>Champions Page</h3>
      <Suspense fallback={<ChampionsLoading />}>
        <ChampionsServer />
        {/* The ChampionsServer component will handle fetching and displaying champions */}
      </Suspense>
    </section>
  );
}
