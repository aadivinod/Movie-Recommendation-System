import { Link } from "react-router-dom";

export default function MovieCard({ movie, inWatchlist, onToggleWatch }) {
  const toggle = (e) => { e.preventDefault(); onToggleWatch?.(movie.id); };

  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <img src={movie.poster} alt={movie.title} />
      <div className="card-body">
        <h4>{movie.title}</h4>
        <p className="muted">{movie.genres?.join(", ")} · {movie.year}</p>
        <div className="row">
          <span>⭐ {movie.rating}</span>
          {onToggleWatch && (
            <button className={inWatchlist ? "btn secondary" : "btn"} onClick={toggle}>
              {inWatchlist ? "Remove" : "Watchlist"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
