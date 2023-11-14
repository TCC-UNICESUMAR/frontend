import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Api from '../../config/Service/Api';

import Header from "../../components/Header";
import Modal from "../../components/Modal";

import '../../default.css';
import axios from "axios";
import Loading from "../../components/Loading";

function Create_donate() {

    const [files, setFiles] = useState([]);

    const accessToken = localStorage.getItem('accessToken');

    const [categories, setCategories] = useState([]);

    const [state, setState] = useState("undefined");

    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function createDonate(data) {
        setLoading(true);
        let formData = new FormData();
        formData.append("body", JSON.stringify(data));

        for(let i = 0; i <= files.length; i++){
            formData.append("files", files[i])
        }
        
        try {
            await Api.post("/api/v1/donation", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'content-type': 'multipart/form-data'
                }
            })
            setLoading(false);
            setState("success");
        } catch (err) {
            setState("error");
        }
    };

    async function loadCategories() {
        try {
            const response = await Api.get(`/api/v1/category`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setCategories(response.data.body);
            setLoading(false);
        } catch (error) {
            alert('Error recovering category name! Try again!');
        }
    }

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(resp => {
            setUf(resp.data.uf)
            setStreetName(resp.data.logradouro)
            setCity(resp.data.localidade)
        });
    }

    useEffect(() => {
        loadCategories();
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
            <Modal
                message={"Você já cadastrou essa doação!"}
                state={state}
                redirect={"/"}
            />
            <form className="form-double" onSubmit={handleSubmit(createDonate)}>
                <h2>Dados da doação</h2>
                <div className="container-main-double">
                    <div className="container-data-double">
                        <input
                            className="field"
                            type="text"
                            placeholder="*Título"
                            {...register("name", { required: true })}
                        />
                        {errors?.name?.type == 'required' &&
                            <p className="error-message">O campo título é obrigatório.</p>
                        }
                        <textarea
                            className="field-description"
                            type="text"
                            placeholder="*Descrição do produto"
                            {...register("description", { required: true, max: 50 })}
                        />
                        {errors?.description?.type == 'required' &&
                            <p className="error-message">O campo descrição é obrigatório.</p>
                        }
                        {errors?.description?.type == 'max' &&
                            <p className="error-message">Número máximo de caracteres é 50.</p>
                        }
                        <select className='field-select'
                            {...register("category", { required: true })}>
                            <option value="0">*Selecione uma categoria</option>
                            {categories.map(category => (<option key={category.categoryId}> {category.categoryName} </option>))}
                        </select>
                        {errors?.category?.type == 'required' &&
                            <p className="error-message">O campo categoria é obrigatório.</p>
                        }
                        <input
                            className="field"
                            type="text"
                            placeholder="*Quantidade"
                            {...register("quantity", { required: true })}
                        />
                        {errors?.quantity?.type == 'required' &&
                            <p className="error-message">O campo quantidade é obrigatório.</p>
                        }
                        <div className="container-input-img">
                            <input
                                className="custom-file-input"
                                type="file"
                                placeholder="*Foto"
                                multiple
                                accept="image/png,image/jpg,image/jpeg"
                                onChange={e => setFiles(e.target.files)}
                            />
                            {errors?.photo?.type == 'required' &&
                                <p className="error-message">O campo foto é obrigatório.</p>
                            }
                        </div>
                    </div>
                    <div className="container-data-double">
                        <input
                            className="field"
                            type="text"
                            placeholder="*CEP"
                            onBlur={checkCEP}
                            onChange={e => setZipCode(e.target.value)}
                        />
                        {errors?.zipCode?.type == 'required' &&
                            <p className="error-message">O campo CEP é obrigatório.</p>
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
    )
}

export default Create_donate;