const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());


const handleModeration = async (data) => {
    data.status = data.content.includes('orange') ? 'rejected' : 'approved'

    const waitTime = Math.floor(Math.random() * 100000 + 5000)
    await new Promise((res) => setTimeout(res, waitTime))

    await axios.post('http://event-bus-srv:3000/events', {
        type: 'CommentModerated',
        data,
    })
}

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        handleModeration(data)
    }
    res.status(204).send();
})




app.listen(3000, () => {
    console.log('Listening on 3000');
})