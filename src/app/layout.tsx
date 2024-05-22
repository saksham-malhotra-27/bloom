import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/system";
import NavBar from "@/components/NavBar";
import {lato} from "@/utils/fonts";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${lato.className} bg-zinc-100 `}>
      <NextUIProvider>
        <NavBar/>
        <main className="min-h-screen mx-2 md:mx-3 lg:mx-5 pt-14">
          {children}
        </main>
      </NextUIProvider>
      </body>
      </html>
  );
}
