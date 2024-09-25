function getWeather() {
  // API key for OpenWeatherMap
  const apiKey = ""; // Enter your API key
  const city = document.getElementById("city").value;

  // Validation to ensure a city is entered
  if (!city) {
    alert("Please enter a city");
    return;
  }

  // OpenWeatherMap geocoding API URL to get latitude and longitude based on city name
  const geoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  // Fetch request to get latitude and longitude
  fetch(geoCoding)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert("City not found, please try again");
        return;
      }
      getWeatherData(data); // Call function to get weather data using lat/lon
    })
    .catch((error) => {
      console.error(`Error fetching Lat-Lon: ${error}`);
      alert(`Error fetching Lat-Lon`);
    });

  // Function to fetch weather data using latitude and longitude
  function getWeatherData(data) {
    let lat = data[0].lat;
    let lon = data[0].lon;
    const state = data[0].state || "Unknown State"; // Optional field for state
    const cityName = data[0].name || city;

    // Weather data API URL
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch request to get weather data
    fetch(weatherAPI)
      .then((response) => response.json())
      .then((data) => displayData(data, cityName, state)) // Call function to display the weather data
      .catch((error) => {
        console.error(`Error fetching weather: ${error}`);
        alert(`Error fetching Weather`);
      });
  }
}

// Function to display weather data on the page
function displayData(data, cityName, state) {
  const tempCelsius = (data.main.temp - 273.15).toFixed(1); // Convert temperature from Kelvin to Celsius
  const weatherDescription = data.weather[0].description; // Get weather description
  const icon = data.weather[0].icon; // Get weather icon code
  const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`; // Construct URL for weather icon

  const windSpeed = data.wind.speed; // Get wind speed
  const humidity = data.main.humidity; // Get humidity
  const pressure = data.main.pressure; // Get pressure

  const displayWeather = document.getElementById("display-weather");

  // Update the HTML with the weather data
  displayWeather.innerHTML = `
    <div class="city-weather">
      <div class="weather-description">
        <h2>${cityName}, ${state}</h2>
        <h3>${weatherDescription}</h3>
      </div>
      <div class="weather-icon">
        <img src="${weatherIcon}" alt="weather-icon"/>
      </div>
    </div>
    <div class="weather-details">
      <h1>${tempCelsius}°C</h1>
      <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Pressure:</strong> ${pressure} hPa</p>
    </div>
  `;
}
