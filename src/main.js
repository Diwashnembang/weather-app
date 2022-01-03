import { currentWeather, oneCall } from './data';
import {
  renderText, renderImage, hideDiv, unhideDiv,
} from './domApi';
import './style.css';

const moment = require('moment-timezone');

let metric = true;

function capitalize(sentence) {
  if (typeof sentence !== 'string') return ('error');
  let capitalizeSentence = '';
  const temp = sentence.split(' ');
  for (let i = 0; i < temp.length; i += 1) {
    temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
  }
  let incompleteSentence = '';
  for (let i = 0; i < temp.length; i += 1) {
    capitalizeSentence = `${incompleteSentence} ${temp[i]}`;
    incompleteSentence = capitalizeSentence;
  }
  return capitalizeSentence;
}

function removePoint(string) {
  const copy = (typeof (string) === 'number') ? string.toString() : string;
  return copy.split('.')[0];
}

async function main(location) {
  /* onecall api call gets all the the data for eg hourly and minutely weather
  and is more precise which requires lat and lon that is why currentWeather
  api is used to get the lat and lon the city .
  */
  const unit = (metric) ? { temperature: '°C', windspeed: 'KM/h' } : { temperature: '°F', windspeed: 'mph' };
  try {
    const current = await currentWeather(location);
    const oneCallData = await oneCall(current.coord.lat, current.coord.lon, metric);
    const city = renderText(current.name, '.city');
    const description = renderText(capitalize(oneCallData.current.weather[0].description), '.description');
    const img = renderImage(oneCallData.current.weather[0].icon, '#image');
    const temperature = renderText(`${removePoint(oneCallData.current.temp)}${unit.temperature}`, '.temperature');

    // *utcoffset converts timezone into time
    /* first moment.unix conver dt or epoch time in to date and tz into the time zone
  */

    const date = renderText(
      moment.unix(Number(oneCallData.minutely[0].dt)).utc().tz(oneCallData.timezone).format('dddd, MMMM D YYYY'),
      '.date',
    );

    const time = renderText(
      moment.unix(Number(oneCallData.minutely[0].dt)).utc().tz(oneCallData.timezone).format('hh : mm a'),
      '.time',
    );

    const feelsLike = renderText(`${removePoint(oneCallData.current.feels_like)}${unit.temperature}`, '.feels-like-data');
    const humidity = renderText(`${oneCallData.current.humidity}%`, '.humidity-data');
    const windspeed = renderText(`${oneCallData.current.wind_speed}${unit.windspeed}`, '.wind-speed-data');

    // todo : get weekly data

    // for weekly data
    const weeklyForecastDiv = Array.from(document.querySelectorAll('.day-forecast'));
    let index = 0;
    weeklyForecastDiv.forEach((day) => {
      renderText(`${removePoint(oneCallData.daily[index].temp.max)} ${unit.temperature}`, day);
      const icon = Array.from(day.nextElementSibling.children);
      //  (oneCallData.current.weather[0].icon)
      renderImage(`${oneCallData.daily[index].weather[0].icon}`, icon[0]);
      index += 1;
    });
  } catch (e) {
    unhideDiv('.error-message');
    renderText('City Not Found!!', '.error-message');
    const div = document.querySelector('.error-message');
    div.classList.add('error-animation');
    (e);
  }

  // todo: add css and search function
}

// todo make search function work

const input = document.querySelector('#city-finder');
const search = document.querySelector('#search');

function searchCity() {
  const div = document.querySelector('.error-message');
  div.classList.remove('error-animation');
  hideDiv('.error-message');
  main(input.value);
  input.value = '';
}
main();

search.addEventListener('click', searchCity);

input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  searchCity();
});

const changeMertic = document.querySelector('.change-metric');
changeMertic.onclick = async () => {
  const city = document.querySelector('.city');
  metric = !(metric);
  await main(city.textContent);
  changeMertic.textContent = (metric) ? capitalize('Change to Fahrenheit') : capitalize('Change to celsius');
};
