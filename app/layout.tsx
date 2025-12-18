import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Provider } from "./providers/SessionProvider";
import { ToastProvider } from "./providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eze Incident Management",
  description: "Internal incident escalation and communication dashboard for tracking live incidents, updates, and post-incident reporting in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-blue-400">
      <body className={inter.className}>
        <Provider>
          <ToastProvider />
          {children}
        </Provider>
      </body>
    </html>
  );
}
