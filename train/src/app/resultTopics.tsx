/** Generate a random but consistent colour based on a string */
function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, 50%, 85%`;
}

export default function Topics({ topics }: { topics: string[] }) {
  if (topics.length < 1) {
    return <span className="no-topic">none</span>;
  }
  return topics.map((topic) => (
    <span
      key={topic}
      className="topic-pill"
      style={{ background: stringToColor(topic) }}
    >
      {topic}
    </span>
  ));
}
