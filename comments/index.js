

const express = require('express');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    res.send(comments)
})


app.post('/posts/:id/comments', async (req, res) => {
    const commentId = uuid();
    const { content } = req.body;

    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    const comment = { 
        id: commentId, 
        content,
        status: 'pending'
    }

    comments.push(comment);

    commentsByPostId[postId] = comments;

    await axios.post('http://event-bus-srv:3000/events', {
        type: 'CommentCreated',
        data: {
            postId,
            ...comment
        }
    })
    
    res.status(201).send(comments)
})


app.post('/events', async (req, res) => {

    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;

        const comments = commentsByPostId[postId];

        const comment = comments.find((c) => c.id === id)

        comment.status = status

        await axios.post('http://event-bus-srv:3000/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status,
            }
        })


    }


    res.status(204).send();
})



app.listen(3000, () => {
    console.log('listening on 3000')
})