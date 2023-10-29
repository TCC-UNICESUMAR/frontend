import { useEffect, useState } from "react";

import Catalog from "../../components/Catalog/Index";
import Header from "../../components/Header";

import './index.css'

import Api from "../../config/Service/Api";


function Feed() {

    const [donations, setDonations] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [page, setPage] = useState(1);

    async function fetchMoreProducts() {
        const response = await Api.get(`/api/v1/donation/region/PR`);
        setDonations([...donations, ...response.data.body.content])
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMoreProducts();
    }, [])

    console.log(donations)

    if (donations == 0) {
        return(
            <>
                <Header />
                <h2 className="title-page-feed">Não há doações disponíveis</h2>
            </>
        )
    }

    return(
        <>
            <Header />
            <h2 className="title-page-feed">Doações disponíveis</h2>
            <Catalog donations={donations}/>
        </>
    )
}

export default Feed;