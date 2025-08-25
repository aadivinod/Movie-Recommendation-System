import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../services/recommendation";
import RatingStars from "../components/RatingStars";
import { onWatchlist, toggleWatchlist } from "../services/dbWatchlist";

const DEMO_USER = "demo-user-1";

export default function MovieDetail() {
  const { id } = useParams();
  const movie = useMemo(() => getById(id), [id]);
  const [watchIds, setWatchIds] = useState([]);

  useEffect(() => {
    const unsub = onWatchlist(DEMO_USER, setWatchIds);
    return () => unsub && unsub();
  }, []);

  if (!movie) return <div className="container"><p>Not found.</p></div>;

  const inList = new Set(watchIds).has(movie.id);
  const toggle = async () => { await toggleWatchlist(DEMO_USER, movie.id); };

  return (
    <div className="container detail">
      <img src={movie.poster} alt={movie.title} />
      <div>
        <h2>{movie.title}</h2>
        <p className="muted">{movie.genres?.join(", ")} · {movie.year}</p>
        <p>{movie.overview}</p>
        <div className="row">
          <RatingStars movieId={movie.id} />
          <button className={inList ? "btn secondary" : "btn"} onClick={toggle}>
            {inList ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
