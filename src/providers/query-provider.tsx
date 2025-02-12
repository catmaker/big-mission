"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useQueryErrorHandler } from "@/hooks/use-query-error-handler";

function QueryErrorBoundary() {
  useQueryErrorHandler();
  return null;
}

export default function QueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
