

const express = require('express');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    console.log(req)
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    res.send(comments)
})


app.post('/posts/:id/comments', (req, res) => {
    const commentId = uuid();
    const { content } = req.body;

    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[postId] = comments;


    res.status(201).send(comments)
})

app.use((err, req, res, next) => {
    console.log(err)
})

app.listen(4001, () => {
    console.log('listening on 4001')
})