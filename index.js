require('dotenv').config();
const express = require('express');
var request = require('request');

const app = express();

app.use('/static', express.static('public'));

const apiKey = process.env.WEATHER_OPEN_API_KEY;

const JSON_PLACEHOLDER_URL = process.env.JSON_PLACEHOLDER_URL
const JOKE_API_URL = process.env.JOKE_API_URL

app.get('/weather', (httpReq, httpRes) => {
    const city = httpReq.query.city
    request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { method: 'GET' }, (err, res) => {
        if (err != null) {
            console.log('err', err)

            httpRes.json({ err })
        } else {
            httpRes.json(JSON.parse(res.body))
        }
    })
})


app.get('/posts/:id', (req, httpRes) => {
    const id = req.params.id
    console.log(id)
    request(`${JSON_PLACEHOLDER_URL}/posts/` + id, (err, res) => {
        httpRes.json(JSON.parse(res.body))
    })
})

app.get('/posts', (_, httpRes) => {
    request(`${JSON_PLACEHOLDER_URL}/posts/`, (err, res) => {
        if (err) {
            httpRes.status(500).json({ error: 'Error fetching posts' });
            return;
        }
        httpRes.json(JSON.parse(res.body));
    });
});

app.get('/jokes', (httpReq, httpRes) => {
    request(`${JOKE_API_URL}/ten`, {
        method: 'GET',
    }, (err, res) => {
        if (err != null) {
            httpRes.json({ err })
        } else {
            httpRes.json(JSON.parse(res.body))
        }
    })
})


app.listen(3000, () => console.log(`app running on port 3000`))