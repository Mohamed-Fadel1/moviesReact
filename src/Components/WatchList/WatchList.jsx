
import React, { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

export default function WatchList() {
  const { watchList } = useContext(GlobalContext);

  return (
    <div>
      <h1>Watchlist</h1>
      {watchList.length > 0 ? (
        <ul>
          {watchList.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No movies added to watchlist yet.</p>
      )}
    </div>
  );
}