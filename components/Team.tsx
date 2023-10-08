import clsx from "clsx";
import { useState } from "react";

export interface TeamProps {
  rank: string | number;
  ogRank: string | number;
  school: string;
  partner1: string;
  partner2: string;
  points: number | string;
  uniqueTeamPoints: string;
  region: string;
  topFive: number[];
  originalTopFive?: number[];
  edited?: boolean;
  setTeams: React.Dispatch<React.SetStateAction<TeamProps[]>>;
}


export const calcTotalPoints = (arr: number[]) => {
  let sortedArray = arr.sort((a, b) => b > a ? 1 : -1)
  return Math.round(
    (sortedArray[0] + (0.9 * sortedArray[1]) + (0.6 * sortedArray[2]) + (0.3 * sortedArray[3]) + (0.1 * sortedArray[4])) * 100
  ) / 100
}

const Team = ({
  rank,
  ogRank,
  school,
  partner1,
  partner2,
  points,
  // uniqueTeamPoints,
  // region,
  topFive,
  edited,
  setTeams,
}: TeamProps) => {

  const adjustTopFive = () => {
    const string = topFive.join(' / ')
    let updated = prompt('Enter new top 5', string)
    if (updated) {
      let newTopFive = updated.split(' / ').map((num) => parseInt(num))

      // make sure it's an array of numbers. Allow users to add new numbers to the end of the array
      console.log(newTopFive)
      const isValid = newTopFive.every((num) => !isNaN(num))

      if (!isValid) {
        alert('Invalid input')
        return
      }

      setTeams((prev) => {
        const index = prev.findIndex((team) => team.partner1 === partner1 && team.partner2 === partner2 && team.school === school)
        const newTeams = [...prev]

        const team = newTeams[index]

        if (!edited) {
          team.originalTopFive = topFive
          team.edited = true
        } else {
          // @ts-ignore
          if (newTopFive.every((num, index) => num === team.originalTopFive[index])) {
            team.edited = false
          } else {
            team.edited = true
          }
        }

        newTeams[index].topFive = newTopFive.sort((a, b) => b > a ? 1 : -1)
        newTeams[index].points = calcTotalPoints(newTopFive).toString()

        newTeams.sort((a, b) => calcTotalPoints(b.topFive) - calcTotalPoints(a.topFive))

        return newTeams
      })
    }
  }

  return (
    <div className="flex flex-col space-y-1 w-full justify-start">
      <div className="flex flex-row space-x-1">
        <span className="flex flex-col-reverse sm:flex-row sm:space-x-1">
          <span className="text-sm sm:text-base text-zinc-400 dark:text-zinc-600">{school}</span>
          <span>
            {partner1}/{partner2}
          </span>
        </span>
        <span className="text-zinc-400 dark:text-zinc-600 !ml-auto pl-2">{points} / {edited ? `${rank} [${ogRank}]` : rank}</span>
      </div>
      <div className="flex flex-row space-x-1 cursor-pointer" onClick={() => adjustTopFive()}>
        {topFive
          .sort((a, b) => b > a ? 1 : -1)
          .map((points, index) => (
            <span className={edited ? "text-green-400 dark:text-green-600" : "text-zinc-400 dark:text-zinc-600"} key={index}>
              {index === 0 ? '' : ' / '}{points}
            </span>
          ))}
        {edited ? <button className="text-zinc-400 dark:text-zinc-600"
          onClick={(e) => {
            e.stopPropagation()
            setTeams((prev) => {
              const index = prev.findIndex((team) => team.partner1 === partner1 && team.partner2 === partner2 && team.school === school)
              const newTeams = [...prev]

              const team = newTeams[index]

              team.topFive = team.originalTopFive as number[]
              team.points = calcTotalPoints(team.originalTopFive as number[]).toString()
              team.edited = false

              return newTeams
            })
          }}
        >R</button> : null}
      </div>
    </div>
  );
};

export default Team;
