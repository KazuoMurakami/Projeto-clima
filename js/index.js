// 9d2c423533757e35c518398c24f47821 Key do api weather
const apikey = '9d2c423533757e35c518398c24f47821';                       

const CountryURL = "https://flagcdn.com/";

const inputCountry = document.querySelector('#city-input');
const SearchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');


//funções
const getWeatherData = async(city) =>{
    const getWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=PT_br`;

    const res = await fetch(getWeatherAPI);
    const data = await res.json();
    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    let CountryFlag = data.sys.country
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute('src', `https://flagcdn.com/${CountryFlag.toLowerCase()}.svg`)
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}%`;

    weatherContainer.classList.remove('hide')
}

//eventos
SearchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = inputCountry.value;
    showWeatherData(city);
})

inputCountry.addEventListener('keyup', (e) => {
    if(e.code === 'Enter'){
        const city = e.target.value;
        showWeatherData(city);
    }
})