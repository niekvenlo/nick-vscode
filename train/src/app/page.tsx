"use client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function ReactQueryWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Test</h1>
    </QueryClientProvider>
  );
}
