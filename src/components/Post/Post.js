import React from "react";

const Post = ({post}) => {
    return (
        <div className='post'>
            <h2 className='postTitle'>{post.title}</h2>
            <p className='postContent'>{post.content}</p>
        </div>
    )
}

export default Post