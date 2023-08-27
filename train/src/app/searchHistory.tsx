import { useState } from "react";

export default function SearchHistory({
  searchHistory,
  setSearchTerm,
  setSortByStars,
}: {
  searchHistory: [string, boolean, Date][];
  setSearchTerm: Function;
  setSortByStars: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="history-button"
        disabled={isOpen}
        onClick={() => setIsOpen(true)}
      >
        Search history
      </button>
      <div className={isOpen ? "history-is-open" : "history-is-closed"}>
        <div className="close">
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        <h3>Select any recent search:</h3>
        {[...searchHistory.reverse()].map(
          ([searchTerm, sortByStars, timestamp]) => {
            return (
              <button
                key={timestamp.getTime()}
                onClick={() => {
                  setSearchTerm(searchTerm);
                  setSortByStars(sortByStars);
                  setIsOpen(false);
                }}
              >
                <span>{searchTerm}</span>{" "}
                <small>sorted by {sortByStars ? "stars" : "forks"}</small>{" "}
                <i>{timestamp?.toLocaleTimeString()}</i>
              </button>
            );
          }
        )}
      </div>
    </>
  );
}
