import { Link } from "react-router-dom";

import './index.css';

function Modal({ state, message, redirect }) {

    function reload() {
        window.location.reload();
    }

    return (
        <div className="container-modal">
            <div className={`modal ${state === "undefined" ? "inactive" : "active"}`}>
                {state === "success" ?
                    <div className="modal-success">
                        <h3>Realizado com sucesso!</h3>
                        <Link to={redirect}>Concluir</Link>
                    </div>
                    :
                    <div className="modal-error">
                        <h3>{message}</h3>
                        <button onClick={reload}>Fechar</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Modal;