import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Api from '../../config/Service/Api';
import './index.css'

function Reason_donation() {

    const accessToken = localStorage.getItem('accessToken');
    const { donationId } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [state, setState] = useState("undefined");

    async function createDonateOrder(data) {
        try {
            await Api.post(`api/v1/donation/createOrderDonation/${donationId}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setState("success");
        } catch (err) {
            setState("error");
        }
    };

    return (
        <>
        <Header />
        <Modal 
            message={"Houve um erro ao registrar o motivo!"}
            state={state}
            redirect={"/feed"}
        />
            <form className='form-request-donation' onSubmit={handleSubmit(createDonateOrder)}>
                <h2>Descreva o motivo para solicitar a doação</h2>
                <input
                    className='field'
                    type="text"
                    placeholder='*Ex: Para uso pessoal'
                    {...register("reason", { required: true, minLength: 15, maxLength: 100 })}
                    />
                    {errors?.reason?.type == 'required' &&
                        <p className="error-message">O campo motivo é obrigatório.</p>
                    }
                    {errors?.reason?.type == 'minLength' &&
                        <p className="error-message">O campo motivo precisa ter no mínimo 15 caracteres.</p>
                    }
                    {errors?.reason?.type == 'maxLength' &&
                        <p className="error-message">O campo motivo precisa ter no máximo 100 caracteres.</p>
                    }
                <input 
                    className='btn-submit'
                    type="submit"
                    value="Solicitar"
                />
            </form>
        </>
    )
}

export default Reason_donation;