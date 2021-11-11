import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Cart.css';
import FoodItem from '../Customer/Foods/FoodItem';
import Notification from '../Alert/Notification';
import Loader from '../Alert/Loader';
import { cartActions } from '../../Store/cart';

const Cart = (props) => {
    const dispatch = useDispatch();
    const customerId = useSelector(state => state.auth.customerId);
    const cartId = useSelector(state => state.cart.cartId);

    const [contentALert, setContentALert] = useState('');
    const [classALert, setClassAlert] = useState('alert-success');
    const [isLoading, setIsLoading] = useState(false);
    const [isShowALert, setIsShowALert] = useState(false);
    let totalPrice = 0;

    const items = useSelector(state => state.cart.items);
    const itemsSelected = [];
    items.forEach(item => {
        itemsSelected.push({ amount: item.amount || item.quantity, itemId: item.itemId, isDeleted: false });
        totalPrice += (item.amount || item.quantity) * item.price;
    });

    const showLoader = () => {
        setIsLoading(true);
    }

    const hideLoader = () => {
        setIsLoading(false);
    }

    const toggleAlert = (isShow, contentALert, isDanger) => {
        setIsShowALert(isShow);
        setContentALert(contentALert);
        if (isDanger == 1) {
            setClassAlert('alert-danger');
        }
    }

    const data = {
        cartId: cartId,
        deliveryInformation: 'So 10, Le Loi'
    }
    //const apiUrlSubmit = 'http://localhost:8080/api/Cart/submit';
    const apiUrlSubmit = 'http://localhost:8080/api/Order';
    const submitOrder = () => {
        showLoader();
        fetch(apiUrlSubmit, {
            method: 'POST',
            headers: {
                accept: '*/*',
                'content-type': 'application/json-patch+json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then(data => {
                if (data.isSuccess) {
                    dispatch(cartActions.resetCart());
                    toggleAlert(true, 'Submit item to cart successfully');
                    setTimeout(() => {
                        toggleAlert(false);
                        hideLoader();
                    }, 2000)
                } else {
                    toggleAlert(true, data.errorMessage, "1");
                    setTimeout(() => {
                        toggleAlert(false);
                        hideLoader();
                    }, 2000)
                }
            })
            .catch(err => {

            });
    }
    const listItems = items.map((item) => {
        return <FoodItem item={item}
            key={item.itemId}
            customerId={customerId}
            isCart={true}
            showLoader={showLoader}
            hideLoader={hideLoader}
            toggleAlert={toggleAlert}
        />
    });

    const copyCartUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/shop/cart/${cartId}`);
    }

    return (
        //<div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myLargeModalLabel">Your Cart</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="list-order">
                            {listItems}
                            {listItems.length == 0 && <p>You have no items in your shopping cart</p>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary"
                            onClick={copyCartUrl}>
                            <i className="fa fa-clone" aria-hidden="true"></i>&nbsp;Copy
                        </button>
                        <div className="total-price mr-5"><b>Total: ${totalPrice.toFixed(2)}</b></div>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={submitOrder}>Order Now</button>
                    </div>
                </div>
            </div>
            {isShowALert && <Notification classALert={classALert} contentALert={contentALert} />}
            {isLoading && <Loader />}
        </div>
    )
}

export default Cart;