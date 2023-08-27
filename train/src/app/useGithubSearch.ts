import { useQuery } from "react-query";

export default function useGithubSearch(searchString: string, options: object) {
  return useQuery(
    ["githubSearch", searchString],
    async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchString}`
      );
      return response.json();
    },
    { ...options, staleTime: 10 * (60 * 1000) }
  );
}
