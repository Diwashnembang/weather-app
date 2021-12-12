async function getData() {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=London%2Cuk&appid=78650a89fccd93f56814e9bef59802c3&fbclid=IwAR1gF3TXvgxoZgQqpoFFvRonBMUCvehGb1JoI5obR3Qqx8Lt1cLjPxwclcQ',
      {
        mode: 'cors',
        method: 'get',
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { getData };
