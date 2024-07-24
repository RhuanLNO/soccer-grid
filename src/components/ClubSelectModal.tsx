'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useClubs } from '@/hooks/clubsHook';
import { clubSearchCompare } from '@/lib/clubUtils';
import { Club } from '@/types/clubTypes';

const ClubSelectModal = () => {
  const { clubs } = useClubs();

  const [value, setValue] = useState('');
  const filteredList = useMemo(() => {
    if (value.length < 3) {
      return [];
    }

    return (
      clubs?.filter((club: Club) => {
        return clubSearchCompare(club, value);
      }) ?? []
    );
  }, [value, clubs]);
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
            {filteredList.map((team, index) => (
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

export default ClubSelectModal;
