let start = document.getElementById("temp-num");
let feelsLike = document.querySelector("#feels-like");
let description = document.querySelector("#descrption");
let cityName = document.querySelector("#cityname");
let humid = document.querySelector("#humidity");
let windspeed=document.querySelector("#windspeed");
// search engine
function displayTemp(response) {
    
        //change name of the city

    cityName.innerHTML = response.data.name;
    // display temprature
    start.innerHTML = Math.round(response.data.main.temp);
    let cels = document.getElementById("cels");
    let fahrenheit = document.getElementById("faren");
    startValue = start.innerText;
    // show humidity and wind speed
humid.innerHTML=`humidity is: ${response.data.main.humidity} %`;
windspeed.innerHTML=`wind speed: ${response.data.wind.speed} km/h`;
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
    feelsLike.innerHTML = "feels like : " + Math.round(response.data.main.feels_like) + " °C";
    description.innerHTML = response.data.weather[0].description;
    // change icon today
    let todayImg= document.querySelector("#imgtoday");
  todayImg.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
// get lat and log
getForecast(response.data.coord);
};

function search(event) {
    event.preventDefault();
    let city = document.querySelector("input").value;
    let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5ef53446dcb07ea2a0fb8ef5e317e310`;
    axios.get(apiUrl).then(displayTemp);
    //reset input
    // document.querySelector("form").onsubmit = (e) => {
    //     e.target.inputReset();
    // };
    
}
let submitform= document.getElementById("inp-btn");
submitform.addEventListener("submit", search);
let btnsearch = document.querySelector("button");
btnsearch.addEventListener("click", search);
//check input

 

// display date and time
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDay()];
let hour = now.getHours();
let minuts = now.getMinutes();

let showDateAndTime = document.querySelector("#DT");
showDateAndTime.innerHTML = ` ${day} ${hour}:${minuts}`;
//format day 
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// forcast
function displayForecast(response){
 
    let forecast= response.data.daily;
    let forcastEl= document.querySelector("#nextdays");
    let forcastDays="";
   forecast.forEach(function (day, index){
       if(index<6){
           forcastDays +=`<div class="col-2">${formatDay(day.dt)}<br/> 
           <img src="http://openweathermap.org/img/wn/${
                       day.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42">
           <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temperature-max"> ${Math.round(
               day.temp.max
               )}° </span>
               <span class="weather-forecast-temperature-min"> ${Math.round(
                   day.temp.min
                   )}° </span>
                   </div>
                   
                    </div>`;
                }
            });
            

       forcastEl.innerHTML= forcastDays;
       

    
    
    

}
function getForecast(coordinates) {
  
  let apiKey = "5ef53446dcb07ea2a0fb8ef5e317e310";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast)
}
// show current location 

function getCurrentLoco(position){

    let apiKey = "5ef53446dcb07ea2a0fb8ef5e317e310";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl=`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
cityName.innerHTML = "works";
}

navigator.geolocation.getCurrentPosition(getCurrentLoco)


