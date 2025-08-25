import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import {  recommendFrom, searchMovies } from "../services/recommendation";
import { onRatings } from "../services/dbRating";
import { onWatchlist, toggleWatchlist } from "../services/dbWatchlist";

const DEMO_USER = "demo-user-1";

export default function Home() {
  const [q, setQ] = useState("");
  const [ratings, setRatings] = useState({});
  const [watchIds, setWatchIds] = useState([]);

  useEffect(() => {
    const unsubR = onRatings(DEMO_USER, setRatings);
    const unsubW = onWatchlist(DEMO_USER, setWatchIds);
    return () => { unsubR && unsubR(); unsubW && unsubW(); };
  }, []);

  const pickGenre = (g) => {
    // for demo: store liked genres via ratings trick → user can just rate movies they like
    // (You can extend to a separate prefs collection if you want.)
    alert(`Tip: To influence recommendations, rate some ${g} movies with ★★★★ or ★★★★★.`);
  };

  const recs = useMemo(() => recommendFrom([], ratings, 8), [ratings]);
  const filtered = useMemo(() => searchMovies(q), [q]);
  const watchSet = useMemo(() => new Set(watchIds), [watchIds]);

  const handleToggleWatch = async (movieId) => {
    await toggleWatchlist(DEMO_USER, movieId);
  };

  return (
    <div className="container">
      <h2>Movie Recommendation</h2>

      <SearchBar value={q} onChange={setQ} onGenrePick={pickGenre} />

      <h3>Recommended</h3>
      <div className="grid">
        {recs.map(m => (
          <MovieCard key={m.id} movie={m}
            inWatchlist={watchSet.has(m.id)}
            onToggleWatch={handleToggleWatch}
          />
        ))}
      </div>

      <h3>All Movies</h3>
      <div className="grid">
        {filtered.map(m => (
          <MovieCard key={m.id} movie={m}
            inWatchlist={watchSet.has(m.id)}
            onToggleWatch={handleToggleWatch}
          />
        ))}
      </div>
    </div>
  );
}
