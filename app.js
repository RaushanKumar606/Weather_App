const apiKey = "6d83156e4e40ca97d0c6924b832fe00c";
const searchBox = document.querySelector("#Search");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather_icon")

async function getWeather(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        // Update UI with weather data
        const cityElem = document.querySelector(".city");
        const tempElem = document.querySelector(".temp1");
        const humidityElem = document.querySelector(".Humidity");
        const windElem = document.querySelector(".wind");

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "/images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "/images/clear.png";
                break;
            case "Drizzle":
                weatherIcon.src = "/images/drizzl.png";
                break;
            case "Rain":
                weatherIcon.src = "/images/rain.png";
                break;
            case "Snow":
                weatherIcon.src = "/images/snow.png";
                break;
            case "Mist":
                weatherIcon.src = "/images/mist.png";
                break;
            default:
                console.error("Weather condition not recognized.");
        }
       

        if (cityElem && tempElem && humidityElem && windElem) {
            cityElem.innerHTML = data.name;
            tempElem.innerHTML = Math.round(data.main.temp + "°C");
            humidityElem.innerHTML = data.main.humidity + "%";
            windElem.innerHTML = data.wind.speed + " km/h";
            // Optional: Update weather icon
            // document.querySelector(".weather_icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        } else {
            console.error('Some elements are missing in the DOM.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        getWeather(city);
    } else {
        console.log('Please enter a city name.');
    }
});