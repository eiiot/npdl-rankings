export interface TeamProps {
  rank: string;
  school: string;
  partner1: string;
  partner2: string;
  points: string;
  uniqueTeamPoints: string;
  region: string;
}

const Team = ({
  rank,
  school,
  partner1,
  partner2,
  points,
  uniqueTeamPoints,
  region,
}: TeamProps) => {
  return (
    <div className="flex flex-row space-x-1 w-full justify-start">
      <span className="flex flex-col-reverse sm:flex-row sm:space-x-1">
        <span className="text-sm sm:text-base text-zinc-400 dark:text-zinc-600">{school}</span>
        <span>
          {partner1}/{partner2}
        </span>
      </span>
      <span className="text-zinc-400 dark:text-zinc-600 !ml-auto pl-2">{points} / {rank}</span>
    </div>
  );
};

export default Team;
