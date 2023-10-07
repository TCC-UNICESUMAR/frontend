import React, {useState} from "react";
import './index.css';

import logo from './../../static/img/LogoBFN_header.png';
import { Link } from 'react-router-dom';

function Header() {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return(
        <header>
            
            <div className='header-mobile'>
                <nav>
                    <div className="burger-menu" onClick={updateMenu}>
                        <div className={burger_class} ></div>
                        <div className={burger_class} ></div>
                        <div className={burger_class} ></div>
                    </div>
                </nav>

                <div className={menu_class}>
                    <div className="container-mobile-link">
                        <Link to={'/feed'}>Feed</Link>
                        <Link to={'/sobre_nos'}>Nós</Link>
                        <Link to={'/login'}>Login</Link>
                    </div>
                </div>
            </div>

            <img src={logo} />
            <div className="link-header-desk">
                <Link to={'/feed'}>Feed</Link>
                <Link to={'/sobre_nos'}>Nós</Link>
            </div>

            <Link className='button-header' to={'/login'}>Login</Link>
        </header>
    );
}

export default Header;