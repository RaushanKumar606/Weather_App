const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const API = "ca5f59fdc215fcbb1a725fb473811fbb";
    const city = document.getElementById('search-input').value.trim();

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                container.style.height = '450px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '560px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = 'clear.jpg';
                    break;
                case 'rain':
                    image.src = 'rain.png';
                    break;
                case 'snow':
                    image.src = 'snow.jpg';
                    break;
                case 'clouds':
                    image.src = 'clouds.png';
                    break;
                case 'storm':
                    image.src = 'storng.png';
                    break;
                case 'haze':
                    image.src = 'haze.jpg';
                    break;
                default:
                    image.src = 'clear.jpg';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        });
});
