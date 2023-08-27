import type { Item } from "./types";

export default function ResultName({ item }: { item: Item }) {
  const pieces = item.full_name.split("/");
  return (
    <a className="name" href={item.url} target="_blank">
      <img className="avatar" src={item.owner.avatar_url} width="20" />
      <span className="start">{pieces.slice(0, -1).join("/")}/</span>
      <span className="end">{pieces.slice(-1)}</span>
    </a>
  );
}
