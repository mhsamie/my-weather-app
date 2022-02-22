let start = document.getElementById("temp-num");
let feelsLike = document.querySelector("#feels-like");
let description = document.querySelector("#descrption");
let cityName = document.querySelector("#cityname");
// search engine
function displayTemp(response) {
    console.log(response.data)
        //change name of the city

    cityName.innerHTML = response.data.name;
    // display temprature
    start.innerHTML = Math.round(response.data.main.temp);
    ""
    feelsLike.innerHTML = "feels like : " + Math.round(response.data.main.feels_like) + " °C";
    description.innerHTML = response.data.weather[0].description;
};

function search(event) {
    event.preventDefault();
    let city = document.querySelector("input").value;
    let apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5ef53446dcb07ea2a0fb8ef5e317e310`;
    axios.get(apiUrl).then(displayTemp);

}
let btnsearch = document.querySelector("button");
btnsearch.addEventListener("click", search);
//reset input
let inputReset = (document.querySelector("form").onsubmit = (e) => {
    e.target.inputReset();
});

// display date and time
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
let hour = now.getHours();
let minuts = now.getMinutes();

let showDateAndTime = document.querySelector("#DT");
showDateAndTime.innerHTML = ` ${day} ${hour}:${minuts}`;
// fahrenheit convertor
let cels = document.getElementById("cels");
let fahrenheit = document.getElementById("faren");
startValue = start.innerText;

function convert(event) {
    event.preventDefault();
    let fisrtStep = startValue * 1.8;
    let celsiusToFahrenheit = fisrtStep + 32;
    start.innerHTML = Math.round(celsiusToFahrenheit);
    // const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
}
fahrenheit.addEventListener("click", convert);

function backToCels(event) {
    event.preventDefault();
    start.innerHTML = startValue;
}
cels.addEventListener("click", backToCels);