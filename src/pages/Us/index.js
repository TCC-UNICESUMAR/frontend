import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';

import Api from "../../config/Service/Api";

import Header from "../../components/Header";
import Graphic from "../../components/Graphic";

import pic_about_us from './../../static/img/pic_about_us.png';
import './index.css';
import Loading from "../../components/Loading";
import { set } from "date-fns";

function Us() {

    const [donates, setDonates] = useState([]);
    const [donatesOrder, setDonatesOrder] = useState([]);
    const [users, setUsers] = useState([]);
    const [donatesOrderCanceled, setDonatesOrderCanceled] = useState([]);

    const [loading, setLoanding] = useState(true);


    async function getAllDonationsByYear() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonations?year`);

            let listDonatesOrder = [];
            for (var i = 0; i <= 11; i++) {
               listDonatesOrder.push(response.data.body[i].quantity)
            }
            setDonates(listDonatesOrder)
            console.log(donates)


        } catch (error) {
            console.log('Error Get Donates to Dash By User! Try again!');
        }
    }

    async function getAllDonationsOrderByYearAndStatusSuccess() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationsOrder?status=SUCCESS&year=2023`);
            let listDonatesOrder = [];
            for (var i = 0; i <= 11; i++) {
               listDonatesOrder.push(response.data.body[i].quantity)
            }
            setDonatesOrder(listDonatesOrder)
            console.log(donatesOrder)


        } catch (error) {
            console.log('Error Get Donates Order to Dash By User! Try again!');
        }
    }

    async function getAllDonationsOrderByYearAndStatusCanceled() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationsOrder?status=CANCELED&year=2023`);
            let listDonatesOrder = [];
            for (var i = 0; i <= 11; i++) {
               listDonatesOrder.push(response.data.body[i].quantity)
            }

            setDonatesOrderCanceled(listDonatesOrder)

            console.log(donatesOrderCanceled)


        } catch (error) {
            console.log('Error Get Donates Order Canceled to Dash By User! Try again!');
        }
    }

    async function getAllUsersRegisteredes() {
        try {
            const response = await Api.get(`/api/v1/user/findAllUsers?roleName&year`);

            let listUsers = [];
            for (var i = 0; i <= 11; i++) {
                listUsers.push(response.data.body[i].quantity)
            }
            setUsers(listUsers)
            console.log(users)
        } catch (error) {
            console.log('Error Get Users to Dash By User! Try again!');
        }
    }

    useEffect(() => {
        getAllDonationsByYear();
        getAllDonationsOrderByYearAndStatusSuccess();
        getAllUsersRegisteredes();
        getAllDonationsOrderByYearAndStatusCanceled();
        setLoanding(false);

    }, [])

    if (loading) {
        return(
            <>
                <Header />
                <Loading />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="about-us-content">
                <Fade top>
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
                </Fade>
                <div className="text-us-mission">
                    <Fade top>
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
                    </Fade>
                    <Fade left>
                    <div className="container-data-mission">
                        <div>
                            <Graphic
                                className="graphic"
                                name={"Usuários cadastrados"}
                                data={users}
                            />
                            <Graphic
                                className="graphic"
                                name={"Doações cadastradas"}
                                data={donates}
                            />
                        </div>
                        <div>
                            <Graphic
                                className="graphic"
                                name={"Doações finalizadas com sucesso"}
                                data={donatesOrder}
                            />
                            <Graphic
                                className="graphic"
                                name={"Doações canceladas"}
                                data={donatesOrderCanceled}
                            />
                        </div>
                    </div>
                    </Fade>
                </div>
                <Fade cascade>
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
                            de bondade em crescimento. <Link to="/">Junte-se a nós </Link> e faça parte dessa
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
                </Fade>
            </div>
        </>
    );
}

export default Us;