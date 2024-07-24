import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { ReactNode } from 'react';

import { ApiProvider } from '@/hooks/apiHook';
import { ClubsProvider } from '@/hooks/clubsHook';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soccer-Grid',
  description: 'Soccer Puzzle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApiProvider>
        <ClubsProvider>
          <body className={inter.className}>{children}</body>
        </ClubsProvider>
      </ApiProvider>
    </html>
  );
}
