import React from "react";

const Sort = ({
  filteredBeers,
  beersToDisplay,
  setBeersToDisplay,
  filterData,
}) => {
  const sort = (e) => {
    let sortedBeers;
    if (e.target.value === "name") {
      sortedBeers = beersToDisplay.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      sortedBeers = beersToDisplay.sort((a, b) => a.abv - b.abv);
    }
    setBeersToDisplay(beersToDisplay);
    filterData(sortedBeers, filteredBeers);
  };
  return (
    <div className="filter-margin">
      <select onChange={sort} className="sort">
        <option value="name">Sort by name</option>
        <option value="abv">Sort by ABV</option>
      </select>
    </div>
  );
};

export default Sort;
