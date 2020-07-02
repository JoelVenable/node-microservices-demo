import React from 'react'
import { Comment } from './PostList';


interface Props {
    comments: Comment[]
}


const CommentList = ({ comments }: Props) => {

    return (
        <div>
            {comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
            ))}
        </div>
    )
}

export default CommentList;
