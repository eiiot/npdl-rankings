import Base from '@/components/Base'
import { checkEnvironment } from '@/scripts/checkEnvironment';

export default async function Home() {
  const teamsRes = await fetch(checkEnvironment().concat('/api/teams'), {
    next: {
      revalidate: 60
    }
  });

  const teams = teamsRes.ok ? await teamsRes.json() : [];

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 px-4 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">NPDL Rankings</h1>
      <p className='text-sm mb-4 text-center'>
        Data from the official <a className="underline" href="https://docs.google.com/spreadsheets/d/1LVE1VehEpm9hL2flv3NK4fboXm-NlbbC1vidaG6wnCg/edit#gid=510724239">NPDL Spreadsheet</a>. <br className='sm:hidden' />Created by <a className="underline" href="https://eliothertenstein.com">Eliot Hertenstein</a>.
      </p>
      <Base teams={teams} />
    </main>
  )
}
