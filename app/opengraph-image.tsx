import { TeamProps } from "@/components/Team";
import { ImageResponse } from "next/server";
import { checkEnvironment } from "@/scripts/checkEnvironment";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function og() {
  const inter500 = fetch(
    new URL(
      `../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`,
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const inter700 = fetch(
    new URL(
      `../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff`,
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const res = await fetch(checkEnvironment().concat('/api/teams'));

  const teams = await res.json() as TeamProps[];

  // get top 5 teams

  return new ImageResponse(
    (
      <div tw="flex flex-row p-8">
        <div tw="w-1/3 flex flex-col">
          <h1 tw="text-5xl font-[700]">NPDL Rankings</h1>
          <span>Created by Eliot Hertenstein</span>
          <p>
            Image updated {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div tw="w-2/3 flex flex-row flex-wrap pt-2">
          {
            teams.map((team, index: number) => (
              <div tw="flex flex-row mb-2 mr-2" key={index}>
                <span tw="text-zinc-400 mr-2">{team.rank}</span>
                <span>{team.partner1}/{team.partner2}</span>
              </div>
            ))
          }
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter 500",
          data: await inter500,
        },
        {
          name: "Inter 700",
          data: await inter700,
        }
      ],
    }
  );
}