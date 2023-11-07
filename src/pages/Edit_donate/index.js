import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Api from '../../config/Service/Api'

import '../../default.css';
import Header from "../../components/Header";
import ca from "date-fns/esm/locale/ca/index.js";
import Modal from "../../components/Modal";

function Edit_donate() {

    const accessToken = localStorage.getItem('accessToken');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { donationId } = useParams();
    const [state, setState] = useState("undefined");
    const [response, setResponse] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [complement, setComplement] = useState('');
    const [streetName, setStreetName] = useState('');
    const [category, setCategory] = useState('');

    async function getDonationById() {
        try {
            const resp = await Api.get(`api/v1/donation/${donationId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setResponse(resp.data.body);
            setStreetName(resp.data.body.address.streetName)
            setUf(resp.data.body.address.state.uf)
            setCity(resp.data.body.address.city.cityName)
            setComplement(resp.data.body.address.complement)
            setCategory(resp.data.body.product.category.categoryName)
            setDescription(resp.data.body.product.description)
            setQuantity(resp.data.body.product.quantity)
            setName(resp.data.body.product.name)
            setCep(resp.data.body.address.zipCode)
            console.log("Response donate: ",response)
        } catch (error) {
            alert('Error recovering category name! Try again!');
        }
    }

    async function updateDonation(data) {
        try {
            const resp = await Api.put(`api/v1/donation/${donationId}`, data, {
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
        getDonationById();
    }, [])


    return (
        <>
            <Header />
            <Modal
                message={"Erro ao atualizar Doação!"}
                state={state}
                redirect={"/"}
            />
            <form className="form-double" onSubmit={handleSubmit(updateDonation)}>
                <h2>Dados da doação</h2>
                <div className="container-main-double">
                    <div className="container-data-double">
                        <input
                            className="field"
                            type="text"
                            placeholder="*Título"
                            defaultValue={name}
                            {...register("name", { required: true })}
                        />
                        {errors?.name?.type == 'required' &&
                            <p className="error-message">O campo título é obrigatório.</p>
                        }
                        <textarea
                            className="field-description"
                            type="text"
                            placeholder="*Descrição do produto"
                            defaultValue={description}
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
                            defaultValue={category}
                            {...register("category", { required: true })}
                        />
                        {errors?.category?.type == 'required' &&
                            <p className="error-message">O campo categoria é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Quantidade"
                            defaultValue={quantity}
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
                            defaultValue={cep}
                            {...register("address.zipCode", { required: true })}
                        />
                        {errors?.zipCode?.type == 'required' &&
                            <p className="error-message">O campo CEP é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Endereço"
                            defaultValue={streetName}
                            {...register("address.streetName", { required: true })}
                        />
                        {errors?.streetName?.type == 'required' &&
                            <p className="error-message">O campo endereço é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Cidade"
                            defaultValue={city}
                            {...register("address.city", { required: true })}
                        />
                        {errors?.city?.type == 'required' &&
                            <p className="error-message">O campo cidade é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*UF"
                            defaultValue={uf}
                            {...register("address.uf", { required: true })}
                        />
                        {errors?.uf?.type == 'required' &&
                            <p className="error-message">O campo UF é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Complemento"
                            defaultValue={complement}
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