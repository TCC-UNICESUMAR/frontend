import { useCallback, useState } from "react";

import './index.css';

const ImagePicker = () => {
    
    const [logo, setLogo] = useState('');
    
        const handleCreateBase64 = useCallback(async (e) => {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            setLogo(base64);
            e.target.value = "";
        }, []);

        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                if (!file) {
                    alert("Please select an image!")
                }else{
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    }
                }
                fileReader.onerror = (error) => {
                    reject (error);
                }
            })
        }

        const deleteImg = (e) => {
            e.preventDefault();
            setLogo(null);
        }

    return(
        <>
        <div className="logoContainer">
            <label className="labelLogo" htmlFor="contained-button-file">
                <div className="buttonContainer">
                    <div className="button">
                        <p className="buttonText">Choose image</p>
                    </div>
                </div>
                {logo ? (
                    <div className="button">
                        <p onClick={deleteImg} className="buttonText">Delete image</p>
                    </div>
                ) : null}
                {logo ? (
                    <span>
                        <div className="pictureContainer">
                            <img className="picture" src={logo} alt="imagem"></img>
                        </div>
                    </span>
                ) : null}
            </label>
        </div>
        <input
            id="conatained-button-file"
            type="file"
            accept="image/*, png, jpg, jpeg"
            name="logo"
            multiple
            onChange={handleCreateBase64}
        />
        </>
    )
}

export default ImagePicker;