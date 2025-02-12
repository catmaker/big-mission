"use client";

import QueryProviders from "./query-provider";
import { ToastProvider } from "./toast-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProviders>
      <ToastProvider>
        <Header className="shrink-0" />
        <main className="flex-grow">{children}</main>
        <Footer className="shrink-0" />
      </ToastProvider>
    </QueryProviders>
  );
}
