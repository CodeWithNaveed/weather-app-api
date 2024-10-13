const loader = document.createElement("img");
loader.setAttribute("class", "loader");
loader.src = "./loader.gif";

const key = "50fa392e3bb9c6c35235429ac5eea1ad";

const searchInput = document.querySelector(".search_input");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city_name");

const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const image = document.getElementsByTagName("img");
const description = document.querySelector(".description");

async function fetchData() {
    weather.innerHTML = "";
    weather.append(loader);
    try {
        const city = searchInput.value;
        searchInput.value = "";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
        then(res => res.json())
        .then(data => {
            if(!data.name ) {
                alert("Please enter a valid city name");
            }
            
            else {
                setTimeout(() => {
                    weather.removeChild(loader);
                    weather.innerHTML = `
                        <h2 class="city_name">Weather in ${data.name}, ${data.sys.country}</h2>
                        <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
                        <div class="flex">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
                            <div class="description">${data.weather[0].description}</div>
                        </div>
                        <div class="humidity">Humidity: ${Math.round(data.main.humidity)}%</div>
                        <div class="wind-speed">Wind Speed: ${data.wind.speed} mph</div>
                    `;
                }, 2000)
            }
        })
    }catch(error) {
        alert ("There has been a problem with trensfer of data: (server error)");
        console.log(error);
    }
}

searchBtn.addEventListener("click", () => {
    if(!searchInput.value) {
        alert("Please enter a city name");
    }
    else {
        fetchData()
    }
})


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        .then(res => res.json())
        .then(data => {
            cityName.innerText = `Weather in ${data.name}, ${data.sys.country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            image[0].src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            description.textContent = `${data.weather[0].description}`
            humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
        })
    })
}
