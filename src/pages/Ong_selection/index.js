import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Api from "../../config/Service/Api";

import Header from "../../components/Header";
import Modal from "../../components/Modal";

import '../../default.css';
import { useParams } from "react-router-dom";

function Ong_selection() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const accessToken = localStorage.getItem('accessToken');
    const [ongs, setOngs] = useState([]);
    const [state, setState] = useState("undefined");
    const { donationOrder } = useParams();

    const [receivedName, setReceivedName] = useState('');
    const [donationName, setDonationName] = useState('');

    async function getOngsByDonationCity() {
        try {
            const response = await Api.get(`/api/v1/donation/findDonationOrderById/${donationOrder}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setReceivedName(response.data.body.received.name);
            setDonationName(response.data.body.donation.product.name);
                    
            const responseOngs = await Api.get(`/api/v1/user/findAllOngs/${response.data.body.donation.address.city.cityName}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        
            setOngs(responseOngs.data.body.content);
        } catch (error) {
            console.log('Error Get Donation Orer By Id');
        }
    }

    async function approveDonationByDonor(data) {
        const id = data.idIntermediary;
        data = {idIntermediary: id, approved: true, donationOrderId: donationOrder}
        try {
            await Api.post(`/api/v1/donation/sendDonorApproveDonation`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    };

    useEffect(() => {
        getOngsByDonationCity();
    }, [])

    return (
        <>
            <Header />
            <Modal 
                message={"Erro ao solicitar aprovação!"}
                state={state}
                redirect={"/"}
            />
            <form onSubmit={handleSubmit(approveDonationByDonor)}>
                <h2>Doação de {donationName} para {receivedName}</h2>
                <p className="p-ong-selection">Selecione a ONG mais próxima para direcionar sua doação:</p>
                {ongs.map((ong) => (
                    <div className="container-radio" key={ong.id}>
                        <input
                            type="radio"
                            name="ong_address"
                            value={ong.id}
                            {...register("idIntermediary", { required: true })}
                        />
                        <label>
                            {ong.name} - {ong.address.streetName}, {ong.address.city.cityName} -
                            {ong.address.state.uf}, {ong.address.zipCode}
                        </label>
                    </div>
                ))}
                <br></br>
                {errors?.idIntermediary?.type == 'required' &&
                    <p className="error-message">Selecione uma das ONGs.</p>
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

export default Ong_selection;