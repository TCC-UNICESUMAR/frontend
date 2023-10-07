
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Api from "../../config/Service/Api";

import '../../default.css';
import './index.css';

function Profile() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

   async function createDonate(data) {

        console.log(data)

        try {
            const response = await Api.post('', data);  

            localStorage.setItem('accessToken',response.data.data.accessToken)
            localStorage.setItem('refreshToken',response.data.data.refreshToken)

            navigate("/feed", { replace: true });
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }

        return data;

    };

    return(
        <>
            <Header />
            <div className="container-main-profile">
                <div className="container-photo-user">
                    <img></img>
                    <h2>Username</h2>
                    <Link to="">x doações ativas</Link>
                </div>
                <form className="form-double" onSubmit={handleSubmit(createDonate)}>
                    <h2>Dados da conta</h2>
                        <div className="container-main-double">
                            <div className="container-data-double">
                                <h3 className="title-data-double">Dados pessoais</h3>
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*Nome"
                                    {...register("name", {required: true})}
                                />
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*CPF/CNPJ"
                                    {...register("cpf_cnpj", {required: true})}
                                />
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*Telefone"
                                    {...register("telephone", {required: true})}
                                />
                                <input 
                                    className="field"
                                    type="text"
                                    placeholder="*CEP"
                                    {...register("cep", {required: true})}
                                />
                            </div>
                            <div className="container-data-double">
                                <h3 className="title-data-double">Dados do sistema</h3>
                                <input 
                                    className="field"
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
                        value="Cadastrar"
                    />
                </form>
            </div>
        </>
    )
}

export default Profile;