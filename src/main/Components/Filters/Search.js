import React from "react";
import { useState } from "react";

const Search = ({
  filteredBeers,
  beersToDisplay,
  setSearchBeers,
  filterData,
  filterData2,
}) => {
  const [searchPrevValue, setSearchPrevValue] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    const cond = "search";

    const newBeers = beersToDisplay.filter((beer) =>
      beer.name.toLowerCase().includes(inputValue)
    );

    setSearchBeers(newBeers);

    if (inputValue.length > searchPrevValue || searchPrevValue === 0) {
      filterData(newBeers, filteredBeers);
      setSearchPrevValue(inputValue.length);
    } else {
      console.log(newBeers);
      filterData2(newBeers, cond);
      setSearchPrevValue(inputValue.length);
    }
  };
  return (
    <div>
      <input
        className="search filter-margin"
        type="text"
        placeholder="Search beers"
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
