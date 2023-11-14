import { useForm } from "react-hook-form";
import { useState } from "react";

import Api from "../../config/Service/Api";

import '../../default.css';

import Header from '../../components/Header';
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

function User_register() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoanding] = useState(false);

    const [state, setState] = useState("undefined");

    const watchPassword = watch('password');

    async function userRegister(data) {
        try {
            await Api.post('api/v1/user/register', data);
            setLoanding(false)
            setState("success");
        } catch (err) {
            setState("error");
        }
    };

    if (loading) {
        return(
            <>
                            <Loading />
            </>
        )
    }

    return (
        <>
            <Header />
            <Modal
                message={"Usuário já cadastrado!"}
                state={state}
                redirect={"/"}
            />
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
                            {...register("password", { required: true, minLength: 7 })}
                        />
                        {errors?.password?.type == 'required' &&
                            <p className="error-message">O campo senha é obrigatório.</p>
                        }
                        {errors?.password?.type == 'minLength' &&
                            <p className="error-message">A senha deve conter 7 dígitos.</p>
                        }
                        <input
                            className="field"
                            type="password"
                            placeholder="*Confirmar senha"
                            {...register("passwordConfirmation", {
                                required: true,
                                minLength: 7,
                                validate: (value) => value == watchPassword,
                            })}
                        />
                        {errors?.passwordConfirmation?.type == 'validate' &&
                            <p className="error-message">As senhas inseridas não conferem.</p>
                        }
                        {errors?.passwordConfirmation?.type == 'required' &&
                            <p className="error-message">O campo para confirmar a senha é obrigatório.</p>
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