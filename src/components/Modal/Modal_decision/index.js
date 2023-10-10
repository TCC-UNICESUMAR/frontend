import './index.css';

function Modal_decision({ background, title, p, btn1, btn2, onClick }) {

    return (
        <div className="modal">
            <div style={{ background }}>
                <h2>{title}</h2>
            </div>
            <div>
                <p>{p}</p>
            </div>
            <div>
                <button onClick={onClick}>{btn1}</button>
                <button onClick={onClick} >{btn2}</button>
            </div>
        </div>
    );
}

export default Modal_decision;