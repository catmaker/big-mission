import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import QueryProviders from "@/providers/query-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <AuthInitializer />
        <QueryProviders>
          <ToastProvider>
            <Header className="shrink-0" />
            <main className="flex-grow">{children}</main>
            <Footer className="shrink-0" />
          </ToastProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
