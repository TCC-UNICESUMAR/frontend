import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Api from '../../config/Service/Api'

import '../../default.css';
import Header from "../../components/Header";

function Edit_donate() {

    const accessToken = localStorage.getItem('accessToken');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { donationId } = useParams();

    const [response, setResponse] = useState('');

    async function getDonationById() {
        try {
            const resp = await Api.get(`api/v1/donation/${donationId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setResponse(resp.data.body);
            console.log("Response donate: ",response)
        } catch (error) {
            alert('Error recovering category name! Try again!');
        }
    }

    useEffect(() => {
        getDonationById();
    }, [])


    return (
        <>
            <Header />
            <form className="form-double" onSubmit={handleSubmit("")}>
                <h2>Dados da doação</h2>
                <div className="container-main-double">
                    <div className="container-data-double">
                        <input
                            className="field"
                            type="text"
                            placeholder="*Título"
                            {...register("name", { required: true })}
                        />
                        {errors?.name?.type == 'required' &&
                            <p className="error-message">O campo título é obrigatório.</p>
                        }
                        <textarea
                            className="field-description"
                            type="text"
                            placeholder="*Descrição do produto"
                            {...register("description", { required: true, max: 50 })}
                        />
                        {errors?.description?.type == 'required' &&
                            <p className="error-message">O campo descrição é obrigatório.</p>
                        }
                        {errors?.description?.type == 'max' &&
                            <p className="error-message">Número máximo de caracteres é 50.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Categoria"
                            {...register("category", { required: true })}
                        />
                        {errors?.category?.type == 'required' &&
                            <p className="error-message">O campo categoria é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Quantidade"
                            {...register("quantity", { required: true })}
                        />
                        {errors?.quantity?.type == 'required' &&
                            <p className="error-message">O campo quantidade é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="file"
                            placeholder="*Foto"
                            multiple
                            {...register("photo", { required: false })}
                        />
                        {errors?.photo?.type == 'required' &&
                            <p className="error-message">O campo foto é obrigatório.</p>
                        }
                    </div>
                    <div className="container-data-double">
                        <input
                            className="field"
                            type="text"
                            placeholder="*CEP"
                            {...register("address.zipCode", { required: true })}
                        />
                        {errors?.zipCode?.type == 'required' &&
                            <p className="error-message">O campo CEP é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Endereço"
                            {...register("address.streetName", { required: true })}
                        />
                        {errors?.streetName?.type == 'required' &&
                            <p className="error-message">O campo endereço é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Cidade"
                            {...register("address.city", { required: true })}
                        />
                        {errors?.city?.type == 'required' &&
                            <p className="error-message">O campo cidade é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*UF"
                            {...register("address.uf", { required: true })}
                        />
                        {errors?.uf?.type == 'required' &&
                            <p className="error-message">O campo UF é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Complemento"
                            {...register("address.complement", { required: true })}
                        />
                        {errors?.complement?.type == 'required' &&
                            <p className="error-message">O campo complemento é obrigatório.</p>
                        }
                    </div>
                </div>
                <input
                    className="btn-submit"
                    type="submit"
                    value="Cadastrar"
                />
            </form>
        </>
    )
}

export default Edit_donate;