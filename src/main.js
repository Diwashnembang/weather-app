import { currentWeather, oneCall } from './data';
import { renderText, renderImage } from './domApi';
import './style.css';

const moment = require('moment-timezone');

async function main() {
  /* onecall api call gets all the the data for eg hourly and minutely weather
  and is more precise which requires lat and lon that is why currentWeather
  api is used to get the lat and lon the city .
  */
  const current = await currentWeather();
  const oneCallData = await oneCall(current.coord.lat, current.coord.lon);
  const city = renderText(current.name, '.city');
  const description = renderText(oneCallData.current.weather[0].description, '.description');
  const img = renderImage(oneCallData.current.weather[0].icon, '#image');

  // *utcoffset converts timezone into time
  /* first moment.unix conver dt or epoch time in to date and tz into the time zone
  */

  const date = renderText(
    moment.unix(Number(oneCallData.minutely[0].dt)).utc().tz(oneCallData.timezone).format('dddd, MMMM D YYYY, h:mm a'),
    '.date',
  );
}
main();
