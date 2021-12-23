async function currentWeather() {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=london&appid=78650a89fccd93f56814e9bef59802c3&fbclid=IwAR1gF3TXvgxoZgQqpoFFvRonBMUCvehGb1JoI5obR3Qqx8Lt1cLjPxwclcQ',
      {
        mode: 'cors',
        method: 'get',
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
const oneCall = async (lat, lon) => {
  try {
    console.log(lat,lon)
    const apiCall = new Request(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=78650a89fccd93f56814e9bef59802c3`,
      {
        mode: 'cors',
        method: 'get',
      },
    );
    const response = await fetch(apiCall);
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export { currentWeather, oneCall };
