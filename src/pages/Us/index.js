import Header from "../../components/Header";

import pic_about_us from './../../static/img/pic_about_us.png';
import './index.css';

function Us() {
    return (
        <>
            <Header />
            <div className="about-us-content">
                <div className="content-about-group">
                    <span className="green-square">.</span>
                    <span className="white-square">.</span>
                    <div className="text-about-us">
                        <h2>Sobre nós</h2>
                        <p>
                            Lorem ipsum dolor sit amet.
                            Et porro temporibus id dolorem cupiditate est
                            praesentium totam rem quia architecto.
                        </p>
                    </div>
                    <img src={pic_about_us} />
                </div>
            </div>
        </>
    );
}

export default Us;