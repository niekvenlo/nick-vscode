import ResultTopics from "./resultTopics";
import ResultName from "./resultName";
import type { Item } from "./types";

export default function Results({ items }: { items: Item[] }) {
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
            <td>
              {item.language ?? <span className="no-language">unknown</span>}
            </td>
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
