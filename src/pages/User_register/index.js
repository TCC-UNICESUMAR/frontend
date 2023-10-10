import * as React from "react"
import { useForm } from "react-hook-form";

import '../../default.css';

import Header from '../../components/Header';
import Api from "../../config/Service/Api";
import { Navigate } from "react-router-dom";

function User_register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function userRegister(data) {

        console.log(data)

        try {
            await Api.post('api/v1/user/register', data);
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
        
    };

    return(
        <>
            <Header />
            <form method="" onSubmit={handleSubmit(userRegister)}>
            <h2>Cadastro</h2>
            <input 
                className="field"
                type="text"
                placeholder="*Nome completo"
                {...register("name", {required: true})}
            />
            {errors?.name?.type == 'required' && 
                <p className="error-message">O campo nome completo é obrigatório.</p>
            }
            <input 
                className="field"
                type="email"
                placeholder="*E-mail"
                {...register("email", {required: true})}
            />
            {errors?.email?.type == 'required' && 
                <p className="error-message">O campo e-mail é obrigatório.</p>
            }
            <input 
                className="field"
                type="password"
                placeholder="*Senha"
                {...register("password", {required: true})}
            />
            {errors?.password?.type == 'required' && 
                <p className="error-message">O campo senha é obrigatório.</p>
            }
            <input 
                className="field"
                type="text"
                placeholder="*CPF/CNPJ"
                {...register("cnpjOrCpf", {required: true})}
            />
            {errors?.cnpjOrCpf?.type == 'required' && 
                <p className="error-message">O campo CPF/CNPJ é obrigatório.</p>
            }
            <input 
                className="field"
                type="text"
                placeholder="*Telefone"
                {...register("phone", {required: true})}
            />
            {errors?.phone?.type == 'required' && 
                <p className="error-message">O campo telefone é obrigatório.</p>
            }
            <input 
                className="btn-submit"
                type="submit"
                value="Cadastrar"
            />
        </form>
        </>
    );
}

export default User_register;