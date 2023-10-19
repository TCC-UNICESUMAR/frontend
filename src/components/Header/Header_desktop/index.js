import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import logo from './../../../static/img/LogoBFN_header.png';
import { CiUser } from "react-icons/ci";
import './../index.css';


function Header_desktop({ role }) {

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
                            <div className='menu'>
                                <button onClick={() => {}} className="menu-button">
                                    <span>Perfil</span>
                                </button>
                                <nav>
                                    <ul>
                                        <li>
                                            <Link to="/perfil">Perfil</Link>
                                        </li>
                                        <li>
                                            <Link to="/*">Sair</Link>
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
                            <CiUser className='icon-profile' />
                            <ul className='dropdown'>
                                <li>Perfil</li>
                                <li>Sair</li>
                            </ul>
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
                            <CiUser className='icon-profile' />
                            <ul className='dropdown'>
                                <li>Perfil</li>
                                <li>Sair</li>
                            </ul>
                        </div>
                    </>
                    : null}
            </div>
        </>
    )
}

export default Header_desktop;