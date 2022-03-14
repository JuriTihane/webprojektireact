import React from 'react'
import {useState} from "react";

const AddPost = ({onAdd, authorized}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div className="error" style={{display: error ? '' : 'none',}}>
                <h1>You must be logged in to post</h1>
            </div>
        );
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div className="success" style={{display: submitted ? '' : 'none',}}>
                <h1>Post successful</h1>
            </div>
        );
    };

    const onSubmit = (e) => {
        setSubmitted(false)
        setError(false)
        e.preventDefault()
        if (!authorized) {
            console.log('not authorized')
            setError(true)
        } else {
            setSubmitted(true)
            if (!title) {
                alert('Please add a title')
                return
            } else if (!content) {
                alert('Please add a content')
                return
            }

            onAdd({title, content})

            setTitle('')
            setContent('')
        }
    }

    return (
        <div>
            {/* Calling to the methods */}
            <div className="messages postTitle">
                {errorMessage()}
                {successMessage()}
            </div>

            <form className='add-form signAndRegisterForm' onSubmit={onSubmit}>
                <label>Post Title</label>
                <input type='text' placeholder='Add post title' value={title} onChange={(e) => setTitle(e.target.value)}/>

                <label>Post Content</label>
                <textarea className='postContentInput' placeholder='Add post content' value={content} onChange={(e) => setContent(e.target.value)}/>
                <input type='submit' value='Add post'/>
            </form>
        </div>
    )
}

export default AddPost