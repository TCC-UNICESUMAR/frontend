import './index.css';

import { useNavigate } from 'react-router-dom';

function Modal_info({ background, title, p, btn, redirectTo }) {

    const navigate = useNavigate();
    function redirect(){
        navigate(redirectTo, { replace: true });
    }

    return (

        <div className="modal">
            <div className='modal-header' style={{ background }}>
                <h2>{title}</h2>
            </div>
            <div>
                <p>{p}</p>
            </div>
            <div>
                <button onClick={redirect}>{btn}</button>
            </div>
        </div>
    );
}

export default Modal_info;