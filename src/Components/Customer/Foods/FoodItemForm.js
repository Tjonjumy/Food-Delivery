import { useCallback, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cartActions } from '../../../Store/cart';

const FoodItemForm = (props) => {
    const dispatch = useDispatch();

    const modalTitle = "Remove Item";
    const modalContent = "Are you sure remove item?";

    const cartId = useSelector(state => state.cart.cartId);
    //const { cartId } = useParams();

    const { itemId, name, price } = props.item;
    const { customerId, isCart } = props;


    const urlApiRemoveItem = 'http://localhost:8080/api/Cart/remove/item';
    const urlApiAddItem = 'http://localhost:8080/api/Cart/add/item';

    const addItemToCartHandler = useCallback(async (event) => {
        try {
            event.preventDefault(); 
            props.showLoader();
            const response = await fetch(urlApiAddItem, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    customerId: customerId,
                    cartId: cartId,
                    itemId: itemId
                })
            });
            if (!response.ok) {
                setTimeout(() => {
                    props.hideLoader();
                }, 1000)
                throw new Error(response.status)
            }
            const data = await response.json();
            if (data.isSuccess) {
                dispatch(cartActions.addItemToCart({
                    itemId,
                    name,
                    price,
                    amount: 1,
                }))
                props.toggleAlert(true, 'Add to Cart Successfuly!');
                setTimeout(() => {
                    props.hideLoader();
                    props.toggleAlert(false);
                }, 1500)
            } else {
                props.toggleAlert(true, data.errorMessage, '1');
                setTimeout(() => {
                    props.hideLoader();
                    props.toggleAlert(false);
                }, 5000)
            }
            
        } catch(error) {
            console.error(error);
        }
    }, [])

    const removeItem = useCallback(async () => {
        try {
            const response = await fetch(urlApiRemoveItem, {
                method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        customerId: customerId,
                        cartId: cartId,
                        itemId: itemId
                    })
            });
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            if (data.isSuccess) {
                dispatch(cartActions.removeItemFromCart(data.itemId));
            }
        } catch(error) {
            console.error(error);
        }
    });


    return (
        <Fragment>
            <form className="" onSubmit={addItemToCartHandler}>
                {!isCart && <button type="submit" className="btn btn-outline-success btn-add-item">
                <i className="fa fa-cart-plus" aria-hidden="true"></i>&nbsp;Add</button>}
                
                {isCart &&
                <div className="">
                    <button type="button" className="btn btn-outline-danger mr-2" 
                        onClick={removeItem}>
                        <i className="fa fa-trash" aria-hidden="true"></i></button>
                    <button type="submit" className="btn btn-outline-success"><b>+</b></button>
                </div>}
            </form>
        </Fragment>
    )
}

export default FoodItemForm;