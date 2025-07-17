import axios from "axios"
import { useEffect, useState } from "react"

export default function PostList () {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/blogs')
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    }, [])
    
    return (
        <div className="posts">
                {posts.map(post => (
                    <div className="posts-inner" key={post.id}>
                        <img src={`http://localhost:8000/${post.image_path}`} alt="image" />
                        <p>{post.username}</p>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        </div>
                ))}
        </div>
    )
}