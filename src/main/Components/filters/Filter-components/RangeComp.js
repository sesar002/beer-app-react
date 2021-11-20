import React from "react";
import "rc-slider/assets/index.css";
import { useState, useRef } from "react";
import "../style.scss";

const RangeComp = ({
  filteredBeers,
  beersToDisplay,
  setRangeBeers,
  filterData,
  filterData2,
}) => {
  const rangeOneRef = useRef(null);
  const rangeTwoRef = useRef(null);

  const [rangeFrom, setRangeFrom] = useState(0);
  const [rangeTo, setRangeTo] = useState(100);
  const [rangePrevValue, setRangePrevValue] = useState(0);

  const handleRange = () => {
    const cond = "range";
    if (rangeTwoRef.current.value - rangeOneRef.current.value <= 0) {
      rangeOneRef.current.value = rangeTwoRef.current.value - 0;
    }

    const subPos = rangeTwoRef.current.value - rangeOneRef.current.value;

    setRangeFrom(rangeOneRef.current.value);
    setRangeTo(rangeTwoRef.current.value);

    let newBeers = beersToDisplay.filter(
      (beer) =>
        beer.abv > rangeOneRef.current.value &&
        beer.abv < rangeTwoRef.current.value
    );

    setRangeBeers(newBeers);

    if (subPos < rangePrevValue || rangePrevValue === 0) {
      filterData(newBeers, filteredBeers);
      setRangePrevValue(subPos);
    } else {
      filterData2(newBeers, cond);
      setRangePrevValue(subPos);
    }
  };

  return (
    <div className="range filter-margin">
      <label>Alcohol content(%):</label>
      <div className="container">
        <div
          className="slider-track"
          style={{
            background: `linear-gradient(to right, #dadae5 ${rangeFrom}% , #ffc71c ${rangeFrom}% , #ffc71c ${rangeTo}%, #dadae5 ${rangeTo}%)`,
          }}
        ></div>
        <input
          type="range"
          min="0"
          max="100"
          value={rangeFrom}
          ref={rangeOneRef}
          onChange={() => handleRange()}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={rangeTo}
          ref={rangeTwoRef}
          onChange={() => handleRange()}
        />
      </div>
      <span>
        From {rangeFrom}% to {rangeTo}%
      </span>
    </div>
  );
};

export default RangeComp;
