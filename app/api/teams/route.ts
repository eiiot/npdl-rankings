import { TeamProps } from "@/components/Team";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    "https://opensheet.elk.sh/1LVE1VehEpm9hL2flv3NK4fboXm-NlbbC1vidaG6wnCg/team"
  );

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

  return NextResponse.json(teams);
}
