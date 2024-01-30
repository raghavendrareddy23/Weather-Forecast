import React, { useEffect, useState } from 'react';
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/Cloudy.jpg';
import Rainy from '../assets/images/Rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';

const BackgroundLayout = ({ weatherData }) => {
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weatherData && weatherData.daily) {
      const mode = weatherData.daily[0].mode.toLowerCase();
      switch (mode) {
        case 'clear':
          setImage(Clear);
          break;
        case 'clouds':
          setImage(Cloudy);
          break;
        case 'rain':
        case 'shower':
          setImage(Rainy);
          break;
        case 'snow':
          setImage(Snow);
          break;
        case 'fog':
          setImage(Fog);
          break;
        case 'thunder':
        case 'storm':
          setImage(Stormy);
          break;
        default:
          setImage(Clear);
      }
    }
  }, [weatherData]);

  return (
    <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  );
};

export default BackgroundLayout;
