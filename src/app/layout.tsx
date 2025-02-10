import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import QueryProviders from "@/providers/query-provider";
import Header from "@/components/header";
import { AuthInitializer } from "@/auth/auth-initializer";

export const metadata: Metadata = {
  title: "Bigs",
  description: "Bigs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthInitializer />
        <QueryProviders>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
