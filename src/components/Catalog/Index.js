import Product from '../Product/Index';
import './Index.css';

function Catalog(props) {

    var listProduct = [];
    console.log('Props catalogo:',props.products)
    for (let x = 0; x < props.products.length; x++) {
        listProduct.push(<Product product={props.products[x]} isEdit={props.isEdit}/>)
    }

    return (
        <div className="feed-donate">
            { listProduct }
        </div>
    );
}

export default Catalog;