import { useState } from "react";
import { Link } from 'react-router-dom';

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
                {role === "" ?
                    <div className="container-mobile-link-off">
                        <Link to={'/feed'}>Feed</Link>
                        <Link to={'/sobre_nos'}>Nós</Link>
                        <Link to={'/login'}>Login</Link>
                    </div>
                    : null}
                {role === "ROLE_USER" ?
                    <div className="container-mobile-link">
                        <Link to={'/feed'}>Feed</Link>
                        <Link to={'/chat'}>Chat</Link>
                        <Link to={'/criar_doacao'}>Doar</Link>
                        <Link to={'/perfil'}>Perfil</Link>
                        <Link id="logout" to={'/perfil'}>Sair</Link>
                    </div>
                    : null}
                {role === "ROLE_ONG" ?
                    <div className="container-mobile-link">
                        <Link to={'/feed'}>Feed</Link>
                            <Link to={'/*'}>Solicitações</Link>
                            <Link to={'/*'}>Chat</Link>
                        <Link to={'/perfil'}>Perfil</Link>
                        <Link id="logout" to={'/perfil'}>Sair</Link>
                    </div>
                    : null}
                {role === "ROLE_ADMIN" ?
                    <div className="container-mobile-link">
                        <Link to={'/feed'}>Feed</Link>
                        <Link to={'/*'}>Dashboard</Link>
                        <Link to={'/*'}>Relatórios</Link>
                        <Link to={'/perfil'}>Perfil</Link>
                        <Link id="logout" to={'/perfil'}>Sair</Link>
                    </div>
                    : null}
            </div>
            <img src={logo} />
        </div>
    )
}

export default Header_mobile;