import { useState } from "react";
import { Link, Navigate } from 'react-router-dom';

import logo from './../../../static/img/LogoBFN_header.png';

import './../index.css';

function Header_mobile({ role }) {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    function logout() {
        localStorage.clear();
        <Navigate to="/" />
    }

    return (
        <div className='header-mobile'>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
            </nav>

            <div className={menu_class}>
                <Link to={'/feed'}>Feed</Link>
                <Link to={'/*'}>Dashboard</Link>
                <Link to={'/*'}>Relatórios</Link>
                <Link to={'/perfil'}>Perfil</Link>
                <Link onClick={logout} to="/">Sair</Link>
            </div>
            <img src={logo} />
        </div>
    )
}

export default Header_mobile;