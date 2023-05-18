import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NPDL Rankings',
  description: 'A very simple website to view current NPDL rankings.',
  icons: 'https://emojicdn.elk.sh/%F0%9F%8E%93'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="ndpl.eliot.sh" src="https://analytics.eliothertenstein.com/js/plausible.js"></script>
      </head>
      <body className={clsx(inter.className, "dark:bg-black dark:text-white")}>{children}</body>
    </html>
  )
}
