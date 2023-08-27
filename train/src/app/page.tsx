"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import GitHubSearch from "./githubSearch";

const queryClient = new QueryClient();

export default function ReactQueryWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubSearch />
    </QueryClientProvider>
  );
}
