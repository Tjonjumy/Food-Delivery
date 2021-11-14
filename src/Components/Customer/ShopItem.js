
import { useRouteMatch, NavLink } from 'react-router-dom';

const ShopItem = (props) => {
    const {name, phoneNumber, image, shopId} = props.shop;

    const { url } = useRouteMatch();

    return (
        <div className="col-sm-6">
            <div className="card mb-4">
                <img src={`data:image/jpeg;base64,${image}`} className="card-img-top pt-3" alt="shop-logo" />
                <div className="card-body text-center">
                    <h5 className="card-title">
                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>&nbsp;{name} Shop</h5>
                    <p className="card-text"><i className="fa fa-mobile" aria-hidden="true"></i>&nbsp;{phoneNumber}</p>
                    <NavLink to={`${url}/${shopId}`} className="btn btn-primary">Get Shopping</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ShopItem;