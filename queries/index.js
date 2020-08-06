
const express = require('express');
// const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json())
app.use(cors());


const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    processEvent(req.body)


    res.status(204).send();
});

function processEvent(event) {
    const { type, data } = event;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, postId, content, status } = data;

        const post = posts[postId]
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, postId, content, status } = data;

        const post = posts[postId]

        const comment = post.comments.find((c) => c.id === id);

        comment.status = status;
        comment.content = content;
    }
}

app.listen(3000, async () => {
    console.log('listening on port 3000')

    const { data: events } = await axios.get('http://event-bus-srv:3000/events')

    events.forEach((event) => {
        console.log('Processing event: ', event.type)
        processEvent(event)
    })


})