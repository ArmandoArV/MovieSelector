import "./App.css";
import MoviesContainer from "./Containers/MoviesContainer/MoviesContainer";
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { api_url, api_key } from "./Constants";
import SearchComponent from "./Components/SearchComponent/SearchComponent";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const searchTimeout = useRef(null);

  useEffect(() => {
    const url = `${api_url}?apikey=${api_key}&s=Avengers`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          const movies = data.Search;
          setMovies(movies);
          setOriginalMovies(movies); // set the original movies state variable
          console.log(movies);
        } else {
          console.log("ErrorA: ", data.Error);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = useCallback(
    (event) => {
      const searchQuery = event.target.value;
      if (!searchQuery) {
        // if the search query is cleared, update the movies state variable with the original movies
        setMovies(originalMovies);
      } else {
        clearTimeout(searchTimeout.current); // clear any existing timeout
        searchTimeout.current = setTimeout(() => { // set a new timeout
          const url = `${api_url}?s=${searchQuery}&apikey=${api_key}`;
          console.log(url);
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data.Response === "True") {
                const movies = data.Search;
                setMovies(movies); // update the state variable with fetched movies
                console.log(movies);
              } else {
                console.log(data.Error);
              }
            })
            .catch((error) => console.log(error));
        }, 500); // wait for 500 milliseconds before making the API call
      }
    },
    [originalMovies]
  );

  const memoizedMoviesContainer = useMemo(() => <MoviesContainer movies={movies} />, [movies]);

  return (
    <div className="App">
      <SearchComponent onChange={handleSearch} />
      {memoizedMoviesContainer}
    </div>
  );
}
