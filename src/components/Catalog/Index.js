import Product from '../Product/Index';
import './Index.css';

function Catalog(props) {

    var listDonations = [];
    console.log('Props catalogo:',props.donations)
    for (let x = 0; x < props.donations.length; x++) {
        listDonations.push(<Product donation={props.donations[x]} isEdit={props.isEdit}/>)
    }

    return (
        <div className="feed-donate">
            { listDonations }
        </div>
    );
}

export default Catalog;