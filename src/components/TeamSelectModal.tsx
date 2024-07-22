"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useClubs } from "@/hooks/clubsHook";
import { Club } from "@/types/clubTypes";

const TeamSelectModal = () => {
  const { clubs } = useClubs();

  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState<Club[]>([]);

  const filterClubArray = useCallback(() => {
    if (value.length >= 3) {
      const filteredClubs = clubs.filter((club: Club) => {
        const splitName = club.name.substring(0, 3);
        return splitName.toLowerCase().includes(value);
      });
      setSearchResult(filteredClubs);
      return;
    }
    setSearchResult([]);
  }, [value, clubs]);

  useEffect(() => {
    filterClubArray();
  }, [filterClubArray]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle />
        <Command className="rounded-lg border shadow-md !mt-5">
          <CommandInput
            placeholder="Type a command or search..."
            value={value}
            onValueChange={(e) => setValue(e)}
          />
          <CommandList>
            {searchResult &&
              searchResult.map((team, index) => (
                <div
                  key={index}
                  className="flex justify-between py-1.5 px-2 items-center"
                >
                  <span>{team.name}</span>
                  <Button onClick={() => setValue(team.name)}>Guess</Button>
                </div>
              ))}
          </CommandList>
        </Command>
      </DialogHeader>
    </DialogContent>
  );
};

export default TeamSelectModal;
