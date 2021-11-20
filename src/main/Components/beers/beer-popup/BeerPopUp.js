import React from "react";
import "../style.scss";

const BeerPopUp = ({ beer, handleRemovePopUp }) => {
  const { name, description, image_url, abv, id, tagline } = beer;
  return (
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
  );
};

export default BeerPopUp;
