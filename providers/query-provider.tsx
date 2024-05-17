"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

interface ProvidersProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: ProvidersProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
