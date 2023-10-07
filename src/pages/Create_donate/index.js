import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Api from '../../config/Service/Api'

import Header from "../../components/Header";

import '../../default.css';

function Create_donate() {

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
            <form className="form-double" onSubmit={handleSubmit(createDonate)}>
                <h2>Dados da doação</h2>
                    <div className="container-main-double">
                        <div className="container-data-double">
                            <input 
                                className="field"
                                type="text"
                                placeholder="*Título"
                                {...register("title", {required: true})}
                            />
                            {errors?.title?.type == 'required' && 
                                <p className="error-message">O campo título é obrigatório.</p>
                            }
                            <input 
                                className="field-description"
                                type="text"
                                placeholder="*Descrição do produto"
                                {...register("description", {required: true})}
                            />
                            {errors?.description?.type == 'required' && 
                                <p className="error-message">O campo descrição é obrigatório.</p>
                            }
                            <input 
                                className="field"
                                type="text"
                                placeholder="*Categoria"
                                {...register("category", {required: true})}
                            />
                            {errors?.category?.type == 'required' && 
                                <p className="error-message">O campo categoria é obrigatório.</p>
                            }
                            <input 
                                className="field"
                                type="file"
                                placeholder="*Foto"
                                multiple
                                {...register("photo", {required: true})}
                            />
                            {errors?.photo?.type == 'required' && 
                                <p className="error-message">O campo foto é obrigatório.</p>
                            }
                        </div>
                        <div className="container-data-double">
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
                                className="field"
                                type="text"
                                placeholder="*Endereço"
                                {...register("address", {required: true})}
                            />
                            {errors?.address?.type == 'required' && 
                                <p className="error-message">O campo endereço é obrigatório.</p>
                            }
                            <input 
                                className="field"
                                type="text"
                                placeholder="*Cidade"
                                {...register("city", {required: true})}
                            />
                            {errors?.city?.type == 'required' && 
                                <p className="error-message">O campo cidade é obrigatório.</p>
                            }
                            <input 
                                className="field"
                                type="text"
                                placeholder="*UF"
                                {...register("uf", {required: true})}
                            />
                            {errors?.uf?.type == 'required' && 
                                <p className="error-message">O campo UF é obrigatório.</p>
                            }
                            <input 
                                className="field"
                                type="text"
                                placeholder="*Complemento"
                                {...register("complement", {required: true})}
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
    )
}

export default Create_donate;