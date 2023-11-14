import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../config/Service/Api';

import profileDefault from './../../static/img/edit_profile.png';
import '../../default.css'
import './index.css'

function New_photo(props) {

    const accessToken = localStorage.getItem('accessToken');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [files, setFiles] = useState([]);

    console.log("State depois da function: ", props.state)

    async function updatePhotoUser() {

        let formData = new FormData();

        formData.append("files", files[0])

        try {
            await Api.post("/api/v1/s3/uploadImageProfile", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'content-type': 'multipart/form-data'
                }
            })

        } catch (err) {
            alert('Erro!');
        }
    };

    return (
        <div className={`container-photo-edit ${props.state !== true ? "inactive" : "active"}`}>
            <form onSubmit={handleSubmit(updatePhotoUser)}>
                <span
                    onClick={() => props.state = false}
                    className='close'>
                    X
                </span>
                {
                    props.imgUser !== null ?
                        <div className='container-img-new-photo'>
                            <img src={props.imgUser} />
                        </div>
                        :
                        <div className='container-img-new-photo'>
                            <img src={profileDefault} />
                        </div>
                }
                <h3>Selecione uma nova foto</h3>
                <div className="container-input-photo-edit">
                    <input
                        className="custom-file-input"
                        type="file"
                        placeholder="*Foto"
                        accept="image/png,image/jpg,image/jpeg"
                        onChange={e => setFiles(e.target.files)}
                    />
                </div>
                {errors?.photo?.type == 'required' &&
                    <p className="error-message">O campo foto é obrigatório.</p>
                }
                <input
                    className="btn-submit"
                    type="submit"
                    value="Cadastrar"
                />
            </form>
        </div>
    )

}

export default New_photo;