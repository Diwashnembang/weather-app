import { currentWeather, oneCall } from './data';
import { renderText, renderImage } from './domApi';
import './style.css';

const moment = require('moment-timezone');

async function main() {
  const data = await currentWeather();
  const city = renderText(data.name, '.city');
  const description = renderText(data.weather[0].description, '.description');
  const img = renderImage(data.weather[0].icon, '#image');
  // *utcoffset converts timezone into time
  const date = renderText(
    moment().utcOffset(data.timezone).utc().format('dddd, MMMM D YYYY, h:mm a'),
    '.date',
  );
}
main();
