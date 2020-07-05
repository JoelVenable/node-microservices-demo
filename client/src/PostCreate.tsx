import React, { useState } from 'react';
import axios from 'axios';


const PostCreate = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post('http://minikube.local/posts/create', { title })
        setTitle('')

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.currentTarget.value)}>

                    </input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate