import React, {useState} from 'react';
import AddPost from "../components/AddPost";

const Ask = ({onAdd, authorized}) => {

    const addPost = (post) => {
        onAdd(post)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'Center',
                alignItems: 'Right',
                height: '100vh'
            }}
        >
            <div className='formWrapper'>
                <div className="pageTitle">
                    <h1>Ask</h1>
                </div>

                <AddPost onAdd={addPost} authorized={authorized}/>
            </div>
        </div>
    );
};

export default Ask;