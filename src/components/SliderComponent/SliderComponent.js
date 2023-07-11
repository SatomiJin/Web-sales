import { Image } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderComponent.css";
import images from "../../assets/images";

function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autospeed: 3000,
  };

  return (
    <div className="wrapper-slider">
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <Image
              className="slider-images"
              src={image}
              preview={false}
              alt="sliders"
              key={index}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default SliderComponent;
