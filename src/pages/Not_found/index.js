import Header from "../../components/Header";
import Pop_up from "../../components/Pop_up";

function Not_found() {
    return(
        <>
            <Header />
            <Pop_up
                title={"OOPS!!"}
                text={"Parece que o endereço procurado não existe!"}
            />
        </>
    )
}

export default Not_found;