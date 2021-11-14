import { useState, Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import './Cart.css';
import FoodItem from '../Customer/Foods/FoodItem';
import Notification from '../Alert/Notification';
import Loader from '../Alert/Loader';
import ConfirmModal from '../Alert/ConfirmModal';

import { cartActions } from '../../Store/cart';

const Cart = () => {
    const history = useHistory();

    const btnShowModal = useRef();

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const customerId = useSelector(state => state.auth.customerId);

    let {cartId}  = useParams();

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
        navigator.clipboard.writeText(`http://localhost:3000/shopping/cart/${cartId}`);
        toggleAlert(true, 'Copy successfully');
                    setTimeout(() => {
                        toggleAlert(false);
                    }, 1500)
    }

    const fetchCartData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/Cart/${cartId}?getShop=false`, {
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            const items = data.itemsInCart;
            let totalQuantity = 0;
            items.forEach(item => {
                totalQuantity += item.amount;
            })
            dispatch(cartActions.setCartData({ items, totalQuantity }))
        } catch (error) {
            console.log(error)
        }
    };

    const goSignIn = () => {
        history.push('/buyer/sign-in');
    }

    useEffect(() => {
        if (isAuth) {
            fetchCartData();
        } else {
            btnShowModal.current.click();
        }
    }, []);

    return (    
        <Fragment>
            <div className="col-12 modal-header justify-content-between">
                <h4 className="modal-title" id="myLargeModalLabel">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>&nbsp;Your Cart</h4>
                {listItems.length > 0 &&
                <button type="button" className="btn btn-outline-secondary btn-sm"
                    onClick={copyCartUrl}>
                    <i className="fa fa-clone" aria-hidden="true"></i>&nbsp;Copy
                </button>
                }
            </div>
            <div className="mt-5">
                {listItems}
            </div>
            {listItems.length === 0 && 
                <div className="m-5 text-center">
                    <p>You have no items in your shopping cart</p>
                </div>
            }
            <div className="modal-footer">
                <div className="total-price mr-5"><b>Total: ${totalPrice.toFixed(2)}</b></div>
                <button type="button" className="btn btn-primary" disabled={listItems.length === 0}
                    onClick={submitOrder}>Order Now</button>
            </div>
            {isShowALert && <Notification classALert={classALert} contentALert={contentALert} />}
                {isLoading && <Loader />} 
            
            <button type="button" className="btn btn-outline-danger mr-2 invisible" ref={btnShowModal}
                data-toggle="modal" data-target="#confirmModal"></button>
            <ConfirmModal modalTitle="Message" modalContent="Please Sign In to Continue." actionYes={goSignIn}/>
        </Fragment>
    )
}

export default Cart;