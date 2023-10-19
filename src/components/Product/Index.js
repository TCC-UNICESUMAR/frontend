import { useNavigate } from 'react-router-dom';

import Api from "../../config/Service/Api"

import './Index.css';

import pic_about_us from './../../static/img/pic_about_us.png';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";


function Product(props) {

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    async function editProduct(id) {
        try {
            navigate(`/minha_doacao/${id}`, { replace: true });
        } catch (error) {
            alert('Edit failed! Try again.');
        }
    }

    async function deleteProduct(id) {
        try {
            await Api.delete(`/api/v1/donation/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            window.location.reload()

        } catch (err) {
            alert('Delete failed! Try again.');
        }
    }

    return (
        <div className="donation">
            {
                <div className='donation-container-img'>
                    <img src={pic_about_us} />
                </div>
            }
            <div className='container-button-donation'>
                {props.isEdit === true ?
                    <button
                        className="button-donation-edit"
                        type={"button"}
                        value={"Editar"}
                        onClick={() => editProduct(props.donation.product.productId)}
                    ><CiEdit className='icon-donation'/></button>
                    : null
                }

                {props.isEdit === true ?
                    <button
                        className="button-donation-delete"
                        type={"button"}
                        value={"Excluir"}
                        onClick={() => deleteProduct(props.donation.product.productId)}
                    ><CiTrash className='icon-donation' /></button>
                    : null
                }
            </div>
            <div>
                <h2 className='donation-title'>{props.donation.product.name}</h2>
                <p className='donation-description'>{props.donation.product.description}</p>
                <div className='donation-second-content'>
                    <p className='donation-category'>{props.donation.product.category.categoryName}</p>
                    <button>Botão</button>
                </div>
            </div>
        </div>
    );
}

export default Product;