import React from 'react'
import { Comment } from './PostList';


interface Props {
    comments: Comment[]
}


const CommentList = ({ comments }: Props) => {

    

    return (
        <div>
            {comments.map(({ status, content, id }) => {
                let text

                switch (status) {
                    case 'approved':
                        text = content;
                        break;
                    case 'rejected':
                        text = 'This comment has been rejected';
                        break;
                    case 'pending':
                        text = 'This comment is awaiting moderation'
                        break;
                    default:
                        return ''
                }
                return (
                <li key={id}>{text}</li>
            )
            })}
            
        </div>
    )
}

export default CommentList;
