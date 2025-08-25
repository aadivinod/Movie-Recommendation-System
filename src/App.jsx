import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/WatchList";

export default function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/" className="brand">🎬 MovieReco</Link>
        <div className="spacer" />
        <Link to="/watchlist">Watchlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </>
  );
}
