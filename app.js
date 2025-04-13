const input_value = document.getElementById("input_value");
const searchBtn = document.getElementById("search_button");
const resultBox = document.querySelector(".result");

const API_KEY = "c0aeb89ccaf04789809111720251502"; 

const place_name = document.getElementById("place_name");
const weather_type = document.getElementById("weather_type");
const weather_icon = document.getElementById("weather_icon");
const temp_value = document.getElementById("temp_value");
const value_min_temp = document.getElementById("value_min_temp");
const value_max_temp = document.getElementById("value_max_temp");
const value_aqi = document.getElementById("value_aqi");

function fetchWeather() {
    const search_value = input_value.value.trim(); // Get latest input value
    if (!search_value) {
        alert("Please enter a city name");
        return;
    }

    const API_ADDRESS = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${search_value}&aqi=yes`;

    fetch(API_ADDRESS)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            // Updating text values
            place_name.textContent = data.location.name;
            weather_type.textContent = data.current.condition.text;
            temp_value.textContent = `${data.current.temp_c}°C`;
            value_min_temp.textContent = `${data.current.feelslike_c} °C`; // Approx min temp
            value_max_temp.textContent = `${data.current.heatindex_c} °C`; // Approx max temp
            value_aqi.textContent = `${data.current.air_quality["us-epa-index"]}`;

            // Updating weather icon
            weather_icon.src = `https:${data.current.condition.icon}`;

            resultBox.style.display = "flex";

            input_value.value = "";

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Could not fetch weather data. Please check the city name.");
        });
}

// Call fetchWeather() when button is clicked
searchBtn.addEventListener("click", fetchWeather);

// Allow pressing "Enter" to fetch weather
input_value.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});
