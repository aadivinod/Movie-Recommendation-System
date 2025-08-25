// src/components/RatingStars.jsx
import { useEffect, useState } from "react";
import { setRating, onRatings, clearRating } from "../services/dbRating";

const DEMO_USER = "demo-user-1";

export default function RatingStars({ movieId, size = 22 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const unsub = onRatings(DEMO_USER, (map) => setVal(map[movieId] ?? 0));
    return () => unsub && unsub();
  }, [movieId]);

  const rate = async (n) => {
    await setRating(DEMO_USER, movieId, n);
  };

  const remove = async () => {
    await clearRating(DEMO_USER, movieId);
    // onRatings subscription will update `val` to 0 automatically
  };

  return (
    <div className="row" style={{ gap: 10, alignItems: "center" }}>
      <div className="rating" style={{ display: "flex", gap: 6 }}>
        {[1,2,3,4,5].map(n => (
          <span
            key={n}
            style={{ fontSize: size, cursor: "pointer" }}
            onClick={() => rate(n)}
            title={`${n} star${n>1 ? "s" : ""}`}
          >
            {n <= val ? "★" : "☆"}
          </span>
        ))}
      </div>

      {val > 0 && (
        <button
          className="btn secondary"
          onClick={remove}
          aria-label="Clear rating"
          title="Clear rating"
          style={{ padding: "4px 8px", fontSize: 12 }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
