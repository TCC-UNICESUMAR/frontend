import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import Api from "../../config/Service/Api";

import Table_status_donation from "../../components/Table_status_donation";
import Header from "../../components/Header";

function Donation_status() {

    const accessToken = localStorage.getItem('accessToken');

    var role = "";

    if (accessToken !== null) {
        var decoded = jwt_decode(accessToken);
        role = decoded.roles[0].authority;
    }

    const [donationOrder, setDonationOrder] = useState([]);

    async function findAllDonationsOrdersByUser() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationsOrdersByUser`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setDonationOrder(response.data.body.content);
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
                        <div className="container-buttons-page">
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