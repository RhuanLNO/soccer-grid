"use client";

import SquareGrid from "@/components/SquareGrid";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import TeamSelectModal from "@/components/TeamSelectModal";
import { useApi } from "@/hooks/apiHook";

export default function Home() {
  const { api } = useApi();

  console.log(api);
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-slate-200 bg-background px-4 md:px-6 justify-center">
        <nav className="flex gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Trophy className="h-6 w-6" />
            <span className="sr-only">Soccer Grid</span>
          </Link>
          <p className="text-2xl">Soccer Grid</p>
        </nav>
      </header>
      <Dialog>
        <div className="flex flex-col md:mr-32 place-items-center">
          <div className="flex flex-row">
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4" />
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4">
              Tip
            </div>
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4">
              Tip
            </div>
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4">
              Tip
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="size-24 md:size-40 text-center content-center">
                Tip
              </div>
              <div className="size-24 md:size-40 text-center content-center">
                Tip
              </div>
              <div className="size-24 md:size-40 text-center content-center">
                Tip
              </div>
            </div>
            <div className="border border-slate-200">
              <div className="flex flex-row border-b border-slate-200">
                <SquareGrid img="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" />
                <SquareGrid />
                <SquareGrid />
              </div>
              <div className="flex flex-row border-b border-slate-200">
                <SquareGrid img="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png" />
                <SquareGrid />
                <SquareGrid />
              </div>
              <div className="flex flex-row">
                <SquareGrid />
                <SquareGrid />
                <SquareGrid />
              </div>
            </div>
          </div>
        </div>
        <TeamSelectModal />
      </Dialog>
    </main>
  );
}
