import * as React from "react"
import { useForm } from "react-hook-form";

import './index.css';
import '../../default.css';

import Header from '../../components/Header';

function User_register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitData = (data) => {
        console.log(data)
    }

    return(
        <>
            <Header />
            <form method="" onSubmit={handleSubmit(submitData)}>
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
                {...register("cpf_cnpj", {required: true})}
            />
            {errors?.cpf_cnpj?.type == 'required' && 
                <p className="error-message">O campo CPF/CNPJ é obrigatório.</p>
            }
            <input 
                className="field"
                type="text"
                placeholder="*Telefone"
                {...register("telephone", {required: true})}
            />
            {errors?.telephone?.type == 'required' && 
                <p className="error-message">O campo telefone é obrigatório.</p>
            }
            <input 
                className="field"
                type="text"
                placeholder="*CEP"
                {...register("cep", {required: true})}
            />
            {errors?.cep?.type == 'required' && 
                <p className="error-message">O campo CEP é obrigatório.</p>
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