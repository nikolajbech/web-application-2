import '@/styles/globals.css'

import { Inter } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Web Application', 'Template'],
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  )
}
