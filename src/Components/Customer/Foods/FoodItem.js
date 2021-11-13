import { Fragment, useEffect, useState } from 'react';

import './FoodItem.css';
import FoodItemForm from './FoodItemForm';

const FoodItem = (props) => {
    const {item, customerId, isCart} = props;
    const {itemId} = item;
    const urlGetItem = `http://localhost:8080/api/Item/${itemId}`;

    const [imgItem, setImgItem] = useState(null);

    const itemClassName = isCart ? 'col-12' : 'col-lg-6 col-12';
    const itemWrapperClass = isCart ? 'pl-3 p-2' : '';
    const totalPrice = (item.amount * item.price).toFixed(2) || (item.quantity * item.price).toFixed(2);

    const fetchItemData = async () => {
        const response = await fetch(urlGetItem,
            { method: 'GET' }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await response.json();
        if (!data.errorMessage) {
            setImgItem(data.image);
        } else {
            console.log(data.errorMessage)
        }
    };

    useEffect(() => {
        if (isCart) {
            fetchItemData();
        }
    }, [])
    return <Fragment>
        <div className={itemClassName}>
            <div className={`menu-item-wraper row pr-3 ${itemWrapperClass}`}>
                {!isCart && 
                <div className="img-item col-5 p-0">
                    <img src={`data:image/jpeg;base64,${item.image}`} />
                </div>}
                {isCart && 
                <div className="img-item col-5 p-0">
                    <img src={`data:image/jpeg;base64,${imgItem}`} />
                </div>}
                <div className="info-item">
                    {!isCart && <h5>{item.name}</h5>}
                    {isCart && <h5>{item.itemName || item.name}</h5>}
                    {!isCart && <p>$ <b className="item-price">{item.price}</b></p>}
                    {isCart && <p><b className="item-price">{item.amount || item.quantity} x {item.price}$</b></p>}
                </div>
                <div className="action-item">
                    <div className="text-center">
                        {isCart && <p><b className="item-price">{(item.amount || item.quantity) * (item.price).toFixed(2)}$</b></p>}
                    </div>
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