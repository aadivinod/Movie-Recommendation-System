import { useEffect, useMemo, useState } from "react";
import { allMovies } from "../services/recommendation";
import { onWatchlist, toggleWatchlist } from "../services/dbWatchlist";

const DEMO_USER = "demo-user-1";

export default function Watchlist() {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    const unsub = onWatchlist(DEMO_USER, setIds);
    return () => unsub && unsub();
  }, []);
  const movies = useMemo(() => allMovies().filter(m => ids.includes(m.id)), [ids]);

  return (
    <div className="container">
      <h2>Your Watchlist</h2>
      <div className="grid">
        {movies.map(m => (
          <div key={m.id} className="card">
            <img src={m.poster} alt={m.title} />
            <div className="card-body">
              <h4>{m.title}</h4>
              <button className="btn secondary" onClick={() => toggleWatchlist(DEMO_USER, m.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
