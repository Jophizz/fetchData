import React, { useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './WeatherComponent.css'; // Import your custom styles

const initialState = {
  weatherData: null,
  isLoading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        weatherData: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const WeatherComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const apiKey = 'fcc0e19ebc54493fa33d16a1ac3efe02';
    const city = 'abuja';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${abuja}&appid=${fcc0e19ebc54493fa33d16a1ac3efe02}`;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };

    fetchData();
  }, []);

  const { weatherData, isLoading, error } = state;

  return (
    <div className="container mt-5">
      {isLoading && <p>Loading weather data...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="card-text">Temperature: {weatherData.main.temp} &#8451;</p>
            <p className="card-text">Weather: {weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
