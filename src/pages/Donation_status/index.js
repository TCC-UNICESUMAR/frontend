import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import Api from "../../config/Service/Api";

import Table_status_donation from "../../components/Table_status_donation";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

function Donation_status() {

    const accessToken = localStorage.getItem('accessToken');

    var role = "";

    if (accessToken !== null) {
        var decoded = jwt_decode(accessToken);
        role = decoded.roles[0].authority;
    }

    const [donationOrder, setDonationOrder] = useState([]);
    const [loading, setLoanding] = useState(true);

    async function findAllDonationsOrdersByUser() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationsOrdersByUser`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setDonationOrder(response.data.body.content);
            setLoanding(false);
        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    async function findAllDonationOrdersByIntermediary() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationOrdersByIntermediary`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setDonationOrder(response.data.body.content);
        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    async function findAllDonationOrdersByDonor() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationOrdersByDonor`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setDonationOrder(response.data.body.content);
        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    useEffect(() => {
        findAllDonationsOrdersByUser()
    }, [])

    if (loading) {
        return(
            <>
                <Header />
                <Loading />
            </>
        )
    }

    return(
        <>
            <Header />

            {
                role === "ROLE_USER" ?
                    <>
                    <h2>Andamento dos seus pedidos de doação</h2>
                        <div className="container-buttons-page">
                            <button onClick={() => findAllDonationsOrdersByUser()}>Meus pedidos</button>
                            <span></span>
                            <button onClick={() => findAllDonationOrdersByDonor()}>Solicitações das minhas doações publicadas</button>
                        </div>
                    </>
                    :
                    <>
                        <h2>Andamento de pedidos de doação</h2>
                        <div className="container-buttons-page ong">
                            <button onClick={() => findAllDonationsOrdersByUser()}>Meus pedidos</button>
                            <span></span>
                            <button onClick={() => findAllDonationOrdersByIntermediary()}>Pedidos de outros</button>
                        </div>
                    </>
            }
            <Table_status_donation donations={donationOrder} role={role}/>
        </>
    )
}

export default Donation_status;