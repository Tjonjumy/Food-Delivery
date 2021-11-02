import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../UI/Input';
import { cartActions } from '../../../Store/cart';
const FoodItemForm = (props) => {
    const dispatch = useDispatch();
    const amountInputRef = useRef();

    const cartId = useSelector(state => state.cart.cartId);

    const { itemId, name, price } = props.item;
    const { customerId, isCart } = props;

    const urlApiRemoveItem = 'http://localhost:8080/api/Cart/remove/item';
    const urlApiAddItem = 'http://localhost:8080/api/Cart/add/item';

    const addItemToCartHandler = useCallback(async () => {
        try {
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
                throw new Error(response.status)
            }
            const data = await response.json();
            console.log(data)
            if (data.isSuccess) {
                dispatch(cartActions.addItemToCart({
                    itemId,
                    name,
                    price,
                    amount: 1,
                }))
            }
            props.toggleAlert(true, 'Add to Cart Successfuly!');
            setTimeout(() => {
                props.hideLoader();
                props.toggleAlert(false);
            }, 1000)
            
        } catch(error) {
            console.error(error);
        }
    })

    const removeItem = useCallback(async () => {
        try {
            props.showLoader();
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
            const data = await response.json();
            console.log(data)
            // if (data.isSuccess) {
            //     dispatch(cartActions.addItemToCart({
            //         itemId,
            //         name,
            //         price,
            //         amount: 1,
            //     }))
            // }
            props.toggleAlert(true, 'Add to Cart Successfuly!');
            setTimeout(() => {
                props.hideLoader();
                props.toggleAlert(false);
            }, 1000)
        } catch(error) {
            console.error(error);
        }
    });

    return (
        <form className="" onSubmit={addItemToCartHandler}>
            {/* {isCart && <div className="input-group mb-3">
                <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-outline-secondary" type="button" onClick={removeItem}>-</button>
                </div>
                <input type="number" readOnly = {true} className="amount-input" defaultValue="1" ref={amountInputRef} />
                <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-outline-secondary" type="button" onClick={addItem}>+</button>
                </div>
            </div>} */}
            {!isCart && <button type="submit" className="btn btn-outline-success">
            <i class="fa fa-cart-plus" aria-hidden="true"></i>&nbsp;Add</button>}
            
            {isCart && <button type="submit" className="btn btn-outline-danger"
            onClick={removeItem}>Remove</button>}
        </form>
    )
}

export default FoodItemForm;