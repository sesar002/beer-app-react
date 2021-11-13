import React from "react";
import "../style.scss";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const Filters = ({
  beers,
  beersToDisplay,
  setBeersToDisplay,
  filteredBeers,
  setFilteredBeers,
  rangeBeers,
  setRangeBeers,
  searchBeers,
  setSearchBeers,
}) => {
  const [rangeFrom, setRangeFrom] = useState(0);
  const [rangeTo, setRangeTo] = useState(100);
  const [searchPrevValue, setSearchPrevValue] = useState(0);
  const [rangePrevValue, setRangePrevValue] = useState(0);

  const filterData = (arr) => {
    let newBeers = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < filteredBeers.length; j++) {
        if (arr[i] === filteredBeers[j]) {
          newBeers.push(arr[i]);
        }
      }
    }
    setFilteredBeers(newBeers);
  };

  const filterData2 = (arr, cond) => {
    let filterBeers = [];
    let arr2 = [];
    if (cond === "search") {
      arr2 = [...rangeBeers];
    } else if (cond === "range") {
      arr2 = [...searchBeers];
    } else {
      arr2 = [];
      for (let i = 0; i < searchBeers.length; i++) {
        for (let j = 0; j < rangeBeers.length; j++) {
          if (searchBeers[i] === rangeBeers[j]) {
            arr2.push(arr[i]);
          }
        }
      }
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr[i] === arr2[j]) {
          filterBeers.push(arr[i]);
        }
      }
    }
    console.log(filterBeers);
    setFilteredBeers(filterBeers);
  };

  const filterFav = () => {
    const newSession = beers.filter(
      (beer) => sessionStorage.getItem(beer.id) !== null
    );
    setBeersToDisplay(newSession);
    filterData(newSession);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    const cond = "search";
    console.log(beersToDisplay);

    const newBeers = beersToDisplay.filter((beer) =>
      beer.name.toLowerCase().includes(inputValue)
    );

    setSearchBeers(newBeers);

    if (inputValue.length > searchPrevValue || searchPrevValue === 0) {
      filterData(newBeers);
      setSearchPrevValue(inputValue.length);
    } else {
      console.log(newBeers);
      filterData2(newBeers, cond);
      setSearchPrevValue(inputValue.length);
    }
  };

  const sort = (e) => {
    let sortedBeers;
    if (e.target.value === "name") {
      sortedBeers = rangeBeers.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      sortedBeers = rangeBeers.sort((a, b) => a.abv - b.abv);
    }
    filterData(sortedBeers);
  };

  const handleRange = (e) => {
    const firstPos = e[0];
    const secondPos = e[1];
    const cond = "range";

    const subPos = secondPos - firstPos;

    setRangeFrom(firstPos);
    setRangeTo(secondPos);

    let newBeers = beersToDisplay.filter(
      (beer) => beer.abv > firstPos && beer.abv < secondPos
    );

    console.log(newBeers);
    setRangeBeers(newBeers);

    if (subPos < rangePrevValue || rangePrevValue === 0) {
      filterData(newBeers);
      setRangePrevValue(subPos);
    } else {
      filterData2(newBeers, cond);
      setRangePrevValue(subPos);
    }
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      filterFav();
    } else {
      setBeersToDisplay(beers);
      filterData2(beers, "");
    }
  };

  return (
    <div className="filters">
      <div>
        <label>Search:</label>
        <input type="text" onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        <label>Alcohol content(%):</label>
        <Range
          onChange={(e) => handleRange(e)}
          allowCross={false}
          defaultValue={[0, 100]}
        />
        <span>
          From {rangeFrom}% to {rangeTo}%
        </span>
      </div>
      <div>
        <label>show only favourites</label>
        <input
          type="checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />
      </div>
      <div>
        <select onChange={sort}>
          <option value="name">Sort by name</option>
          <option value="abv">Sort by ABV</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
