import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/toastProvider";
import { ReduxProvider } from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRUD",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}> 
      <ReduxProvider>
      <ToastProvider/>
        <div className="mx-auto max-w-2xl p-4"> 
        <Navbar/>
        <div className="mt-6">
        {children}
        </div>
        </div>
        </ReduxProvider>
        </body>
    </html>
  );
}
