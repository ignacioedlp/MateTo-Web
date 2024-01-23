import React from 'react'
import Slider from 'react-slick';
const CarouselHome = ({ children }) => {

  const settings = {
    dots: true, // Indicadores activados
    infinite: true, // Desplazamiento infinito
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Auto loop
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true,
    centerMode: true, // Centrar los slides
    responsive: [
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="container mx-auto"> {/* Ancho completo de la pantalla */}
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}


CarouselHome.propTypes = {}

export default CarouselHome