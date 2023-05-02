import React, { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchComponent.css";

const SearchComponent = memo(({ onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="SearchComponent">
      <div className="SearchComponentIconContainer">
        <FontAwesomeIcon
          icon={faSearch}
          className="SearchComponentIcon"
          onClick={toggleExpansion}
        />
      </div>
      {expanded && (
        <input
          className="SearchComponentInput"
          type="text"
          placeholder="Search a movie"
          onChange={onChange}
        />
      )}
    </div>
  );
});

export default SearchComponent;
