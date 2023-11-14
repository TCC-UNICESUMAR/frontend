import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import './../Table/index.css'
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Api from "../../config/Service/Api";
import Modal from "../Modal";

function Table_status_donation(props) {

    const data = props.donations;
    const [state, setState] = useState("undefined");
    const [donationOrder, setDonationOrder] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [name, setName] = useState('');

    const formatDate = (date) => {
        return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR
        })
    }

    async function getUser() {
        try {
            let response = await Api.get('/api/v1/user/getUserBySession', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setName(response.data.body.name);
        } catch (error) {
            alert('Error Get User By Session! Try again!');
        }
    }

    async function waitingDonorSend(id) {
        const request = {donationOrderId : id}
        try {
            await Api.put(`/api/v1/donation/deliveryByDonor`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    }

    async function waitingReceivedPickup(id) {
        const request = {donationOrderId : id}
        try {
            await Api.put(`/api/v1/donation/finishedDonation`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    if (props.donations == 0) {
        return (
            <h2 className="not-found">Não há solicitações no momento</h2>
        )
    }

    return (
        <>
            <Modal
                message={"Erro! Tente novamente."}
                state={state}
                redirect={"/feed"}
            />
            
            <table border="1">
                {
                    props.role === "ROLE_USER" ?
                        <thead>
                            <tr>
                                <th>Doação</th>
                                <th>Solicitante</th>
                                <th>Data</th>
                                <th>Motivo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        :
                        <thead>
                            <tr>
                                <th>Doação</th>
                                <th>Data</th>
                                <th>Doador</th>
                                <th>Solicitante</th>
                                <th>Motivo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                }

                <tbody>
                    {
                        props.role === "ROLE_USER" ?

                            data.map((donationOrder) => (
                                <tr className='line-data' key={donationOrder.id}>
                                    <td>{donationOrder.donation.product.name}</td>
                                    <td>{donationOrder.received.name}</td>
                                    <td>{formatDate(donationOrder.createdAt)}</td>
                                    <td className='field-reason'>{donationOrder.reason}</td>
                                    <td className='container-button-status'>
                                    {(() => {
                                            switch (donationOrder.donationStatus.status) {
                                                case 'WAITING_DONOR_APPROVED':
                                                    if(donationOrder.received.name === name){
                                                        return <p>Esperando Dono Aprovar</p>
                                                    }else{
                                                        return <Link to="/solitacoes_doacao">Aprovar</Link>
                                                    }
                                                case 'WAITING_ONG_APPROVED':
                                                    return <p>Esperando Ong aprovar</p>
                                                case 'WAITING_DONOR_SEND':
                                                    if(donationOrder.received.name === name){
                                                        return <p>Esperando chegar na Ong</p>
                                                    }
                                                    else if(donationOrder.donor.name === name){
                                                        return <p>Esperando você enviar até a ONG</p>
                                                    }else{
                                                        return <Link to="/solitacoes_doacao">Aprovar</Link>
                                                    }
                                                case 'WAITING_RECEIVED_PICKUP':
                                                    return <p>Esperando você retirar</p>
                                                case 'CANCELED':
                                                    return <p>Cancelado</p>
                                                case 'SUCCESS':
                                                    return <p>Finalizado</p>
                                                default:
                                                    return null
                                            }
                                        })()}
                                        
                                    </td>
                                </tr>
                            ))

                            :

                            data.map((donationOrder) => (
                                <tr className='line-data' key={donationOrder.id}>
                                    <td>{donationOrder.donation.product.name}</td>
                                    <td>{formatDate(donationOrder.createdAt)}</td>
                                    <td>{donationOrder.donor.name}</td>
                                    <td>{donationOrder.received.name}</td>
                                    <td className='field-reason'>{donationOrder.reason}</td>
                                    <td>{(() => {
                                            switch (donationOrder.donationStatus.status) {
                                                case 'WAITING_DONOR_APPROVED':
                                                    return <p>Esperando Dono Aprovar</p>
                                                case 'WAITING_ONG_APPROVED':
                                                    return <p>Esperando ONG Aprovar</p>
                                                case 'WAITING_DONOR_SEND':
                                                    return <p>Esperando Dono Enviar</p>
                                                case 'WAITING_RECEIVED_PICKUP':
                                                    return <p>Esperando retirar</p>
                                                case 'CANCELED':
                                                    return <p>Cancelado</p>
                                                case 'SUCCESS':
                                                    return <p>Finalizado</p>
                                                default:
                                                    return null
                                            }
                                        })()}</td>
                                    <td>
                                        {(() => {
                                            switch (donationOrder.donationStatus.status) {
                                                case 'WAITING_DONOR_APPROVED':
                                                    return <p>Aguarde</p>
                                                case 'WAITING_ONG_APPROVED':
                                                    return <Link to="/solitacoes_doacao">Aprovar</Link>
                                                case 'WAITING_DONOR_SEND':
                                                    return <Link
                                                        onClick={() => waitingDonorSend(donationOrder.id)}>
                                                        Confirmar entrega
                                                    </Link>
                                                case 'WAITING_RECEIVED_PICKUP':
                                                    return <Link
                                                        onClick={() => waitingReceivedPickup(donationOrder.id)}>
                                                        Confirmar retirada
                                                    </Link>
                                                case 'CANCELED':
                                                    return <p>Cancelado</p>
                                                case 'SUCCESS':
                                                    return <p>Finalizado</p>
                                                default:
                                                    return null
                                            }
                                        })()}
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table_status_donation;