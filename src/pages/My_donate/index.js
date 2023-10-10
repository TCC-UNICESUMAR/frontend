import { useEffect, useState } from "react";

import Catalog from "../../components/Catalog/Index";
import Header from "../../components/Header";

import './index.css';

import Api from "../../config/Service/Api";

function My_donate() {

    const [donations, setDonations] = useState([]);
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
            
        } catch (error) {
            alert('Error Get Products By User! Try again!');
        }
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])

    return(
        <>
            <Header />
            <h2 className="title-page-mydonates">Minhas doações</h2>
            <Catalog donations={donations} isEdit={true}/>
        </>
    )
}

export default My_donate;