"use client";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import TanStackProvider from "@/provider/TanStackProvider";
import { RecoilRoot } from 'recoil';
import ClientProvider from '@/components/ClientProvider';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <TanStackProvider>
            <ClientProvider>
              {children}
            </ClientProvider>
          </TanStackProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
