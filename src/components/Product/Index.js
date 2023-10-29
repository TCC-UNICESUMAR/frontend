import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Api from "../../config/Service/Api"

import Modal from '../Modal';
import './Index.css';

import pic_about_us from './../../static/img/pic_about_us.png';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";

function Product(props) {

    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const [state, setState] = useState("undefined");

    async function editDonation(id) {
        try {
            navigate(`/minha_doacao/${id}`, { replace: true });
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteDonation(id) {
        console.log(id)
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

    return (
        <div className="donation">
            <Modal 
                message={"Falha ao deletar a doação!"}
                state={state}
                redirect={"/perfil"}
            />
            {
                props.donation.product.images.map( image =>
                    <div className='donation-container-img' key={image.id}>
                        <img src={image.url} />
                    </div>  
                
                )
               
            }
            <div>
                <h2 className='donation-title'>{props.donation.product.name}</h2>
                <p className='donation-description'>{props.donation.product.description}</p>
                <div className='donation-second-content'>
                <p className='donation-category'>{props.donation.product.category.categoryName}</p>
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
                            <button id='btn-request'>Solicitar</button>
                            <button id='btn-msg'><CiLocationArrow1 className='icon-donation' /></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Product;