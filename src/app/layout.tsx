import Header from '@/components/Header'
import { Providers } from './providers'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='light'>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
