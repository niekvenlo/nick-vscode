import { useQuery } from "react-query";

export default function useGithubSearch(
  searchString: string,
  options: { enabled: boolean; sortByStars: boolean }
) {
  return useQuery(
    ["githubSearch", searchString, options.sortByStars],
    async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          searchString
        )} in:description in:name in:readme in:topic&sort=${
          options.sortByStars ? "stars" : "forks"
        }`
      );
      return response.json();
    },
    {
      enabled: options.enabled,
      staleTime: 10 * (60 * 1000),
    }
  );
}
