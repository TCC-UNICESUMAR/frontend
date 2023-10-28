import Header from "../../components/Header";

import Graphic from "../../components/Graphic";

import pic_about_us from './../../static/img/pic_about_us.png';
import './index.css';
import { Link } from "react-router-dom";

function Us() {

    const dataUser = [30, 40, 45, 50, 49, 60, 70, 91, 30, 65, 12, 78];
    const dataDonate = [80, 200, 95, 60, 55, 87, 32, 63, 44, 78, 64, 90];

    return (
        <>
            <Header />
            <div className="about-us-content">
                <div className="content-about-group">
                    <span className="green-square">.</span>
                    <span className="white-square">.</span>
                    <div className="text-about-us">
                        <h2>Bem-vindo</h2>
                        <p>
                            Nós somos Better For Next, o seu espaço dedicado
                            a conectar pessoas com um desejo genuíno de ajudar
                            aquelas que mais necessitam. Somos uma plataforma
                            que acredita na força da compaixão e na capacidade de
                            transformação que existe em cada um de nós quando estendemos
                            a mão para ajudar o próximo.
                        </p>
                    </div>
                    <img src={pic_about_us} />
                </div>
                <span className="division"></span>
                <div className="text-us-mission">
                    <div className="content-us-mission">
                        <h2>A Nossa Missão</h2>
                        <p>
                            A nossa missão é simples, mas poderosa: criar uma comunidade
                            onde a bondade e a solidariedade floresçam. Acreditamos que
                            todos têm algo valioso para oferecer, seja tempo, recursos
                            financeiros, habilidades ou simplesmente um coração generoso.
                            Queremos ser o elo que une esses recursos com as pessoas e
                            causas que mais precisam deles.
                        </p>
                    </div>
                    <div className="container-data-mission">
                        <Graphic
                            className="graphic"
                            name={"Usuários cadastrados"}
                            data={dataUser}
                        />
                        <Graphic
                            className="graphic"
                            name={"Doações cadastradas"}
                            data={dataDonate}
                        />
                    </div>
                </div>
                <span className="division"></span>
                <div className="text-us-join">
                    <div className="content-us-join">
                        <h2>Junte-se a Nós</h2>
                        <p>
                            Você também pode fazer parte dessa jornada incrível! Se
                            você deseja doar, fazer voluntariado ou apenas conhecer
                            histórias inspiradoras, estamos aqui para apoiar você. 
                            Juntos, podemos transformar vidas e fazer a diferença em nosso mundo.
                            <br />
                            Better For Next é mais do que apenas um site, é um movimento
                            de bondade em crescimento. <Link to="/login">Junte-se a nós </Link> e faça parte dessa
                            incrível comunidade dedicada a tornar o mundo um lugar mais
                            generoso e solidário para todos.
                            <br /> <br />
                            Obrigado por fazer parte da nossa missão!
                            <br /> <br />
                            Com gratidão,
                            <br /> <br />
                            A equipe do <strong>Better For Next.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Us;