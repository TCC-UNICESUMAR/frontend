import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import Api from "../../config/Service/Api";

import Header from "../../components/Header";
import Table from "../../components/Table";

function Request_donation() {

    const accessToken = localStorage.getItem('accessToken');

    var role = "";

    if (accessToken !== null) {
        var decoded = jwt_decode(accessToken);
        role = decoded.roles[0].authority;
    }

    const [donationOrder, setDonationOrder] = useState([]);

    async function findAllDonationAndDonationsToApprove() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationsToApprove`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setDonationOrder([...donationOrder, ...response.data.body]);
        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    async function findAllDonationAndDonationsToApproveOng() {
        try {
            const response = await Api.get(`/api/v1/donation/findAllDonationsToOngApprove`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setDonationOrder([...donationOrder, ...response.data.body]);
        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    useEffect(() => {

        role === "ROLE_USER" ?
            findAllDonationAndDonationsToApprove() :
            findAllDonationAndDonationsToApproveOng()

    }, [])

    return (
        <div>
            <Header />
            <Table donations={donationOrder} role={role} />
        </div>
    )
}

export default Request_donation;