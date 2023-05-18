import './globals.css'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NPDL Rankings',
  description: 'A very simple website to view current NPDL rankings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "dark:bg-black dark:text-white")}>{children}</body>
    </html>
  )
}