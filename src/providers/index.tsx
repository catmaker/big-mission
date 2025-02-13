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
          <div className="flex flex-col h-screen">
            <Header className="shrink-0" />
            <main className="flex-grow overflow-y-auto">{children}</main>
          </div>
          <Footer className="shrink-0" />
        </ErrorBoundary>
      </ToastProvider>
    </QueryProviders>
  );
}
