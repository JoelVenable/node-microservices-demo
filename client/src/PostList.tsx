import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'


interface Post {
    id: string
    title: string
    comments: Comment[]
}


export interface Comment {
    id: string
    content: string
}

type PostRecord = Record<string, Post>

const PostList = () => {
    const [posts, setPosts] = useState<PostRecord>({})

    useEffect(() => {
        axios.get<PostRecord>('http://localhost:4002/posts').then(r => setPosts(r.data))
    }, [])

    const renderedPosts = Object.values(posts).map((post) => (
        <div className="card" style={{width: '30%', marginBottom: '20px' }} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
    ))

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}

export default PostList