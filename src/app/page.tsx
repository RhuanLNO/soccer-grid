"use client"

import SquareGrid from "@/components/SquareGrid";
import { Trophy } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
} from "@/components/ui/dialog";
import TeamSelectModal from "@/components/TeamSelectModal";
import { useState, useEffect } from "react";
import { getTodayGrid } from "@/requests/requests";

type PuzzleGrid = {
  active_on: string,
  grid_columns: number,
  grid_numbers: number,
  grid_rows: number,
  id: number
}

export default function Home() {
  const [todayGrid, setTodayGrid] = useState<PuzzleGrid>();

  const fetchTodayGrid = async () => {
    //Implementar loading (manual ou SWR)
    const data = await getTodayGrid();
    if (!data.status) {
      setTodayGrid(data);
    };
  };

  useEffect(() => {
    fetchTodayGrid();
  }, []);

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
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4">Tip</div>
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4">Tip</div>
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4">Tip</div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="size-24 md:size-40 text-center content-center">Tip</div>
              <div className="size-24 md:size-40 text-center content-center">Tip</div>
              <div className="size-24 md:size-40 text-center content-center">Tip</div>
            </div>
            <div className="border border-slate-200">
              {todayGrid && Array.from({ length: todayGrid.grid_rows }).map((_item, index, { length }) => (
                <div className={`flex flex-row ${length - 1 !== index ? 'border-b border-slate-200' : '' }`} key={index}>
                  {Array.from({ length: todayGrid.grid_columns }).map((_item, index) => (
                    <SquareGrid key={index} />
                  ))
                  }
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <TeamSelectModal />
      </Dialog>
    </main>
  );
}
