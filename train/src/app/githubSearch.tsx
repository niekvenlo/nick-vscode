"use client";
import { useState } from "react";
import useGithubSearch from "./useGithubSearch";
import ResultTopics from "./resultTopics";
import ResultName from "./resultName";
import type { Item } from "./types";

export default function GitHubSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, data } = useGithubSearch(searchTerm, {
    enabled: searchTerm.length > 3,
    sort: "stars",
  });

  if (error && error instanceof Error) {
    return "Something went wrong with the Github API:" + error.message;
  }

  console.log(data?.items?.[0]);

  return (
    <div>
      <h2>This is my very special NS app</h2>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? <span>Loading data...</span> : null}
      {data?.message ? "Rate limit exceeded" : null}
      <Results items={data?.items} />
    </div>
  );
}

function Results({ items }: { items: Item[] }) {
  if (items === undefined) {
    return null;
  }
  const { format } = new Intl.NumberFormat();
  return (
    <table className="results">
      <thead>
        <tr>
          <td>Name</td>
          <td>Language</td>
          <td>Topics</td>
          <td>Number of forks</td>
          <td>Starred by</td>
        </tr>
      </thead>
      <tbody>
        {items.map((item: Item) => (
          <tr key={item.full_name}>
            <td>
              <ResultName item={item} />
            </td>
            <td>{item.language}</td>
            <td>
              <ResultTopics topics={item.topics} />
            </td>
            <td align="right">{format(item.forks)}</td>
            <td align="right">{format(item.watchers_count)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
