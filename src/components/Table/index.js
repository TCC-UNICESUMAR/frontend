import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import './index.css'
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useState } from "react";
import Api from "../../config/Service/Api";
import Modal from "../Modal";

function Table(props) {

    const data = props.donations;
    const [state, setState] = useState("undefined");
    const accessToken = localStorage.getItem('accessToken');

    const formatDate = (date) => {
        return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR
        })
    }

    async function notApproveDonation(id) {
        const request = {
            approved: false,
            idintermdiary: null,
            donationOrderId: id
        }
        try {
            await Api.post(`/api/v1/donation/sendDonorApproveDonation`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    }

    async function donorApproveDonation(id) {
        const request = {
            approved: true,
            idintermdiary: null,
            donationOrderId: id
        }
        try {
            await Api.post(`/api/v1/donation/sendDonorApproveDonation`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    }

    async function ongApproveDonation(id, status) {
        const request = {
            approved: status,
            donationOrderId: id
        }
        try {
            await Api.post(`/api/v1/donation/ongApproveDonation`, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    }

    if (props.donations == 0) {
        return (
            <h2>Não há solicitações no momento</h2>
        )
    }

    return (
        <>
            <Modal
                message={"Erro ao solicitar aprovação!"}
                state={state}
                redirect={"/feed"}
            />
            <h2>Solicitações para suas doações</h2>
            <table border="1">
                {
                    props.role === "ROLE_USER" ?
                        <thead>
                            <tr>
                                <th>Doação</th>
                                <th>Data</th>
                                <th>Solicitante</th>
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
                                        <button value={true}>
                                            {
                                                donationOrder.needAnIntermediary === true ?
                                                    <Link to={`/selecao_ong/${donationOrder.id}/${false}`}>
                                                        <CiCircleCheck className='icon-button-table approve' />
                                                    </Link>
                                                    :
                                                    <CiCircleCheck className='icon-button-table approve'
                                                        onClick={() => donorApproveDonation(donationOrder.id)}
                                                    />
                                            }
                                        </button>
                                        <button >
                                            <CiCircleRemove className='icon-button-table remove' onClick={() => notApproveDonation(donationOrder.id)} />
                                        </button>
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
                                    <td>
                                        <button value={true}>
                                            <CiCircleCheck className='icon-button-table approve' 
                                                onClick={() => ongApproveDonation(donationOrder.id, true)}
                                            />
                                        </button>
                                        <button >
                                            <CiCircleRemove className='icon-button-table remove' onClick={() => ongApproveDonation(donationOrder.id, false)} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table;