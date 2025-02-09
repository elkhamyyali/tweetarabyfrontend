"use client";
import React from "react";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/providers/redux-provider";
import { NextUIProvider } from "@nextui-org/react";
import Sidebar from "@/components/SideBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.className} 
          flex 
          h-screen 
          overflow-hidden
        `}
      >
        <ReduxProvider
          username={process.env.NEXT_PUBLIC_API_USERNAME || ""}
          password={process.env.NEXT_PUBLIC_API_PASSWORD || ""}
        >
          <Sidebar />

          <main
            className="
              flex-1 
              overflow-y-auto 
              bg-white 
              p-6 
              md:p-8 
              lg:p-10
              mt-8 md:mt-0 
            "
          >
            <NextUIProvider>
              <div
                className="
                  max-w-7xl 
                  mx-auto 
                  w-full 
                  h-full
                "
              >
                {children}
              </div>
            </NextUIProvider>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
