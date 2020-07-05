const express = require('express');
// const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const events = [];

const listeners = [
    'http://posts-srv:3000/events',
    'http://comments-srv:3000/events',
    'http://moderation-srv:3000/events',
    'http://queries-srv:3000/events',
]


app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event)


    await Promise.all(listeners.map(async (url) => {
        await axios.post(url, event)
    }))
    
    res.send({ status: 'OK' })
});

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(3000, () => {
    console.log('listening on 3000')
})