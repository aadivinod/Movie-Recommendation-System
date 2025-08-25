export default function SearchBar({ value, onChange, onGenrePick }) {
  const genres = ["Action","Sci-Fi","Drama","Romance","Animation","Crime","Family"];
  return (
    <div className="search">
      <input placeholder="Search by title or genre…" value={value} onChange={e=>onChange(e.target.value)} />
      <div className="chips">
        {genres.map(g => (
          <button key={g} className="chip" onClick={()=>onGenrePick(g)}>{g}</button>
        ))}
      </div>
    </div>
  );
}
