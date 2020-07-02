
const express = require('express');
// const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json())
app.use(cors());


const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

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

    console.log(posts)

    res.status(204).send();
})

app.listen(4002, () => {
    console.log('listening on port 4002')
})