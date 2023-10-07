import * as React from "react"
import { useForm } from "react-hook-form";

import Header from "../../components/Header";

import '../../default.css';

function Password_recover() {

    const { register, handleSubmit } = useForm();

    const submitData = (data) => {
        console.log(data)
    }

    return(
        <>
           <Header />
           <form onSubmit={handleSubmit(submitData)}>
                <h2>Digite sua nova senha</h2>
                <input 
                    className="field"
                    type="password"
                    placeholder="*Senha"
                    {...register("password")}
                    required
                />
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