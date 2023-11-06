import { useEffect, useState } from "react";
import Api from "../../config/Service/Api";

import Header from "../../components/Header";
import Table from "../../components/Table";

function Request_donation() {

    const accessToken = localStorage.getItem('accessToken');
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

    useEffect(() => {
        findAllDonationAndDonationsToApprove();
    }, [])

    if (donationOrder == 0) {
        return (
            <div>
                <Header />
                <h2>Não há soliticações para você no momento</h2>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <h2>Solicitações para suas doações</h2>
            <Table donations={donationOrder} />
        </div>
    )
}

export default Request_donation;