import React from "react";
import "../style.scss";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Search from "./Filters/Search";
import RangeComp from "./Filters/RangeComp";
import Favourites from "./Filters/Favourites";
import Sort from "./Filters/Sort";

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
  const [isOpen, setIsOpen] = useState(false);

  const filterFunc = (arr1, arr2) => {
    let newBeers = [];

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          newBeers.push(arr1[i]);
        }
      }
    }
    return newBeers;
  };

  const filterData = (arr1, arr2) => {
    setFilteredBeers(filterFunc(arr1, arr2));
  };

  const filterData2 = (arr1, cond) => {
    let arr2 = [];
    if (cond === "search") {
      arr2 = [...rangeBeers];
    } else if (cond === "range") {
      arr2 = [...searchBeers];
    } else {
      arr2 = filterFunc(searchBeers, rangeBeers);
    }

    setFilteredBeers(filterFunc(arr1, arr2));
  };

  return (
    <div className="filters">
      <Search
        filteredBeers={filteredBeers}
        beersToDisplay={beersToDisplay}
        filterFunc={filterFunc}
        filterData={filterData}
        filterData2={filterData2}
        setSearchBeers={setSearchBeers}
      />
      <RangeComp
        filteredBeers={filteredBeers}
        beersToDisplay={beersToDisplay}
        filterFunc={filterFunc}
        filterData={filterData}
        filterData2={filterData2}
        setRangeBeers={setRangeBeers}
      />
      <Favourites
        filteredBeers={filteredBeers}
        beers={beers}
        setBeersToDisplay={setBeersToDisplay}
        filterFunc={filterFunc}
        filterData={filterData}
        filterData2={filterData2}
      />
      <Sort
        filteredBeers={filteredBeers}
        beersToDisplay={beersToDisplay}
        filterFunc={filterFunc}
        filterData={filterData}
        setBeersToDisplay={setBeersToDisplay}
      />
    </div>
  );
};

export default Filters;
