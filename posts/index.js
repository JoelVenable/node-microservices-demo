

const express = require('express');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const posts = {};


app.post('/posts/create', async (req, res) => {
    const id = uuid();
    const { title } = req.body;

    const newPost = {
        id,
        title
    }

    posts[id] = newPost

    await axios.post('http://event-bus-srv:3000/events', {
        type: 'PostCreated',
        data: newPost
    })

    res.status(201).send(newPost)
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body);
    res.status(204).send();
})


app.listen(3000, () => {
    console.log('listening on 3000')
})