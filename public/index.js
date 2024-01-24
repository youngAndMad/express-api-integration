const openTab = (event, tabName) => {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
};


const findCityWeather = (event) => {
    event.preventDefault()
    const city = document.getElementById('cityInput').value
    fetch(`/weather?city=${city}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayWeatherData(data);
            document.getElementById('weatherCard').hidden = false
        })
        .catch(err => alert((err)))
}

const displayWeatherData = (data) => {
    const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('weatherDescription').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = data.wind.speed;
    document.getElementById('max_temperature').textContent = data.main.temp_max;
    document.getElementById('min_temperature').textContent = data.main.temp_min;
    document.getElementById('feels_like_temperature').textContent = data.main.feels_like;
    document.getElementById('country_code').textContent = data.main.temp_min;
    document.getElementById('coordinates').textContent =
        `lon:${data.coord.lon}, lat:${data.coord.lat}`
    document.getElementById('country_code').textContent = data.cod
}

document.addEventListener('DOMContentLoaded', (event) => {

    event.preventDefault()

    document.getElementById("defaultOpen").click();
    document.getElementById('weatherCard').hidden = true
    document.getElementById('jokesCard').hidden = true
    document.getElementById('postsContainer').hidden = true
})

const loadJokes = (event) => {
    event.preventDefault()

    fetch('/jokes')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById('jokesCard').hidden = false; displayJokes(data);
            document.getElementById('loadJokesButton').hidden = true
        })
        .catch(err => alert(err))
}

const displayJokes = (data) => {
    const jokesContainer = document.getElementById('jokesContainer');

    data.forEach(jokeData => {
        const jokeCard = document.createElement('div');
        jokeCard.classList.add('card');

        const jokeCardBody = document.createElement('div');
        jokeCardBody.classList.add('card-body');

        jokeCardBody.innerHTML = `
            <h5 class="card-title">Joke ID: ${jokeData.id}</h5>
            <p class="card-text">Type: ${jokeData.type}</p>
            <p class="card-text">Setup: ${jokeData.setup}</p>
            <p class="card-text">Punchline: ${jokeData.punchline}</p>
        `;

        jokeCard.appendChild(jokeCardBody);
        jokesContainer.appendChild(jokeCard);
    });
}

const fetchPosts = (event) => {
    event.preventDefault()

    fetch('/posts')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById('postsContainer').hidden = false
            displayPosts(data);
            document.getElementById('loadPostsButton').hidden = true
        })
        .catch(err => alert(err))
}

const displayPosts = (data) => {
    const postsContainer = document.getElementById('postsContainer');

    data.forEach(postData => {
        const postCard = document.createElement('div');
        postCard.classList.add('card');

        const postCardBody = document.createElement('div');
        postCardBody.classList.add('card-body');

        postCardBody.innerHTML = `
            <h5 class="card-title">Post ID: ${postData.id}</h5>
            <p class="card-text">Title: ${postData.title}</p>
            <p class="card-text">Body: ${postData.body}</p>
        `;

        postCard.appendChild(postCardBody);
        postsContainer.appendChild(postCard);
    });
}
