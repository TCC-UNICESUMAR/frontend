import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import Catalog from "../../components/Catalog/Index";
import Header from "../../components/Header";

import './index.css'

import Api from "../../config/Service/Api";
import axios from "axios";
import Loading from "../../components/Loading";


function Feed() {

    const accessToken = localStorage.getItem('accessToken');
    const ufDefault = jwt_decode(accessToken).UF;

    const [donations, setDonations] = useState([]);
    const [page, setPage] = useState(1);
    const [microRegion, setMicroRegion] = useState([]);
    const [state, setState] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ufSelection, setUfSelection] = useState(ufDefault);
    const [citySelection, setCitySelection] = useState();

    function updateListMicroRegion(uf) {
        setUfSelection(uf);
        listMicroRegion(uf);
        fetchMoreProductsState(uf);
    }

    function updateListCity(city) {
        setCitySelection(city);
        fetchMoreProductsCity(city);
    }

    async function fetchMoreProducts() {
        const response = await Api.get(`/api/v1/donation/region/uf/${ufDefault}`);
        setDonations([...donations, ...response.data.body.content])
        setPage(page + 1);
        setLoading(false);
    }

    async function fetchMoreProductsState(uf) {
        const response = await Api.get(`/api/v1/donation/region/uf/${uf}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setDonations([])
        setDonations([...response.data.body.content])
        setPage(page + 1);
    }

    async function fetchMoreProductsCity(city) {
        const response = await Api.get(`/api/v1/donation/city?cities=${city}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setDonations([])
        setDonations([...response.data.body])
        setPage(page + 1);
    }

    async function listMicroRegion(uf) {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/microrregioes`)
            .then(function (response) {
                setMicroRegion(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function listState() {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(function (response) {
                setState(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function loadCategories() {
        try {
            const response = await Api.get(`/api/v1/category`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setCategories(response.data.body);
        } catch (error) {
            alert('Error recovering category name! Try again!');
        }
    }

    useEffect(() => {
        fetchMoreProducts();
        listMicroRegion(ufSelection);
        listState();
        loadCategories();
    }, [])

    if (loading) {
        return(
            <>
                <Header />
                <Loading />
            </>
        )
    }

    if (donations == 0) {
        return (
            <>
                <Header />
                <div className="container-feed">
                <div className="container-filter-feed-off">
                    <h3>Estados</h3>
                    <select className="filter-select" defaultValue={ufDefault}
                        onChange={e => updateListMicroRegion(e.target.value)}
                        >
                        <option selected disabled hidden>
                            *Selecione um estado
                        </option>
                        {state.map(uf => (<option key={uf.id}> {uf.sigla} </option>))}
                    </select>
                    <h3>Cidades</h3>
                    <select className="filter-select" 
                        onChange={e => updateListCity(e.target.value)}
                    >
                        <option selected disabled hidden>*Selecione uma cidade</option>
                        {microRegion.map(city => (<option key={city.id}> {city.nome} </option>) )}
                    </select>
                </div>
                <div className="container-list-donation-off">
                    <h2 className="title-page-feed-off">Não há doações disponíveis no momento</h2>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="container-feed">
                <div className="container-filter-feed">
                    <h3>Estados</h3>
                    <select className="filter-select" defaultValue={ufDefault}
                        onChange={e => updateListMicroRegion(e.target.value)}
                        >
                        <option selected disabled hidden>
                            *Selecione um estado
                        </option>
                        {state.map(uf => (<option key={uf.id}> {uf.sigla} </option>))}
                    </select>
                    <h3>Cidades</h3>
                    <select className="filter-select" 
                        onChange={e => updateListCity(e.target.value)}
                    >
                        <option selected disabled hidden>*Selecione uma cidade</option>
                        {microRegion.map(city => (<option key={city.id}> {city.nome} </option>) )}
                    </select>
                </div>
                <div className="container-list-donation">
                    <div>
                        <h2 className="title-page-feed">Doações disponíveis</h2>
                    </div>
                    <Catalog donations={donations} />
                </div>
            </div>
        </>
    )
}

export default Feed;