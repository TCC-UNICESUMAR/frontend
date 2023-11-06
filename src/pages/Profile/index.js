import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Api from "../../config/Service/Api";

import '../../default.css';
import './index.css';
import profileDefault from './../../static/img/edit_profile.png';

function Profile() {

    const [response, setResponse] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    async function getUser() {
        try {
            let response = await Api.get('/api/v1/user/getUserBySession', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setResponse(response.data.body);
        } catch (error) {
            alert('Error Get User By Session! Try again!');
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        getUser();
    }, [])

    console.log(response)
    return (
        <>
            <Header />
            <div className="container-main-profile">
                <div className="container-photo-user">
                    {response.profileImageId == ! null ?
                        <div className='back-photo-user'>
                            <img></img>
                        </div>
                        :
                        <div className='back-photo-user'>
                            <img src={profileDefault} />
                        </div>
                    }
                    <h2>{response.name}</h2>
                    <Link to="/minhas_doacoes">x doações ativas</Link>
                </div>
                <form className="form-double" onSubmit={handleSubmit()}>
                    <h2>Dados da conta</h2>
                    <div className="container-main-double">
                        <div className="container-data-double">
                            <h3 className="title-data-double">Dados pessoais</h3>
                            <input
                                className="field"
                                defaultValue={response.name}
                                type="text"
                                placeholder="*Nome"
                                {...register("name", { required: true })}
                            />
                            <input
                                className="field"
                                defaultValue={response.cnpjOrCpf}
                                type="text"
                                placeholder="*CPF/CNPJ"
                                {...register("cnpjOrCpf", { required: true })}
                            />
                            <input
                                className="field"
                                defaultValue={response.phone}
                                type="text"
                                placeholder="*Telefone"
                                {...register("phone", { required: true })}
                            />
                        </div>
                        <div className="container-data-double">
                            <h3 className="title-data-double">Dados do sistema</h3>
                            <input
                                className="field"
                                defaultValue={response.email}
                                type="text"
                                placeholder="*E-mail"
                                {...register("email", { required: true })}
                            />
                            <input
                                className="field"
                                type="text"
                                placeholder="*Confirmar e-mail"
                                {...register("email_confirm", { required: true })}
                            />
                            <input
                                className="field"
                                type="text"
                                placeholder="*Senha"
                                {...register("password", { required: true })}
                            />
                            <input
                                className="field"
                                type="text"
                                placeholder="*Confirmar senha"
                                {...register("password_confirm", { required: true })}
                            />
                        </div>
                    </div>
                    <h3 className="title-data-double">Dados de endereço</h3>
                    <div className='container-address'>
                        <div className='content-address'>
                            <input
                                className="field"
                                defaultValue={response.cep}
                                type="text"
                                placeholder="*CEP"
                                {...register("cep", { required: true })}
                            />
                            <input
                                className="field"
                                type="text"
                                placeholder="*Endereço"
                                defaultValue={response.streetName}
                                {...register("address.streetName", { required: true })}
                            />
                            {errors?.streetName?.type == 'required' &&
                                <p className="error-message">O campo endereço é obrigatório.</p>
                            }
                            <input
                                className="field"
                                type="text"
                                placeholder="*Cidade"
                                defaultValue={response.city}
                                {...register("address.city", { required: true })}
                            />
                        </div>
                        <div className='content-address'>
                            {errors?.city?.type == 'required' &&
                                <p className="error-message">O campo cidade é obrigatório.</p>
                            }
                            <input
                                className="field"
                                type="text"
                                placeholder="*UF"
                                defaultValue={response.uf}
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
                        value="Enviar"
                    />
                </form>
            </div>
        </>
    )
}

export default Profile;