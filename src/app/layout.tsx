"use client";
import "./globals.css";
import { Header } from "./components/global/Header";
import StoreProvider from "./StoreProvider";
import { getLSValue } from "./utils/localStorage";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(getLSValue("theme") || "light");
  }, []);

  return (
    <html lang="en" data-theme={theme}>
      <head></head>
      <body className="bg-gradient-to-br from-poker-100 via-poker-200 to-poker-300">
        <StoreProvider>
          <main className="min-h-screen [&_hr]:border-[#f2f2f2] flex text-white">
            <div className="p-4 w-full max-w-[1800px] mx-auto">
              <Header />
              <div className="mt-8 md:h-[calc(100%-80px)]">{children}</div>
            </div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
