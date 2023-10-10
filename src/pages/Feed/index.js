import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Catalog from "../../components/Catalog/Index";
import Header from "../../components/Header";

import './index.css'

import Api from "../../config/Service/Api";


function Feed() {

    const [categories, setCategories] = useState([]);
    const [donations, setDonations] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    async function fetchMoreProducts() {
        const response = await Api.get('/api/v1/donation', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setDonations([...donations, ...response.data.data.content])
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])


    return(
        <>
            <Header />
            <h2 className="title-page-feed">Doações disponíveis</h2>
            <Catalog donations={donations}/>
        </>
    )
}

export default Feed;