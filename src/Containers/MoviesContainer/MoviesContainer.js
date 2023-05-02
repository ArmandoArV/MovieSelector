import React, { useState, useMemo, useEffect } from "react";
import MovieCardComponent from "../../Components/MovieCardComponent/MovieCardComponent";
import "./MoviesContainer.css";

export default function MoviesContainer(props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredMovies = useMemo(() => {
    return props.movies.filter((movie) => {
      if (props.searchQuery) {
        return movie.title
          .toLowerCase()
          .includes(props.searchQuery.toLowerCase());
      } else {
        return true;
      }
    });
  }, [props.movies, props.searchQuery]);

  const firstFiveMovies = filteredMovies.slice(0, 5);

  const movieCards = useMemo(() => {
    return firstFiveMovies.map((movie) => (
      <MovieCardComponent
        key={movie.imdbID}
        Poster={movie.Poster}
        Title={movie.Title}
        Year={movie.Year}
      />
    ));
  }, [firstFiveMovies]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [filteredMovies]);

  return (
    <div className="MoviesContainer">
          {movieCards}
    </div>
  );
}
