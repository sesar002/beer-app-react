import React from "react";

const Favourites = ({
  filteredBeers,
  beers,
  setBeersToDisplay,
  filterData,
  filterData2,
  setSearchBeers,
  setRangeBeers,
}) => {
  const filterFav = () => {
    const newBeers = beers.filter(
      (beer) => sessionStorage.getItem(beer.id) !== null
    );
    setBeersToDisplay(newBeers);
    filterData(newBeers, filteredBeers);
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      filterFav();
    } else {
      setBeersToDisplay(beers);
      setSearchBeers(beers);
      setRangeBeers(beers);
      filterData2(beers, "");
    }
  };
  return (
    <div className="favourites filter-margin">
      <label>Show only favourites</label>
      <input
        type="checkbox"
        onChange={(e) => {
          handleCheck(e);
        }}
      />
    </div>
  );
};

export default Favourites;
