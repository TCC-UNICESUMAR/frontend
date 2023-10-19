import { useForm } from "react-hook-form";

import Header from "../../components/Header";

import '../../default.css';

function Password_recover() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit("")}>
                <h2>Digite sua nova senha</h2>
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
                    className="btn-submit"
                    type="submit"
                    value="Entrar"
                />
            </form>
        </>
    );
}

export default Password_recover;