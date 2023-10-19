import Graphic from "../../components/Graphic";

import Header from "../../components/Header";

import './index.css';

function Dashboard() {

    const dataUser = [30, 40, 45, 50, 49, 60, 70, 91, 30, 65, 12, 78];
    const dataDonate = [80, 200, 95, 60, 55, 87, 32, 63, 44, 78, 64, 90];

    return (
        <>
            <Header />
            <h2>Dashboard</h2>
            <div className="container-dash">
                <Graphic
                    name={"Usuários cadastrados"}
                    data={dataUser}
                />
                <Graphic
                    name={"Doações cadastradas"}
                    data={dataDonate}
                />
            </div>
        </>
    )
}

export default Dashboard;