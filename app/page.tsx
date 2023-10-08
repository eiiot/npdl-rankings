import Base from '@/components/Base'
import { TeamProps } from '@/components/Team';
import Link from 'next/link';

export default async function Home() {
  const res = await fetch(
    "https://opensheet.elk.sh/1PPA7iMBO-EHl5SSuW_61iS0baX0tSd5Yr-CRzRfCc3M/team"
    , {
      next: {
        revalidate: 300,
      }
    });

  const data = await res.json();

  const teams: TeamProps[] = data.map((team: any) => {
    return {
      rank: team["Rank"],
      school: team["School"],
      partner1: team["Debater 1"],
      partner2: team["Debater 2"],
      points: team["Points"],
      uniqueTeamPoints: team["Unique Points"],
      region: team["Region"],
      topFive: [+team["1st"], +team["2nd"], +team["3rd"], +team["4th"], +team["5th"]],
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 px-4 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">NPDL Rankings</h1>
      <p className='text-sm mb-4 text-center'>
        Data from the official <a className="underline" href="https://docs.google.com/spreadsheets/d/1PPA7iMBO-EHl5SSuW_61iS0baX0tSd5Yr-CRzRfCc3M/edit">NPDL Spreadsheet</a>. <br />Created by <a className="underline" href="https://eliothertenstein.com">Eliot Hertenstein</a>. <Link className="underline" href="/2022">2022 Rankings</Link>.
      </p>
      <Base teams={teams} />
    </main>
  )
}
