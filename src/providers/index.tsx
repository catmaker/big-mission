"use client";

import { useEffect } from "react";
import QueryProviders from "./query-provider";
import { ToastProvider } from "./toast-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { setupGlobalErrorHandlers } from "@/lib/error/global-error-handler";
import Header from "@/components/header";
import Footer from "@/components/footer";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  return (
    <QueryProviders>
      <ToastProvider>
        <ErrorBoundary>
          <Header className="shrink-0" />
          <main className="flex-grow">{children}</main>
          <Footer className="shrink-0" />
        </ErrorBoundary>
      </ToastProvider>
    </QueryProviders>
  );
}