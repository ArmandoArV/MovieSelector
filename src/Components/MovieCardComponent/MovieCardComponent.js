import React, { useState, useMemo, useEffect, useContext, useCallback, useRef } from "react";
import "./MovieCard.css";

const ThemeContext = React.createContext("light");

export default function MovieCardComponent(props) {
  const [clicked, setClicked] = useState(false);
  const theme = useContext(ThemeContext);
  const timeoutRef = useRef(null);

  const handleClick = useCallback(() => {
    setClicked(!clicked);
  }, [clicked]);

  useEffect(() => {
    if (clicked) {
      timeoutRef.current = setTimeout(() => {
        setClicked(false);
      }, 2000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [clicked]);

  const movieCardContainerClassName = useMemo(() => {
    return `MovieCardContainer ${clicked ? "clicked" : ""}`;
  }, [clicked]);

  return (
    <div className={movieCardContainerClassName} onClick={handleClick}>
      <div className="MovieImageBackground">
        <img src={props.Poster} alt={props.Title} />
      </div>
      <div className="MovieCardText">
        <div className="MovieCardTextBackground">
          <h1>{props.Title}</h1>
          <p>Released: {props.Year}</p>
        </div>
      </div>
      <div>Theme: {theme}</div>
    </div>
  );
}
