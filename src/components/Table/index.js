import { format, parseISO } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

import './index.css'
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { Link, Navigate } from 'react-router-dom';

function Table(props) {

    const data = props.donations;

    const formatDate = (date) => {
        return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR
        })
    }

    return (
        <table border="1">
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
                                        <button value={false}>
                                            <CiCircleRemove className='icon-button-table remove'
                                            />
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