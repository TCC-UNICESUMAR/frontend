import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Api from "../../config/Service/Api";

import '../../default.css';
import './index.css';

function Profile() {

    const [response, setResponse] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    
    async function getUser() {
        try {
            const data = await Api.get('/api/v1/user/getUserBySession', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })  
           setResponse(data.data.data);
        } catch (error) {
            alert('Error Get User By Session! Try again!');
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        getUser();
    }, [])

    return(
        <>
            <Header />
            <div className="container-main-profile">
                <div className="container-photo-user">
                    <img></img>
                    <h2>Username</h2>
                    <Link to="/minhas_doacoes">x doações ativas</Link>
                </div>
                <form className="form-double" onSubmit={handleSubmit()}>
                    <h2>Dados da conta</h2>
                        <div className="container-main-double">
                            <div className="container-data-double">
                                <h3 className="title-data-double">Dados pessoais</h3>
                                <input 
                                    className="field"
                                    value={response.name}
                                    type="text"
                                    placeholder="*Nome"
                                    {...register("name", {required: true})}
                                />
                                <input 
                                    className="field"
                                    value={response.cnpjOrCpf}
                                    type="text"
                                    placeholder="*CPF/CNPJ"
                                    {...register("cnpjOrCpf", {required: true})}
                                />
                                <input 
                                    className="field"
                                    value={response.phone}
                                    type="text"
                                    placeholder="*Telefone"
                                    {...register("phone", {required: true})}
                                />
                                <input 
                                    className="field"
                                    value={response.cep}
                                    type="text"
                                    placeholder="*CEP"
                                    {...register("cep", {required: true})}
                                />
                            </div>
                            <div className="container-data-double">
                                <h3 className="title-data-double">Dados do sistema</h3>
                                <input
                                    className="field"
                                    value={response.email}
                                    type="text"
                                    placeholder="*E-mail"
                                    {...register("email", {required: true})}
                                />
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*Confirmar e-mail"
                                    {...register("email_confirm", {required: true})}
                                />
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*Senha"
                                    {...register("password", {required: true})}
                                />
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*Confirmar senha"
                                    {...register("password_confirm", {required: true})}
                                />
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