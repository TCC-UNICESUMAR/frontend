import Product from '../Product/Index';
import './Index.css';

function Catalog(props) {

    var listDonations = [];
    for (let x = 0; x < props.donations.length; x++) {
        listDonations.push(<Product donation={props.donations[x]} page={props.page}/>)
    }

    return (
        <div className="feed-donate">
            { listDonations }
        </div>
    );
}

export default Catalog;