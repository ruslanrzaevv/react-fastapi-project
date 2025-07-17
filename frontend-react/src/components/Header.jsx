import Button from "./Button/Button";
import { Link } from "react-router-dom";

export default function Header () {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="header">
            <div className="container">
                <div className="header-inner">
                  <Link className="header-logo" to="/">BlogApp</Link>

                    <nav>
                        {user ? (
                          <>
                            <span style={{ color: 'white', marginRight: '10px' }}>
                              {user.username}
                            </span>
                            <Link className="nav-link" to={'#'}>Выйти</Link>
                          </>
                        ) : (
                          <>
                            <Link className="nav-link" to="/register">Зарегистрироваться</Link>
                            <Link className="nav-link" to="/login">Войти</Link>
                          </>
                        )}
                        <a className="nav-link" href="#">О нас</a>
                        <a className="nav-link" href="#">Премиум</a>
                     </nav>
                </div>
            </div>
        </div>
    )
}