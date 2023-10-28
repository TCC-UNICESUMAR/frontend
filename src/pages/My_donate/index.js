import { useEffect, useState } from "react";

import Catalog from "../../components/Catalog/Index";
import Header from "../../components/Header";

import './index.css';

import Api from "../../config/Service/Api";

function My_donate() {

    const [donations, setDonations] = useState([]);
    const [donationActive, setDonationActive] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    async function fetchMoreProducts() {
        try {
            const responseUser = await Api.get(`/api/v1/user/getUserBySession`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const id = responseUser.data.data.id;

            const response = await Api.get(`/api/v1/donation/byUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setDonations(response.data.data.content)
            setDonationActive(response.data.data.content)
            console.log(donationActive)

        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])

    console.log(donations)

    return (
        <>
            <Header />
            <h2 className="title-page-mydonates">Minhas doações</h2>
            <div>
                <button onClick={''}>Doações ativas</button>
                <button onClick={''}>Doações inativas</button>
            </div>
            <Catalog 
                donations={donations}
                page={"my_donate"}
            />
        </>
    )
}

export default My_donate;