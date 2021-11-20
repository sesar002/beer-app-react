import React from "react";
import "../style.scss";

const BeerBox = ({ beer, handlePopUp, handleStarClick }) => {
  const { name, image_url, abv, isFav, id } = beer;
  return (
    <div className="box">
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
  );
};

export default BeerBox;
