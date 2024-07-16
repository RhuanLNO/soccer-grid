"use client"

import { useState, useEffect } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import {
  Command,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"

import { getTeams } from '@/requests/requests'

type Team = {
  id: number,
  name: string,
  club_key: string
}

const TeamSelectModal = () => {

  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState<Team[]>([]);
  const [teamsArr, setTeamsArr] = useState([]);

  const fetchTeams = async () => {
    const data = await getTeams();
    if (!data.status) {
      setTeamsArr(data);
    };
  };

  useEffect(() => {
    if(teamsArr.length === 0) fetchTeams();
  }, [teamsArr]);

  useEffect(() => {
    const filterTeamArray = () => {
      if (value.length >= 3) {
        const filteredTeams = teamsArr.filter((team: Team) => {
          const splitName = team.name.substring(0, 3);
          console.log(splitName)
          return splitName.toLowerCase().includes(value);
        })

        console.log(filteredTeams)
        setSearchResult(filteredTeams);
        return
      }
      setSearchResult([]);
    };

    filterTeamArray();
  }, [value, teamsArr]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle />
        <Command className="rounded-lg border shadow-md mt-5">
          <CommandInput placeholder="Type a command or search..." value={value} onValueChange={(e) => setValue(e)} />
            <CommandList>
              {searchResult &&
                searchResult.map((team, index) => (
                  <div key={index} className='flex justify-between py-1.5 px-2 items-center'>
                    <span>{team.name}</span>
                    <Button onClick={() => setValue(team.name)}>Guess</Button>
                  </div>
                ))
              }
            </CommandList>
        </Command>
      </DialogHeader>
    </DialogContent>
  )
}

export default TeamSelectModal