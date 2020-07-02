import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Props {
    postId: string
}

interface Comment {
    id: string
    content: string
}

const CommentList = ({ postId }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:4001/posts/${postId}/comments`).then(({ data }) => setComments(data))
    }, [postId])

    return (
        <div>
            {comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
            ))}
        </div>
    )
}

export default CommentList;
