let tempKel;
let tempC;
let tempF;
let tempType = true;
let temp;
let long;
let lat;
let homeLoc = false;
let userLocFocus = "London";
let firstRun = true;
let bgImgCurrent = "#slide800";

function queryBrowser() {

  /* Check if opening in Chrome & redirect to Https:// if this is the case

  // if (window.location.protocol != "https:") {};
  //alert("Chrome requires Https to operate this website. Please connect using Https or use a different browswer");

  //"You need to use HTTPS. Click here: <a target='_top' href='https://codepen.io/RedRocket43/pen/mENVmm'>Weather App</a>")}; })();
  //window.location.href.substring(window.location.protocol.length);
  //alert("please run in Https"); */

};

function setUserLocation() {

  return new Promise(function(resolve, reject) {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;

          homeLoc = true;

          resolve();

        }
        // end of callback
      );

    } else {
      homeLoc = false;
      reject(userLocFocus = "Cornwall");

    };
  });

}

function weatherFetch() {

  return new Promise(function(resolve, reject) {

    setUrl();

    // Create new promise

    $.getJSON(url, function(response) {

      tempKel = response.main.temp;

      // create and update weather object with only information required

      let weather = {};
      weather.country = response.sys.country;
      weather.location = response.name
      weather.id = response.weather[0].id;
      weather.main = response.weather[0].main;
      weather.detail = response.weather[0].description;
      let y = weather.detail.slice(0, 1).toUpperCase();
      weather.detail = y + weather.detail.slice(1, weather.detail.length);

      weather.direction = response.wind.deg
      weather.speed = response.wind.speed

      resolve(weather);
    })

    .fail(function(response) {
      console.log("query failure" + JSON.stringify(response));
      reject()
    })
  });
};

function setUrl() {

  if (homeLoc) {
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=ac7e86839ef6024649500d5bf8dfd690";
  } else {
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + userLocFocus + "&appid=ac7e86839ef6024649500d5bf8dfd690";
  }
}

function tempUpdate(weather) {

  switch (tempType) {
    case true:
      // Celcius
      temp = ((Math.round((tempKel - 273) * 10)) / 10);
      temp = temp + String.fromCharCode(0x2103);
      break;

    case false:
      // Farenheit
      temp = (tempKel * 9 / 5) - 459.67;
      temp = (Math.round(temp * 10)) / 10;
      temp = temp + String.fromCharCode(0x2109);
      break;
  };
  return weather;
}

function updateBgImg(wID) {

  // Identify correct background image to display

  wIDshort = Math.floor(wID / 100);
  let newSlide;

  switch (wIDshort) {
    case 2:
      // Thunderstorm
      newSlide = "#slide200";
      break;

    case 3:
      // Drizzle
      newSlide = "#slide300";
      break;

    case 5:
      // Rain
      newSlide = "#slide500";
      break;

    case 6:
      // Snow
      newSlide = "#slide600";
      break;

    case 7:
      // Atmosphere
      newSlide = "#slide300";
      break;

    case 9:
      // Extreme weather
      newSlide = "#slide200";
      break;
  }

  switch (wID) {
    case 800:
      // clear sky
      newSlide = "#slide800"
      break;

    case 801:
    case 802:
    case 803:
      // clouds
      newSlide = "#slide80x";
      break;

    case 804:
      // overcast
      newSlide = "#slide804";
      break;
  }

  // Execute animation fade out old background / fad in new background

  if (bgImgCurrent === newSlide) {

    // No action needed as slide on screen doesn't require changing

  } else {

    if (firstRun) {
      $(bgImgCurrent).addClass("aniFadeOut").removeClass("u-visable");
      $(newSlide).addClass("aniFadeIn");

      firstRun = false;

    } else {
      $(bgImgCurrent).addClass("aniFadeOut").removeClass("aniFadeIn");
      $(newSlide).addClass("aniFadeIn");

    };
     bgImgCurrent = newSlide;
       };
  return;
}

// Update state displayed

function stateUpdate(weather) {

  $("#userLocation").text(weather.location + ", " + weather.country);

  $("#temp").text(temp);
  $("#wDetail").text(weather.detail);

  let windSpeedKph = weather.speed * 60 * 60 / 1000;
  windSpeedKph = (Math.floor(windSpeedKph * 10)) / 10;
  $("#windSpeed").text("Wind - " + windSpeedKph + " Kph");

  updateBgImg(weather.id);

  return;
};

// Promise to Fetch info, process and update state

function refreshApp() {

  weatherFetch()
    .then(function(weather) {
      return tempUpdate(weather)
    })
    .then(function(weather) {
      return stateUpdate(weather)
    });
};

// hideKeyboard on mobile devices after enter key pressed

function hideKeyboard() {
 //this set timeout needed for case when hideKeyborad
 //is called inside of 'onfocus' event handler
 setTimeout(function() {

   //creating temp field
   var field = document.createElement('input');
   field.setAttribute('type', 'text');
   //hiding temp field from peoples eyes
   //-webkit-user-modify is nessesary for Android 4.x
   field.setAttribute('style', 'position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;');
   document.body.appendChild(field);

   //adding onfocus event handler for out temp field
   field.onfocus = function(){
     //this timeout of 200ms is nessasary for Android 2.3.x
     setTimeout(function() {

       field.setAttribute('style', 'display:none;');
       setTimeout(function() {
         document.body.removeChild(field);
         document.body.focus();
       }, 14);

     }, 200);
   };
   //focusing it
   field.focus();

 }, 50);
}

// Code to start running

console.log("start")

// run on Start to query & load user location.

setUserLocation().then(function() {
  return refreshApp()
});

// Event listeners

// Entering new location and pressing enter

$("#locationInput").keypress(function(e) {
  if (e.which === 13) {
    userLocFocus = $("#locationInput").val();
    homeLoc = false;
    hideKeyboard();
    refreshApp();
    setTimeout(function() {
      $("#locationInput").val("");
    }, 2000);
  }
});

// Toggle temperature units C/F

$(".tempChange").change(function() {
  switch ($(this).val()) {
    case "Celcius":
      tempType = true;
      break;
    case "Fahrenheit":
      tempType = false;
      break;
  };
  refreshApp();
});
