const KEY = process.env.API_KEY;
const $ = require('jquery')

function clickTriggered(){
    console.log("click");
    let searchedCity = $("#city-search").val();
    if(searchedCity.length > 0){
        getWeatherByCity(searchedCity);
    }

}
function getWeatherByCity(cityName){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=it&units=metric&appid=${KEY}`;
    $.ajax({
        url, 
        method: "GET", 
        statusCode: {
            404: () => alert("Nome città errato!")
        },
        dataType: "JSON", 
        success: (data, text, xhttp) => {
            console.log(data);
            setWeather(data);
        }, 
        error: (xhr, options, errorThrown) => console.log(`${xhr.status} \n ${errorThrown}`)
    }); 
}

function setWeather(data){
    console.log("setting");
    $("#city-field").text(data.name);
    $("#weather-condition").text(data.weather[0].description);
    $("img").attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);    
    $("#current-temp").html(`<strong>${data.main.temp}</strong> °C`);
    $("#max-temp").html(`<strong>${data.main.temp_max}</strong> °C`);
    $("#min-temp").html(`<strong>${data.main.temp_min}</strong> °C`);
    $("#current-hum").html(`<strong>${data.main.humidity}</strong> %`);
    $("#wind-force").html(`<strong>${data.wind.speed}</strong>`);
    $("#wind-deg").html(`<strong>${data.wind.deg}</strong>`);
    
    
    
}

let searchButton = $("#search-button");
searchButton.click(() => clickTriggered())
getWeatherByCity("Salerno")
