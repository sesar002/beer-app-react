import React from "react";
import { useState } from "react";
import "./style.scss";
import BeerPopUp from "./beer-popup/BeerPopUp";
import BeerBox from "./beer-box/BeerBox";

const Beers = ({ filteredBeers }) => {
  const [popUp, setPopUp] = useState("");
  const handleStarClick = (e, beer) => {
    if (beer.isFav === true) {
      beer.isFav = false;
      window.sessionStorage.removeItem(beer.id);
      e.target.classList.remove("is-clicked");
    } else {
      beer.isFav = true;
      window.sessionStorage.setItem(beer.id, beer.name);
      e.target.classList.add("is-clicked");
    }
  };
  const handlePopUp = (e, id) => {
    setPopUp(id);
  };
  const handleRemovePopUp = () => {
    setPopUp("");
  };

  return (
    <div className="beers">
      {filteredBeers.map((beer) => {
        return (
          <div key={beer.id}>
            <BeerBox
              beer={beer}
              handlePopUp={handlePopUp}
              handleStarClick={handleStarClick}
            />
            {popUp === beer.id ? (
              <BeerPopUp beer={beer} handleRemovePopUp={handleRemovePopUp} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Beers;
