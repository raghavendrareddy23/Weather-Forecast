import React, { useState, useEffect } from "react";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dc82777685mshdc7a07d7adab5f9p1ac5e9jsn46df24e5b139",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

function CitiesList({ input, setInput, setDivToggle }) {

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const [cities, setCities] = useState([]);

  

  const fetchCities = debounce(() => {
    fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${input}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        const newCities = response.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));
        setCities(newCities);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, 1000);

  useEffect(() => {
    if (input !== "") {
      fetchCities();
    } else {
      setCities([]); 
    }
  }, [input, fetchCities]);

  return (
    <div className="absolute z-10 bg-white mt-4 flex px-4 flex-col items-center my-2 w-full text-black">
      <div id="debounce" className="rounded-lg flex flex-col w-full">
        {cities.map((item, i) => (
          <div
            onClick={() => {
              setDivToggle(false);
              setInput(item.label); // Use label instead of item for setting input
            }}
            key={i}
            className="h-12 flex items-center pl-2 bg-bg-div border-b border-b-color"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitiesList;