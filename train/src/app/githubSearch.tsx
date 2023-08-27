"use client";
import { useEffect, useState } from "react";
import useGithubSearch from "./useGithubSearch";
import Results from "./results";
import SearchHistory from "./searchHistory";
import type { Item } from "./types";

export default function GitHubSearch() {
  const [searchHistory, setSearchHistory] = useState<[string, boolean, Date][]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByStars, setSortByStars] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { isLoading, error, data } = useGithubSearch(searchTerm, {
    enabled: searchTerm.length > 3,
    sortByStars,
  });
  const isRateLimitExceeded = data?.message?.includes(
    "API rate limit exceeded"
  );

  const languagesInResults = [
    ...new Set(data?.items?.map((item: Item) => item.language)),
  ].filter((o) => o) as string[];

  const results = (
    selectedLanguage
      ? data?.items?.filter((item: Item) => item.language === selectedLanguage)
      : data?.items
  ) as Item[];

  // Add each search to a list of searches, to power the history navigation.
  useEffect(() => {
    const mostRecentDate = searchHistory.slice(-1)[0]?.[2];
    if (mostRecentDate?.getTime() + 2000 > Date.now()) {
      searchHistory.pop(); // Remove a previous search that was very recent.
    }
    setSearchHistory([...searchHistory, [searchTerm, sortByStars, new Date()]]);
  }, [searchTerm, sortByStars]);

  if (error && error instanceof Error) {
    return "Something went wrong with the Github API:" + error.message;
  }

  return (
    <div>
      <h2>This is my very special NS app</h2>
      <div className="inputs">
        <div className="searching">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {!isRateLimitExceeded && data && (
            <>
              <label>
                Sort by:
                <select
                  value={sortByStars ? "stars" : "forks"}
                  onChange={(e) => setSortByStars(e.target.value === "stars")}
                >
                  <option value="stars">Stars</option>
                  <option value="forks">Forks</option>
                </select>
              </label>
              <label>
                Filter by language:
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="">All</option>
                  {languagesInResults.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>
        <SearchHistory
          searchHistory={searchHistory}
          setSearchTerm={setSearchTerm}
          setSortByStars={setSortByStars}
        />
      </div>

      {isLoading && <span>Loading data...</span>}
      {isRateLimitExceeded && (
        <div className="rate-limit-exceeded">
          <div>
            <h2>Github rate limit exceeded</h2>
            <p>Please reload and try again in a minute.</p>
          </div>
        </div>
      )}
      {!isRateLimitExceeded && data && (
        <p className="number-of-results">
          {selectedLanguage
            ? `Only showing repos written in  ${selectedLanguage}. Showing fewer than 30 results.`
            : "Showing the first 30 results written in any language"}
        </p>
      )}

      <Results items={results} />
    </div>
  );
}
