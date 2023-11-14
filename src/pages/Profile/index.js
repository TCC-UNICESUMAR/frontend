import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Header from "../../components/Header";
import Api from "../../config/Service/Api";

import '../../default.css';
import './index.css';
import profileDefault from './../../static/img/edit_profile.png';
import { CiEdit } from "react-icons/ci";
import New_photo from '../../components/New_photo';
import Loading from '../../components/Loading';

function Profile() {

    const [response, setResponse] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const [id, setId] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [complement, setComplement] = useState('');
    const [streetName, setStreetName] = useState('');

    const [loading, setLoanding] = useState(true);
    const [state, setState] = useState(false);
    console.log("state profile:", state)

    var role = "";

    if (accessToken !== null) {
        var decoded = jwt_decode(accessToken);
        role = decoded.roles[0].authority;
    }

    async function getUser() {
        try {
            let response = await Api.get('/api/v1/user/getUserBySession', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setResponse(response.data.body);
            setId(response.data.body.id)
            setCep(response.data.body.address.zipCode)
            setStreetName(response.data.body.address.streetName)
            setUf(response.data.body.address.state.stateName)
            setCity(response.data.body.address.city.cityName)
            setComplement(response.data.body.address.complement)
            setLoanding(false);
        } catch (error) {
            alert('Error Get User By Session! Try again!');
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function userUpdate(data) {
        try {
            var url = "api/v1/user/" + id;
            await Api.put(url, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,

                }
            });
            setState("success");
        } catch (err) {
            setState("error");
        }
    };

    useEffect(() => {
        getUser();
    }, [])

    if (loading) {
        return(
            <>
                <Header />
                <Loading />
            </>
        )
    }
    
    return (
        <>
            <Header />
            <New_photo state={state} imgUser={response.profileImage}/>
            <div className="container-main-profile">
                <div className="container-photo-user">
                    {response.profileImage === null ?
                        <div className='back-photo-user'>
                            <img src={profileDefault} />
                            <CiEdit className='edit-photo-user'
                                onClick={() => setState(true)}
                            />
                        </div>
                        :
                        <div className='back-photo-user'>
                            <img src={response.profileImage} />
                            <CiEdit className='edit-photo-user'
                                onClick={() => setState(true)}
                            />
                        </div>
                    }
                    <h2 className='name-user'>{response.name}</h2>
                    {
                        role === "ROLE_USER" ? 
                        <Link to="/minhas_doacoes">x doações ativas</Link>
                        :
                        null
                    }
                </div>
                <form className="form-double" onSubmit={handleSubmit(userUpdate)}>
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
                            {errors?.name?.type == 'required' &&
                                <p className="error-message">O campo nome é obrigatório.</p>
                            }
                            <input
                                className="field"
                                defaultValue={response.cpfOrCnpj}
                                type="text"
                                placeholder="*CPF/CNPJ"
                                {...register("cnpjOrCpf", { required: true })}
                            />
                            {errors?.cpnjOrCpf?.type == 'required' &&
                                <p className="error-message">O campo CPF/CNPJ é obrigatório.</p>
                            }
                            <input
                                className="field"
                                defaultValue={response.phone}
                                type="text"
                                placeholder="*Telefone"
                                {...register("phone", { required: true })}
                            />
                            {errors?.phone?.type == 'required' &&
                                <p className="error-message">O campo telefone é obrigatório.</p>
                            }
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
                            {errors?.email?.type == 'required' &&
                                <p className="error-message">O campo e-mail é obrigatório.</p>
                            }
                            <input
                                className="field"
                                type="text"
                                placeholder="*Confirmar e-mail"
                                {...register("email_confirm", { required: true })}
                            />
                            {errors?.email_confirm?.type == 'required' &&
                                <p className="error-message">O campo confirmar e-mail é obrigatório.</p>
                            }
                            <input
                                className="field"
                                type="password"
                                placeholder="*Senha"
                                {...register("password", { required: true })}
                            />
                            {errors?.password?.type == 'required' &&
                                <p className="error-message">O campo senha é obrigatório.</p>
                            }
                            <input
                                className="field"
                                type="password"
                                placeholder="*Confirmar senha"
                                {...register("password_confirm", { required: true })}
                            />
                            {errors?.password_confirm?.type == 'required' &&
                                <p className="error-message">O campo confirmar senha é obrigatório.</p>
                            }
                        </div>
                    </div>
                    <h3 className="title-data-double">Dados de endereço</h3>
                    <div className='container-address'>
                        <div className='content-address'>
                            <input
                                className="field"
                                defaultValue={cep}
                                type="text"
                                placeholder="*CEP"
                                {...register("address.zipCode", { required: true })}
                            />
                            {errors?.zipCode?.type == 'required' &&
                                <p className="error-message">O campo cep é obrigatório.</p>
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
                        </div>
                        <div className='content-address'>
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
                        value="Enviar"
                    />
                </form>
            </div>
        </>
    )
}

export default Profile;