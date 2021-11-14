import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const RangeComp = ({
  filteredBeers,
  beersToDisplay,
  setRangeBeers,
  filterData,
  filterData2,
}) => {
  const [rangeFrom, setRangeFrom] = useState(0);
  const [rangeTo, setRangeTo] = useState(100);
  const [rangePrevValue, setRangePrevValue] = useState(0);

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
      <Range
        onChange={(e) => handleRange(e)}
        allowCross={false}
        defaultValue={[0, 100]}
      />
      <span>
        From {rangeFrom}% to {rangeTo}%
      </span>
    </div>
  );
};

export default RangeComp;
