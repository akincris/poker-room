"use client";
import "./globals.css";
import { Header } from "./components/global/Header";
import StoreProvider from "./StoreProvider";
import { getLSValue } from "./utils/localStorage";
import { useEffect, useState } from "react";
import { socket } from "@/socket";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(getLSValue("theme") || "light");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    theme && (
      <html lang="en" data-theme={theme} className="fade-in">
        <head></head>
        <body className="gradient-bg">
          <StoreProvider>
            <main className="min-h-screen flex text-poker-50 [&_*]:border-poker-50">
              <div className="p-4 w-full max-w-[1800px] mx-auto">
                <Header />
                <div className="mt-8 md:h-[calc(100%-80px)]">{children}</div>
              </div>
            </main>
          </StoreProvider>
        </body>
      </html>
    )
  );
}
