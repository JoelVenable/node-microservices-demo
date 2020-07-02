const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());




app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        data.status = data.content.includes('orange') ? 'rejected' : 'approved'



        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data,
        })
    }
    res.status(204).send();
})

app.listen(4003, () => {
    console.log('Listening on 4003');
})