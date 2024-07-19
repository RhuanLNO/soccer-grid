"use client"

import SquareGrid from "@/components/GridCell";
import { Trophy } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
} from "@/components/ui/dialog";
import TeamSelectModal from "@/components/TeamSelectModal";
import { useState, useEffect } from "react";
import { getTodayGrid } from "@/requests/requests";

export type GridTips = {
  id: number,
  i: number,
  j: number,
  description: string
};

export type PuzzleGrid = {
  active_on: string,
  grid_columns: number,
  grid_numbers: number,
  grid_rows: number,
  grid_tips: Array<GridTips>
  id: number
};

export default function Home() {
  const [todayGrid, setTodayGrid] = useState<PuzzleGrid>();
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchTodayGrid = async () => {
    try {
      getTodayGrid().then((res) => {
        setTodayGrid(res.data);
        setLoading(false);
      })
    }
    catch (err) {
      console.error(err)
    }
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
        <div className="flex flex-col md:mr-32 place-items-center mt-16">
          {loading &&
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          }
          <div className="flex flex-row">
            <div className="w-24 md:w-40 h-20 text-center content-end pb-4" />
            {todayGrid?.grid_tips?.map((tip) => {
              if (tip.i !== null) {
                return (
                  <div className="w-24 md:w-40 h-20 text-center content-end pb-4" key={tip.id}>{tip.description}</div>
                )
              }
            })
            }
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col mr-3">
              {todayGrid?.grid_tips?.map((tip) => {
                if (tip.j !== null) {
                  return (
                    <div className="size-24 md:size-40 text-center content-center" key={tip.id}>{tip.description}</div>
                  )
                }
              })
              }
            </div>
            <div className="border border-slate-200">
              {todayGrid && Array.from({ length: todayGrid.grid_rows }).map((_item, index, { length }) => (
                <div className={`flex flex-row ${length - 1 !== index ? 'border-b border-slate-200' : ''}`} key={index}>
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
