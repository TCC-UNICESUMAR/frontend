import { useForm } from "react-hook-form";
import { useState } from "react";

import Api from '../../config/Service/Api'

import Header from "../../components/Header";

import '../../default.css';

function Create_donate() {

    const accessToken = localStorage.getItem('accessToken');

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    //Submit donate
    async function createDonate(data) {
        console.log(data)
        try {
            await Api.post("/api/v1/donation", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

        } catch (err) {
            alert('Prencha todos os campos corretamente!!!');
        }
    };

    return (
        <>
            <Header />
            <form className="form-double" onSubmit={handleSubmit(createDonate)}>
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

export default Create_donate;