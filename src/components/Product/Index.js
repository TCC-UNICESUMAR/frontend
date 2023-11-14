import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import Api from "../../config/Service/Api"

import Modal from '../Modal';
import Carousel from '../Carousel'
import './Index.css';

import pic_about_us from './../../static/img/pic_about_us.png';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";

function Product(props) {

    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const [state, setState] = useState("undefined");

    const [request, setRequest] = useState(false);

    async function editDonation(id) {
        try {
            navigate(`/minha_doacao/${id}`, { replace: true });
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteDonation(id) {
        try {
            await Api.delete(`/api/v1/donation/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setState("success");
        } catch (err) {
            setState("error")
        }
    }

    async function propsDonation(id) {
        try {
            navigate(`/motivo/${id}`, { replace: true });
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function sendUser(id) {
        try {
            navigate(`/chat/${id}`, { replace: true });
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    return (
        <div className="donation">
            <Modal
                message={"Falha ao deletar a doação!"}
                state={state}
                redirect={"/perfil"}
            />

            <Carousel data={props.donation.product.images} />

            <div>
                <h2 className='donation-title'>{props.donation.product.name}</h2>
                <p className='donation-description'>{props.donation.product.description}</p>
                <div className='donation-second-content'>
                    <p className='donation-city'>
                        {props.donation.address.city.cityName}-{props.donation.address.state.uf}
                    </p>
                    {props.page === "my_donate" ?
                        <div className='container-button-donation-edit'>
                            <button
                                className="button-donation-edit"
                                type={"button"}
                                value={"Editar"}
                                onClick={() => editDonation(props.donation.id)}
                            ><CiEdit className='icon-donation' /></button>

                            <button
                                className="button-donation-delete"
                                type={"button"}
                                value={"Excluir"}
                                onClick={() => deleteDonation(props.donation.id)}
                            ><CiTrash className='icon-donation' /></button>
                        </div>
                        :
                        <div className='container-button-feed'>
                            <button id='btn-request' onClick={() => propsDonation(props.donation.id)}>
                                Solicitar
                            </button>
                            <button id='btn-msg' onClick={() => sendUser(props.donation.userBy.id)}>
                                <CiLocationArrow1 className='icon-donation' />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Product;