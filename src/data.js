async function currentWeather(place) {
  try {
    const city = place || 'kathmandu';
    (city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78650a89fccd93f56814e9bef59802c3&fbclid=IwAR1gF3TXvgxoZgQqpoFFvRonBMUCvehGb1JoI5obR3Qqx8Lt1cLjPxwclcQ`,
      {
        mode: 'cors',
        method: 'get',
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}
const oneCall = async (lat, lon, isMetric) => {
  try {
    const unit = (isMetric) ? 'metric' : 'imperial';
    const apiCall = new Request(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=78650a89fccd93f56814e9bef59802c3`,
      {
        mode: 'cors',
        method: 'get',
      },
    );
    const response = await fetch(apiCall);

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
export { currentWeather, oneCall };
