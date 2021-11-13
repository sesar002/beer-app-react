import React from "react";

const Beers = ({ filteredBeers, setFilteredBeers }) => {
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

  return (
    <div className="beers">
      {filteredBeers.map((beer) => {
        const { name, details, image_url, abv, isFav } = beer;
        return (
          <div key={beer.id} className="box">
            <img src={image_url} alt={name} className="box-img" />
            <div>{name}</div>
            <div>{abv}</div>
            <div className="star-outline">
              <div
                className={isFav ? "star is-clicked" : "star"}
                onClick={(e) => {
                  handleStarClick(e, beer);
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Beers;
