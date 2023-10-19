import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import '../../default.css';

import Header from '../../components/Header';
import Api from "../../config/Service/Api";


function User_register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    async function userRegister(data) {

        console.log(data)

        try {
            await Api.post('api/v1/user/register', data);

            navigate("/login", { replace: true });
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }

    };

    return (
        <>
            <Header />
            <form className="form-double" onSubmit={handleSubmit(userRegister)}>
                <h2>Cadastro</h2>
                <div className="container-main-double">
                    <div className="container-data-double">
                        <h3 className="title-data-double">Dados pessoais</h3>
                        <input
                            className="field"
                            type="text"
                            placeholder="*Nome completo"
                            {...register("name", { required: true })}
                        />
                        {errors?.name?.type == 'required' &&
                            <p className="error-message">O campo nome completo é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="email"
                            placeholder="*E-mail"
                            {...register("email", { required: true })}
                        />
                        {errors?.email?.type == 'required' &&
                            <p className="error-message">O campo e-mail é obrigatório.</p>
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
                            type="text"
                            placeholder="*CPF/CNPJ"
                            {...register("cnpjOrCpf", { required: true })}
                        />
                        {errors?.cnpjOrCpf?.type == 'required' &&
                            <p className="error-message">O campo CPF/CNPJ é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Telefone"
                            {...register("phone", { required: true })}
                        />
                        {errors?.phone?.type == 'required' &&
                            <p className="error-message">O campo telefone é obrigatório.</p>
                        }
                    </div>
                    <div className="container-data-double">
                        <h3 className="title-data-double">Dados endereço</h3>
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
    );
}

export default User_register;