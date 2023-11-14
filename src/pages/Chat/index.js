import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatRoom from "../../components/ChatRoom";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

import Api from "../../config/Service/Api";

function Chat() {

    const accessToken = localStorage.getItem('accessToken');
    
    const { id } = useParams();

    const [loading, setLoanding] = useState(true);

    const [response, setResponse] = useState('');

    async function getUser() {
        try {
            let userData = await Api.get(`/api/v1/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setResponse(userData.data.body);
            setLoanding(false);
        } catch (error) {
            alert('Error Get User By Session! Try again!');
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    if (loading) {
        return(
            <>
                <Header />
                <Loading />
            </>
        )
    }

    return(
        <>
            <Header />
            <ChatRoom user={response}/>
        </>
    )
}

export default Chat;