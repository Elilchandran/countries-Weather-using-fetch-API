var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.classList.add("row", "m-3");
row.style.backgroundColor = ' #d2e5f1';

container.append(row);
document.body.append(container);

async function getWeatherData(lat, lon) {
  let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dfa2ddeff1ddb599fabf9b8c729923b5`);
  let data = await res.json();
  return data.main.temp;
}

async function getCountryData() {
  let res = await fetch("https://restcountries.com/v3.1/all");
  let countries = await res.json();
  
  for (let i = 0; i < countries.length; i++) {
    let latlng = countries[i].latlng;
    let temp = await getWeatherData(latlng[0], latlng[1]);
    
    row.innerHTML += `
      <div class="col-md-4">
        <div class="card border-primary mb-3" style="width: 18rem; background-color:black">
          <div class="card-header" style="width: 18rem; color:#f0ca4c; background-color:black">
            <b>${countries[i].name.common}</b>
          </div>
          <img src="${countries[i].flags.svg}" class="card-img-top" alt="${countries[i].name.common} flag">
          <div class="card-body">
            <p class="text-center" style="color:yellow">Capital: ${countries[i].capital[0]}</p>
            <p class="text-center" style="color:yellow">Region: ${countries[i].region}</p>
            <p class="text-center" style="color:yellow">Code: ${countries[i].cca3}</p>
            <a style="display: block; margin: 0 auto; text-align: center; border: 2px solid gray; padding: 10px; color: white; text-decoration: none;" href="https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=dfa2ddeff1ddb599fabf9b8c729923b5" target="_blank">
            Click for more &nbsp&nbsp&nbsp(Lat:${latlng[0]}&nbsp,&nbsplng:${latlng[1]})
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

getCountryData();





















