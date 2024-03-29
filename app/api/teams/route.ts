import { TeamProps } from "@/components/Team";
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    "https://opensheet.elk.sh/1PPA7iMBO-EHl5SSuW_61iS0baX0tSd5Yr-CRzRfCc3M/team"
  );

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
    };
  });

  return NextResponse.json(teams);
}
