const apiKey = "fb91379e23bf01746bbf9c2d8e56aa63";
const latitude = 40.2335;
const longitude = -111.6670;

const currentCard = document.querySelector("#current");
const forecastCard = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlight-container");


async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentWeather(data);
}


function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;

    currentCard.innerHTML = `
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${temp}°F</p>
        <p><strong>Conditions:</strong> ${description}</p>
        <p><strong>High:</strong> ${high}°F</p>
        <p><strong>Low:</strong> ${low}°F</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
    `;
}


async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayForecast(data);
}

function displayForecast(data) {
    let noonForecasts = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));

    const today = noonForecasts[0];
    const tomorrow = noonForecasts[1];
    const dayAfter = noonForecasts[2];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const labelToday = "Today";
    const labelTomorrow = "Tomorrow";
    const labelDayAfter = days[new Date(dayAfter.dt * 1000).getDay()];

    forecastCard.innerHTML = `
        <h2>3-Day Forecast</h2>
        <p><strong>${labelToday}:</strong> ${Math.round(today.main.temp)}°F</p>
        <p><strong>${labelTomorrow}:</strong> ${Math.round(tomorrow.main.temp)}°F</p>
        <p><strong>${labelDayAfter}:</strong> ${Math.round(dayAfter.main.temp)}°F</p>
    `;
}


async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Only Gold or Silver
    const premiumMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Shuffle & pick 3
    const selected = premiumMembers
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    displaySpotlights(selected);
}

function displaySpotlights(members) {
    const levelNames = {
        1: "Bronze",
        2: "Silver",
        3: "Gold"
    };

    spotlightContainer.innerHTML = ""; // clear existing

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Membership Level:</strong> ${levelNames[member.membershipLevel]}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}


getCurrentWeather();
getForecast();
loadSpotlights();
