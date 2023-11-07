import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { PrivateRoute } from './privateRoutes';
import { PublicRoute } from './publicRoutes';

import Create_donate from '../pages/Create_donate';
import Dashboard from '../pages/Dashboard';
import Edit_donate from '../pages/Edit_donate';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import My_donate from '../pages/My_donate';
import Not_found from '../pages/Not_found';
import Password_recover from '../pages/Password_recover';
import Profile from '../pages/Profile';
import Us from '../pages/Us';
import User_register from '../pages/User_register';
import ReasonDonation from '../pages/Reason_donation';
import RequestDonation from '../pages/Request_donation';
import Ong_selection from '../pages/Ong_selection';
import Donation_status from '../pages/Donation_status';

function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path='/*' element={<Not_found />} />

                <Route
                    exact path='/'
                    element={
                        <PublicRoute >
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    exact path='/registro_usuario'
                    element={
                        <PublicRoute >
                            <User_register />
                        </PublicRoute>
                    }
                />

                <Route
                    exact path='/recuperar_senha'
                    element={
                        <PublicRoute >
                            <Password_recover />
                        </PublicRoute>
                    }
                />

                <Route
                    exact path='/sobre_nos'
                    element={
                        <PublicRoute >
                            <Us />
                        </PublicRoute>
                    }
                />

                <Route
                    exact path='/feed'
                    element={
                        <PrivateRoute >
                            <Feed />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/criar_doacao'
                    element={
                        <PrivateRoute >
                            <Create_donate />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/perfil'
                    element={
                        <PrivateRoute >
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/minhas_doacoes'
                    element={
                        <PrivateRoute >
                            <My_donate />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/minha_doacao/:donationId'
                    element={
                        <PrivateRoute >
                            <Edit_donate />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/dashboard'
                    element={
                        <PrivateRoute >
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/motivo/:donationId'
                    element={
                        <PrivateRoute >
                            <ReasonDonation />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/solitacoes_doacao'
                    element={
                        <PrivateRoute >
                            <RequestDonation />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/selecao_ong/:donationOrder/:status'
                    element={
                        <PrivateRoute >
                            <Ong_selection />
                        </PrivateRoute>
                    }
                />

                <Route
                    exact path='/status_doacao'
                    element={
                        <PrivateRoute >
                            <Donation_status />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    )

}

export default RoutesApp;