

const express = require('express');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const posts = {};

app.get('/posts', (req, res) => {
    console.log(req)
    res.send(posts)
})


app.post('/posts', (req, res) => {
    const id = uuid();
    const { title } = req.body;

    const newPost = {
        id,
        title
    }

    posts[id] = newPost

    res.status(201).send(newPost)
})

app.use((err, req, res, next) => {
    console.log(err)
})

app.listen(4000, () => {
    console.log('listening on 4000')
})