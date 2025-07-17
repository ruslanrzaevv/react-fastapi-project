import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'


export default function UsersRouters () {
    return (
        
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        
    )
}