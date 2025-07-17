import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register () {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password
        }

        try {
            const response = await axios.post('http://localhost:8000/users/register', userData,)

            console.log(response.data)
            alert('Вы успешно автризовались')
            navigate('/login')
        } catch (error) {
            console.error(error)
            alert('Ошибка')
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Напишите username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Напишите E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Напишите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Зарегестрироваться</button>
        </form>
    )
    
}