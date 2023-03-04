import React from "react";

const Slider = (props) => {
  return (
    <div className="swiper-slide color-1">
      <div className="slide-image">
        <img src={props.image} loading="lazy" alt={props.alt} />
      </div>
      <div className="slide-content">
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
    </div>
  );
};

export default Slider;
