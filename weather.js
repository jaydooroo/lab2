
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
event.preventDefault(); 
const value = document.getElementById("weatherInput").value; 
if (value === "") 
   return;
   
console.log(value);

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=6f52969ec7214061705093d6810332af"; 
fetch(url)
   .then(function(response) {
       return response.json(); 
   }).then(function(json) {
       let results = ""; 
       results = "<div class = weatherClass>"
       results += '<h2>Weather in ' +json.name +"</h2>"; 
       for(let i=0; i < json.weather.length; i++) {
           results += '<img src = "http://openweathermap.org/img/wn/' + json.weather[i].icon + '@2x.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
       for(let i=0; i < json.weather.length; i++) {
           results += json.weather[i].description
           if (i !== json.weather.length - 1)
           results += ","
       }
       results += "</p>";
       results += "</div>"
       document.getElementById("weatherResults").innerHTML = results; 
   })

   const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + "&APPID=6f52969ec7214061705093d6810332af";
   fetch(url2)
     .then(function(response) {
       return response.json();
     }).then(function(json) {
         console.log(json); 

       let forecast = ""; 
       for(let i = 0; i< json.list.length; i++) {
           if(i%5 === 0) {
               forecast += "<br>"; 
           }
           forecast += "<div class = forecast>"
           forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
           forecast += "<p>Temperature " + json.list[i].main.temp + "</p>";
           forecast += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
           forecast += "</div>"
       }
       document.getElementById("forecastResults").innerHTML = forecast; 
    });

})
