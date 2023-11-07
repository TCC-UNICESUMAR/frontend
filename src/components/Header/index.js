import jwt_decode from "jwt-decode";

import Header_desktop from './Header_desktop';
import Header_mobile from './Header_mobile';

import './index.css';

function Header() {

    const accessToken = localStorage.getItem('accessToken');
    
    var role = null;
    if (accessToken !== null && accessToken !== undefined) {
        var decoded = jwt_decode(accessToken);
        role = decoded.roles[0].authority
    }

    if (accessToken === null) {
        return (
            <>
                <Header_desktop role={undefined}/>
                <Header_mobile role={undefined}/>
            </>
        );  
    }

    return(
        <>
            <Header_desktop role={role}/>
            <Header_mobile role={"ROLE_USER"}/>
        </>
    )

}

export default Header;