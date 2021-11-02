import { useSelector } from 'react-redux';

import './Cart.css';
import FoodItem from '../Customer/Foods/FoodItem';

const Cart = () => {

    const items = useSelector(state => state.cart.items);
    const listItems = items.map((item) => {
        return <FoodItem item={item}
            key={item.itemId}
            isCart={true}
        />
    });
    return (
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myLargeModalLabel">Your Cart</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="list-order">
                            {listItems}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;