/**
 * Imports
 */
// Next
import type { Metadata } from "next";
import localFont from "next/font/local";

// Style
import "./globals.css";

// Apollo
import ApolloClientWrapper from '@/components/ApolloClientWrapper';

// Redux
import { ReduxProvider } from '@/redux/provider'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Wisely",
  description: "Budget planner app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F6F6F6] max-w-3xl my-0 mx-auto`}
      >
        <h1 className="text-3xl font-black p-4">Wisely 💰</h1>
        <ReduxProvider>
          <ApolloClientWrapper>
            {children}
          </ApolloClientWrapper> 
        </ReduxProvider>
      </body>
    </html>
  );
}
