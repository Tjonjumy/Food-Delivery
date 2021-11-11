import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Moment from 'react-moment';

import './Shop.css';
import ItemOrdered from './ItemOrdered';
import Notification from '../Alert/Notification';

const OrderDetail = (props) => {
    const { isCustomer } = props;

    const history = useHistory();

    const [contentALert, setContentALert] = useState('');

    const { orderId } = useParams();
    const urlFetchOrder = `http://localhost:8080/api/Order/${orderId}`;
    const urlOrderStatus = `http://localhost:8080/api/Order/status`;

    const orders = useSelector(state => state.order.orders);
    const orderItem = orders.filter(order => order.orderId === orderId)[0];

    const orderStatus = useRef();

    let customerId, cartId, status, deliveryInformation;
    let customerName, customerPhoneNumber, orderTime, totalPrice, itemsInCart;
    let listOrderedItem;

    if (orderItem) {
        customerName = orderItem.customerName;
        customerPhoneNumber = orderItem.customerPhoneNumber;
        orderTime = orderItem.orderTime;
        totalPrice = orderItem.totalPrice;
        totalPrice = orderItem.totalPrice;
        itemsInCart = orderItem.itemsInCart;
        customerId = orderItem.customerId;
        cartId = orderItem.cartId;
        status = orderItem.status;
        deliveryInformation = orderItem.deliveryInformation;
        listOrderedItem = itemsInCart.map(item => {
            return <ItemOrdered item={item} key={item.itemId} />
        });
    }

    const fetchOrder = async () => {
        const response = await fetch(urlFetchOrder, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        customerName = data.customerName;
        customerPhoneNumber = data.customerPhoneNumber;
        orderTime = data.orderTime;
        totalPrice = data.totalPrice;
        totalPrice = data.totalPrice;
        itemsInCart = data.itemsInCart;
        customerId = data.customerId;
        cartId = data.cartId;
        status = data.status;
        orderStatus.current.value = data.status;
        listOrderedItem = itemsInCart.map(item => {
            return <ItemOrdered item={item} key={item.itemId} />
        })
    }

    useEffect(() => {
        if (!orderItem) {
            //fetchOrder();
        }
        if (orderStatus.current) {
            orderStatus.current.value = status
        }
    }, [])

    const goBackList = () => {
        history.goBack()
    }

    const submitStatus = async () => {
        const response = await fetch(urlOrderStatus, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify({
                customerId: customerId,
                cartId: cartId,
                orderId: orderId,
                orderStatus: orderStatus.current.value
            })
        });
        if (!response.ok) {

        }
        const data = await response.json();
        console.log(data);
        if (data.isSuccess) {
            setContentALert('Change Order Status Successfully!');
            setTimeout(() => setContentALert(''), 1500);
        } else {
            setContentALert(data.errorMessage);
            setTimeout(() => setContentALert(''), 1500);
        }
    }
    return (
        <div className="order-detail">
            <button type="button" class="btn btn-outline-secondary ml-3" onClick={goBackList}>
                <i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Back
            </button>
            <div className="infor-order mt-3 row m-0">
                <div className="col-6">
                    {!isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Customer Name</div>
                        <div className="col-6 content">{customerName}</div>
                    </div>}
                    {!isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Customer Phone</div>
                        <div className="col-6 content">{customerPhoneNumber}</div>
                    </div>}
                    {isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Shop Name</div>
                        <div className="col-6 content">{customerName}</div>
                    </div>}
                    {isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Shop Phonenumber</div>
                        <div className="col-6 content">{customerPhoneNumber}</div>
                    </div>}
                    <div className="row">
                        <div className="col-6 title">Order Time</div>
                        <div className="col-6 content">
                            <Moment date={orderTime} format="YYYY-MM-DD HH:mm:ss" />
                        </div>
                    </div>
                    {!isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Ship To</div>
                        <div className="col-6 content">{deliveryInformation}</div>
                    </div>}
                </div>
                {!isCustomer &&
                <div className="col-6 row justify-content-end">
                    <div className="col-9">
                        <select className="form-control" ref={orderStatus}>
                            <option value="">Order Status</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Sent To Kitchen">Sent To Kitchen</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Ready for Delivery">Ready for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="col-3">  
                        <button type="button" class="btn btn-outline-success"onClick={submitStatus}>Apply</button>
                    </div>
                </div>
                }
            </div>
            <table className="table mt-5 ordered-item-table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrderedItem}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total: ${totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            {contentALert && <Notification contentALert={contentALert}/>}
        </div>
    )
}

export default OrderDetail;