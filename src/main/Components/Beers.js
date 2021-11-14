import React from "react";
import { useState } from "react/cjs/react.development";
import "../style.scss";

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
        const { name, description, image_url, abv, isFav, id, tagline } = beer;
        return (
          <div>
            <div key={beer.id} className="box">
              <div className="img-box-shadow">
                <div
                  style={{
                    background: `url(${image_url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  }}
                  className="box-img"
                />
              </div>
              <div className="details" onClick={(e) => handlePopUp(e, id)}>
                View Details
              </div>
              <div className="beer-name">
                <div className="name">{name}</div> <div>{abv}%alc</div>
              </div>
              <div className="star-outline">
                <div
                  className={isFav ? "star is-clicked" : "star"}
                  onClick={(e) => {
                    handleStarClick(e, beer);
                  }}
                ></div>
              </div>
            </div>
            {popUp === id ? (
              <div key={id * 10} className="pop-up">
                <span className="close" onClick={() => handleRemovePopUp()}>
                  &times;
                </span>
                <div className="pop-up-content">
                  <div
                    style={{
                      background: `url(${image_url})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                    }}
                    className="box-img"
                  />
                  <h1>{name}</h1>
                  <h3>"{tagline}"</h3>
                  <h3>{abv}% alcohol</h3>
                  <p>{description}</p>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Beers;
