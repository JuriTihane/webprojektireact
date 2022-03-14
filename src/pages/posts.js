import React from 'react';
import Post from '../components/Post/Post'

const Posts = ({posts}) => {
    return (
        <div className='posts'>
            <h1>Posts</h1>

            {posts.map((post, index) => (
                <Post key={index} post={post}/>
            ))}
        </div>
    );
};

export default Posts;
