import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const formData = new URLSearchParams()
        formData.append('username', username)
        formData.append('password', password)


        try {
            const response = await axios.post('http://localhost:8000/users/token', formData, 
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify({ username }));
          
            console.log(response.data)
            alert('Добро пожловать сучка')
            navigate('/')
            window.location.reload()
            setUsername('')
            setPassword('')
        } catch (error) {
            console.error(error)
            alert('Ошибка')
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Напишите username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Напишите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}