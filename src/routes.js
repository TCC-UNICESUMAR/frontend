import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create_donate from './pages/Create_donate';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Not_found from './pages/Not_found';
import Password_recover from './pages/Password_recover';
import Profile from './pages/Profile';
import Us from './pages/Us';
import User_register from './pages/User_register';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={ <Login /> } />
                <Route path='/registro_usuario' element={ <User_register /> } />
                <Route path='/feed' element={ <Feed /> } />
                <Route path='/recuperar_senha' element={ <Password_recover /> } />
                <Route path='/sobre_nos' element={ <Us /> } />
                <Route path='/criar_doacao' element={ <Create_donate /> } />
                <Route path='/perfil' element={ <Profile /> } />
                <Route path='*' element={ <Not_found /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;