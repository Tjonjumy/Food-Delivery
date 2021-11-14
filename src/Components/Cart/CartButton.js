import { useSelector } from 'react-redux';

const CartButton = (props) => {

    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    return (
        <div className="btn cart-btn" onClick={props.goToCart}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;
            <span className="badge badge-danger total-quantity">{totalQuantity}</span>
        </div>
    )
}

export default CartButton;