import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import './index.css'
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Link, Navigate } from 'react-router-dom';
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
        console.log(id)
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

    return (
        <table border="1">
            <Modal
                message={"Erro ao solicitar aprovação!"}
                state={state}
                redirect={"/"}
            />
            <thead>
                <tr>
                    <th>Doação</th>
                    <th>Solicitante</th>
                    <th>Data</th>
                    <th>Motivo</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((donationOrder) => (
                    <tr className='line-data' key={donationOrder.id}>
                        <td>{donationOrder.donation.product.name}</td>
                        <td>{donationOrder.received.name}</td>
                        <td>{formatDate(donationOrder.createdAt)}</td>
                        <td className='field-reason'>{donationOrder.reason}</td>
                        <td>
                            {
                                donationOrder.donationStatus.status === "WAITING_DONOR_APPROVED"
                                    ?
                                    <>
                                        <button value={true}>
                                            {
                                                donationOrder.needAnIntermediary === true ?
                                                    <Link to={`/selecao_ong/${donationOrder.id}/${false}`}>
                                                        <CiCircleCheck className='icon-button-table approve' />
                                                    </Link>
                                                    :
                                                    <CiCircleCheck className='icon-button-table approve' />
                                            }

                                        </button>
                                        <button >
                                            <CiCircleRemove className='icon-button-table remove' onClick={() => notApproveDonation(donationOrder.id)}/>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <p>{donationOrder.donationStatus.status === "SUCCESS" ?
                                            <b>Aceito</b>
                                            :
                                            <b>Recusado</b>
                                        }
                                        </p>
                                    </>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;