import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/providers/query-provider";
import "@/styles/globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance",
  icons: { icon: "/icon.svg" },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ClerkProvider>
      <html>
        <body className={font.className}>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
