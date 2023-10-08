import Base from '@/components/BaseDeprec'
import { TeamProps } from '@/components/TeamDeprec';
import Link from 'next/link';

export default async function Home() {
  const res = await fetch(
    "https://opensheet.elk.sh/1LVE1VehEpm9hL2flv3NK4fboXm-NlbbC1vidaG6wnCg/team"
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
      partner1: team["Partner 1"],
      partner2: team["Partner 2"],
      points: team["Points"],
      uniqueTeamPoints: team["Unique Team Points"],
      region: team["Region"],
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 px-4 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">NPDL Rankings</h1>
      <p className='text-sm mb-4 text-center'>
        Data from the official <a className="underline" href="https://docs.google.com/spreadsheets/d/1LVE1VehEpm9hL2flv3NK4fboXm-NlbbC1vidaG6wnCg/edit#gid=510724239">NPDL Spreadsheet</a>. <br />Created by <a className="underline" href="https://eliothertenstein.com">Eliot Hertenstein</a>. <Link className="underline" href="/">2023 Rankings</Link>.
      </p>
      <Base teams={teams} />
    </main>
  )
}
