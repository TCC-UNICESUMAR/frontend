import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

import logo from './../../../static/img/LogoBFN_header.png';
import { CiUser } from "react-icons/ci";
import './../index.css';
import './index.css';
import Api from '../../../config/Service/Api';

function Header_desktop({ role }) {
    const dropDownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    async function logout() {
        localStorage.clear();
    }

    return (
        <>
            <div className='header-desktop'>
                <img src={logo} />
                {role === undefined ?
                    <>
                        <div className="link-header-desktop">
                            <Link to={'/sobre_nos'}>Sobre nós</Link>
                        </div>
                        <Link className='button-header-login' to={'/'}>Login</Link>
                    </>
                    : null}
                {role === "ROLE_USER" ?
                    <>
                        <div className="link-header-desktop">
                            <Link to={'/feed'}>Feed</Link>
                            <Link to={'/chat'}>Chat</Link>
                            <Link to={'/criar_doacao'}>Doar</Link>
                            <Link to={'/solitacoes_doacao'}>Solicitações</Link>
                            <Link to={'/status_doacao'}>Status doação</Link>
                        </div>
                        <div className='container-profile'>
                            <div className='menu-container'>
                                <button onClick={onClick} className="menu-button">
                                    <CiUser className="img-profile" />
                                </button>
                                <nav
                                    ref={dropDownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        <li>
                                            <Link to="/perfil">Perfil</Link>
                                        </li>
                                        <li>
                                            <Link onClick={() => logout()} to="/">Sair</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                    : null}
                {role === "ROLE_ONG" ?
                    <>
                        <div className="link-header-desktop">
                            <Link to={'/feed'}>Feed</Link>
                            <Link to={'/*'}>Chat</Link>
                            <Link to={'/solitacoes_doacao'}>Solicitações</Link>
                            <Link to={'/status_doacao'}>Status doação</Link>
                        </div>
                        <div className='container-profile'>
                            <div className='menu-container'>
                                <button onClick={onClick} className="menu-button">
                                    <CiUser className="img-profile" />
                                </button>
                                <nav
                                    ref={dropDownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        <li>
                                            <Link to="/perfil">Perfil</Link>
                                        </li>
                                        <li>
                                            <Link onClick={logout} to="/">Sair</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                    : null}
                {role === "ROLE_ADMIN" ?
                    <>
                        <div className="link-header-desktop">
                            <Link to={'/feed'}>Feed</Link>
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </div>
                        <div className='container-profile'>
                            <div className='menu-container'>
                                <button onClick={onClick} className="menu-button">
                                    <CiUser className="img-profile" />
                                </button>
                                <nav
                                    ref={dropDownRef}
                                    className={`menu ${isActive ? "active" : "inactive"}`}
                                >
                                    <ul>
                                        <li>
                                            <Link to="/perfil">Perfil</Link>
                                        </li>
                                        <li>
                                            <Link onClick={logout} to="/">Sair</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                    : null}
            </div>
        </>
    )
}

export default Header_desktop;