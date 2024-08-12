import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScreenSize from "@/components/dev/ScreenSize";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playground V0",
  description: "make your ideas come to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <ScreenSize />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
