import React , { useContext } from "react"
import ReactSlickDemo from './slider/SlickSlideShow';
import './Home.css';
import { AuthContext } from '../context/auth-context';
import { Link } from 'react-router-dom';

const Home = () => {
    const auth = useContext(AuthContext);
    return (
        <div>
            <ReactSlickDemo />
            {!auth.isLoggedIn && (
                <li className="login-register">
                    <Link to="/auth">Login/Register</Link>
                </li>
            )}
        </div>
    )
}

export default Home