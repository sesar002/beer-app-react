import React from "react";
import Beers from "./Components/Beers";
import "./style.scss";
import { useState, useEffect } from "react";
import Filters from "./Components/Filters";
const Main = () => {
  const [beers, setBeers] = useState([]);
  const [beersToDisplay, setBeersToDisplay] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [rangeBeers, setRangeBeers] = useState([]);
  const [searchBeers, setSearchBeers] = useState([]);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => {
        const newData = data
          .map((beer) => ({ ...beer, isFav: false }))
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        setSearchBeers(newData);
        setRangeBeers(newData);
        setFilteredBeers(newData);
        setBeersToDisplay(newData);
        setBeers(newData);
        sessionStorage.clear();
      });
  }, []);
  return (
    <div className="main">
      <div className="cont">
        <div className="header">
          <div className="logo"></div>
        </div>
        <Filters
          beers={beers}
          beersToDisplay={beersToDisplay}
          setBeersToDisplay={setBeersToDisplay}
          filteredBeers={filteredBeers}
          setFilteredBeers={setFilteredBeers}
          rangeBeers={rangeBeers}
          setRangeBeers={setRangeBeers}
          searchBeers={searchBeers}
          setSearchBeers={setSearchBeers}
        />
        <Beers
          filteredBeers={filteredBeers}
          setFilteredBeers={setFilteredBeers}
        />
        <div className="footer">
          <div className="logo-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
