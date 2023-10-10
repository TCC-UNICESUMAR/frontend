import * as React from "react"
import { useForm } from "react-hook-form";
import { useState } from "react";

import Header from "../../components/Header";

import '../../default.css';
import Api from "../../config/Service/Api";

function Password_recover() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            password: ''
        }
    });

    const onSubmit = async data => {
        if (data.password === "123") {
            alert(JSON.stringify(data));
        } else {
            alert("There is an error");
        }
    };

        return (
            <>
                <Header />
                <form onSubmit={handleSubmit(onSubmit)}>
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