import jwt_decode from "jwt-decode";

import Header_desktop from './Header_desktop';
import Header_mobile from './Header_mobile';

import './index.css';

function Header() {

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
        var decoded = jwt_decode(accessToken);
        var role = decoded.roles[0].authority;
    }

    return (
        <>
            <Header_desktop role={role}/>
        </>
    );
}

export default Header;