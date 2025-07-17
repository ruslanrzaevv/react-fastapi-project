import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import PostList from './components/PostList'
import CreateBlogForm from './components/CreatePost'
import Register from './components/Register'
import Login from './components/Login'
import UsersRouters from './components/UsersRouters'
import { Routes, Route } from 'react-router-dom'


function App() {

    const token = localStorage.getItem('token');
    const [posts, setPosts] = useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/blogs')
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        
        
        <>
            
        <Header />

        <PostList />
        <UsersRouters />

        <hr />
        <CreateBlogForm />
        </>
    )
}

export default App
