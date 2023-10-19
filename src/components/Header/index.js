import jwt_decode from "jwt-decode";

import Header_desktop from './Header_desktop';
import Header_mobile from './Header_mobile';

import './index.css';

function Header() {

    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)

    if (accessToken !== null) {
        var decoded = jwt_decode(accessToken);
        var role = decoded.roles[0].authority;
        console.log(decoded)
    }


    return (
        <>
            <Header_desktop role={role}/>
            <Header_mobile role={role}/>
        </>
    );
}

export default Header;