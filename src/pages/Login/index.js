import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Api from '../../config/Service/Api'

import Header from "../../components/Header";

import './index.css';
import '../../default.css';

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    async function login(data) {

        try {
            const response = await Api.post('api/v1/auth/authenticate', data);

            localStorage.setItem('accessToken', response.data.data.accessToken)
            localStorage.setItem('refreshToken', response.data.data.refreshToken)

            navigate("/feed", { replace: true });
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }

    };

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit(login)}>
                <h2>Login</h2>
                <input
                    className="field"
                    type="email"
                    placeholder="*E-mail"
                    {...register("email", { required: true })}
                />
                {errors?.email?.type == 'required' &&
                    <p className="error-message">Preencha seu e-mail.</p>
                }
                <input
                    className="field"
                    type="password"
                    placeholder="*Senha"
                    {...register("password", { required: true })}
                />
                {errors?.password?.type == 'required' &&
                    <p className="error-message">Preencha sua senha.</p>
                }
                <p className="p-password-recover">
                    <Link className="p-password-recover" to={"/recuperar_senha"}>Esqueci minha senha</Link>
                </p>
                <input
                    className="btn-submit"
                    type="submit"
                    value="Entrar"
                />
                <p className="p-create-account">
                    Não possui uma conta? <Link to={"/registro_usuario"}>Junte-se a nós</Link>
                </p>
            </form>
        </>
    );
}

export default Login;