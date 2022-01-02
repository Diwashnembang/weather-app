import { currentWeather, oneCall } from './data';
import { renderText, renderImage } from './domApi';
import './style.css';

const moment = require('moment-timezone');

const metric = true;

async function main() {
  /* onecall api call gets all the the data for eg hourly and minutely weather
  and is more precise which requires lat and lon that is why currentWeather
  api is used to get the lat and lon the city .
  */
  const unit = (metric) ? { temperature: '°C', windspeed: 'KM/h' } : { temperature: '°F', windspeed: 'mph' };
  const current = await currentWeather();
  const oneCallData = await oneCall(current.coord.lat, current.coord.lon);
  const city = renderText(current.name, '.city');
  const description = renderText(capitalize(oneCallData.current.weather[0].description), '.description');
  const img = renderImage(oneCallData.current.weather[0].icon, '#image');
  const temperature = renderText(`${removePoint(oneCallData.current.temp)}${unit.temperature};`, '.temperature');

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

  const feelsLike = renderText(`${oneCallData.current.feels_like}${unit.temperature}`, '.feels-like-data');
  const humidity = renderText(oneCallData.current.humidity, '.humidity-data');
  const windspeed = renderText(`${oneCallData.current.wind_speed}${unit.windspeed}`, '.wind-speed-data');

  // todo : get weekly data

  // for weekly data
  const weeklyForecastDiv = Array.from(document.querySelectorAll('.day-forecast'));
  let index = 0;
  weeklyForecastDiv.forEach((day) => {
    renderText(`${oneCallData.daily[index].temp.max} ${unit.temperature}`, day);
    const icon = Array.from(day.nextElementSibling.children);
    // console.log(oneCallData.current.weather[0].icon)
    renderImage(`${oneCallData.daily[index].weather[0].icon}`, icon[0]);
    index += 1;
  });

  // todo: add css and search function
}
function capitalize(sentence) {
  if (typeof sentence !== 'string') return console.log('error');
  let capitalizeSentence = '';
  const temp = sentence.split(' ');
  for (let i = 0; i < temp.length; i += 1) {
    temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
  }
  let incompleteSentence = '';
  for (let i = 0; i < temp.length; i += 1) {
    capitalizeSentence = `${incompleteSentence} ${temp[i]}`;
    incompleteSentence = capitalizeSentence;
    console.log(capitalizeSentence);
  }
  return capitalizeSentence;
}

function removePoint(string) {
  const copy = (typeof (string) === 'number') ? string.toString() : string;
  return copy.split('.')[0];
}
main();
