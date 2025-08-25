import data from "../data/movies.json";

/** simple score: genre overlap (x2) + base rating */
export function recommendFrom(likedGenres = [], userRatings = {}, limit = 8) {
  const liked = new Set(likedGenres);

  // derive liked genres from high ratings (>=4)
  Object.entries(userRatings).forEach(([id, v]) => {
    if (v >= 4) {
      const m = data.find(d => String(d.id) === String(id));
      m?.genres?.forEach(g => liked.add(g));
    }
  });

  const scored = data.map(m => {
    const overlap = (m.genres || []).filter(g => liked.has(g)).length;
    return { ...m, _score: overlap * 2 + (m.rating || 0) };
  });

  return scored.sort((a,b) => b._score - a._score).slice(0, limit);
}

export const allMovies = () => data;
export const searchMovies = (q) => {
  if (!q) return data;
  const s = q.toLowerCase();
  return data.filter(m =>
    m.title.toLowerCase().includes(s) ||
    (m.genres || []).some(g => g.toLowerCase().includes(s))
  );
};
export const getById = (id) => data.find(m => String(m.id) === String(id));
