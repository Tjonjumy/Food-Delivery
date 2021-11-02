import { Fragment } from 'react';

import './FoodItem.css';
import FoodItemForm from './FoodItemForm';

const FoodItem = (props) => {
    const {item, customerId, isCart} = props;
    const itemClassName = isCart ? 'col-12' : 'col-6';
    const itemWrapperClass = isCart ? 'pl-3 p-2' : '';
    const totalPrice = (item.amount * item.price).toFixed(2);
    return <Fragment>
        <div className={itemClassName}>
            <div className={`menu-item-wraper row pr-3 ${itemWrapperClass}`}>
                {!isCart && <div className="img-item col-5 p-0">
                    <img src={`data:image/jpeg;base64,${item.image}`} />
                </div>}
                <div className="info-item">
                    {!isCart && <h3>{item.name}</h3>}
                    {isCart && <h3>{item.itemName}</h3>}
                    {!isCart && <p>$ <b className="item-price">{item.price}</b></p>}
                    {isCart && <p>$ <b className="item-price">{totalPrice}</b></p>}
                </div>
                <div className="action-item">
                    <FoodItemForm item={item} customerId={customerId}  isCart={isCart}
                    showLoader={props.showLoader} hideLoader={props.hideLoader}
                    toggleAlert={props.toggleAlert}
                    />
                </div>
            </div>
        </div>
    </Fragment>
}

export default FoodItem;