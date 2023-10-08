'use client';

import { useState } from 'react';
import Team, { TeamProps, calcTotalPoints } from './Team';

interface BaseProps {
  teams: TeamProps[];
}

const Base = ({ teams }: BaseProps) => {
  const [filter, setFilter] = useState('');
  const [liveTeams, setLiveTeams] = useState(teams);

  const filteredTeams = liveTeams.filter(team => {
    const { partner1, partner2, school } = team;
    const filterText = filter.toLowerCase();
    return partner1.toLowerCase().includes(filterText) || partner2.toLowerCase().includes(filterText) || school.toLowerCase().includes(filterText);
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-transparent mb-4 outline-none focus:border-zinc-500 dark:focus:border-zinc-400 dark:placeholder:text-zinc-600 placeholder:text-zinc-400"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className='flex flex-col w-full space-y-2'>
        {
          filteredTeams.
            sort((a, b) => calcTotalPoints(b.topFive) - calcTotalPoints(a.topFive)).
            map((team, i) => <Team key={i} {...team}
              points={calcTotalPoints(team.topFive)}
              rank={liveTeams.indexOf(team) + 1}
              ogRank={team.rank}
              setTeams={setLiveTeams} />)
        }
      </div>
    </>
  )
}

export default Base;
