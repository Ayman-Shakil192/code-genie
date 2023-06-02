import PropTypes from "prop-types";

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

Slider.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Slider;
