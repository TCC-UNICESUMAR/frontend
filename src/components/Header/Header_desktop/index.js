import { Link, Navigate } from 'react-router-dom';
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

        const accessToken = localStorage.getItem('accessToken');
        try {
            await Api.get('/api/v1/auth/logout', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            localStorage.clear();
            <Navigate to="/login" />

        } catch (error) {
            alert('Error Logout! Try again!');
        }
       
    }

    return (
        <>
            <div className='header-desktop'>
                <img src={logo} />
                {role === undefined ?
                    <>
                        <div className="link-header-desktop">
                            <Link to={'/feed'}>Feed</Link>
                            <Link to={'/sobre_nos'}>Nós</Link>
                        </div>
                        <Link className='button-header-login' to={'/login'}>Login</Link>
                    </>
                    : null}
                {role === "ROLE_USER" ?
                    <>
                        <div className="link-header-desktop">
                            <Link to={'/feed'}>Feed</Link>
                            <Link to={'/chat'}>Chat</Link>
                            <Link to={'/criar_doacao'}>Doar</Link>
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
                                            <Link onClick={logout} to="/login">Sair</Link>
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
                            <Link to={'/*'}>Solicitações</Link>
                            <Link to={'/*'}>Chat</Link>
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
                                            <Link onClick={logout} to="/login">Sair</Link>
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
                            <Link to={'/*'}>Relatórios</Link>
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
                                            <Link onClick={logout} to="/login">Sair</Link>
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