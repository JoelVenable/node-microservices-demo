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
    'http://localhost:4000/events',
    'http://localhost:4001/events',
    'http://localhost:4002/events',
    'http://localhost:4003/events',
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

app.listen(4005, () => {
    console.log('listening on 4005')
})