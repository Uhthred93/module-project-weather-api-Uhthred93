async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  const weatherWidget = document.getElementById('weatherWidget');
  weatherWidget.style.display = 'none';

  const citySelect = document.getElementById('citySelect');
  citySelect.addEventListener('change', async (event) => {
    citySelect.disabled = true;
    weatherWidget.style.display = 'none';
    const infoParagraph = document.querySelector('.info');
    infoParagraph.textContent = 'Fetching weather data...';

    try {
      const response = await axios.get(`http://localhost:3003/api/weather?city=${encodeURIComponent(event.target.value)}`);
      const { current, forecast } = response.data;

      document.getElementById('apparentTemp').querySelectorAll('div')[1].textContent = `${current.apparent_temperature}°`;
      document.getElementById('todayDescription').textContent = descriptions.find(desc => desc[0] === current.weather_description)[1];
      const todayStatsDivs = document.getElementById('todayStats').querySelectorAll('div');
      todayStatsDivs[0].textContent = `${current.temperature_min}°/${current.temperature_max}°`;
      todayStatsDivs[1].textContent = `Precipitation: ${current.precipitation_probability * 100}%`;
      todayStatsDivs[2].textContent = `Humidity: ${current.humidity}%`;
      todayStatsDivs[3].textContent = `Wind: ${current.wind_speed}m/s`;

      const forecastDivs = document.getElementById('forecast').children;
      forecast.daily.forEach((dayData, index) => {
        const dayDiv = forecastDivs[index];
        const date = new Date(dayData.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        dayDiv.children[0].textContent = dayName;
        const dayEmoji = descriptions.find(desc => desc[0] === dayData.weather_description)[1];
        dayDiv.children[1].textContent = dayEmoji;
        dayDiv.children[2].textContent = `${dayData.temperature_min}°/${dayData.temperature_max}°`;
        dayDiv.children[3].textContent = `Precipitation: ${dayData.precipitation_probability * 100}%`;
      });

      infoParagraph.textContent = '';
      citySelect.disabled = false;
      weatherWidget.style.display = 'block';
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
