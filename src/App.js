import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages';
import Posts from './pages/posts';
import SignUp from './pages/signup';
import SignIn from "./pages/signin";
import Ask from "./pages/ask";

function App() {
    const [posts, setPosts] = useState([])
    const [isAuthorized, setIsAuthorized] = useState(false)

    const authorized = (childData) => {
        setIsAuthorized(childData);
    }

    useEffect(() => {
        const getPosts = async () => {
            const postsFromServer = await fetchPosts()
            setPosts(postsFromServer)
        }

        getPosts()
    }, [])

    const fetchPosts = async () => {
        const res = await fetch('http://localhost:3000/json')
        return await res.json()
    }

    const addPost = async (post) => {
        const res = await fetch('http://localhost:3000/post', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        const data = await res.json()

        setPosts([...posts, data])
    }

    return (
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<Posts posts={posts} />} />
            <Route path='/ask' element={<Ask onAdd={addPost} authorized={isAuthorized}/>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn authorized={authorized} />} />
        </Routes>
      </Router>
  );
}

export default App;
