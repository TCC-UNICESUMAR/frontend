import './index.css'

function Pop_up({text, title}) {
    return (
        <div className="container-pop-up">
            <span className="green-square-pop-up">.</span>
            <span className="white-square-pop-up">.</span>
            <div className="text-pop-up">
                <h2>{title}</h2>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default Pop_up;