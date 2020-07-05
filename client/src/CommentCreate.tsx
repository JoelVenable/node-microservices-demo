import React, { useState } from 'react'
import axios from 'axios'

interface Props {
    postId: string
}

const CommentCreate = ({ postId }: Props) => {
    const [content, setContent] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post(`http://minikube.local/posts/${postId}/comments`, { content })
        setContent('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input className="form-control" value={content} onChange={(e) => setContent(e.currentTarget.value)}>
                </input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}


export default CommentCreate;
