import { useEffect, useRef, useState , Fragment} from 'react';
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
    const [order, setOrder] = useState(null);

    const[itemsInCart, setItemsInCart] = useState([]);

    const { orderId } = useParams();
    const urlFetchOrder = `http://localhost:8080/api/Order/${orderId}`;
    const urlOrderStatus = `http://localhost:8080/api/Order/status`;

    const orderStatus = useRef();

    const listOrderedItem = itemsInCart.map(item => {
        return <ItemOrdered item={item} key={item.itemId} />
    })

    const fetchOrder = async () => {
        const response = await fetch(urlFetchOrder, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        setOrder(data);
        setItemsInCart(data.itemsInCart);
    }

    useEffect(() => {
        fetchOrder();
        if (order) {
            orderStatus.current.value = order.status;
        }
    }, [isCustomer])

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
                customerId: order.customerId,
                //cartId: cartId,
                orderId: orderId,
                orderStatus: orderStatus.current.value
            })
        });
        if (!response.ok) {

        }
        const data = await response.json();
        if (data.isSuccess) {
            setContentALert('Change Order Status Successfully!');
            setTimeout(() => setContentALert(''), 1500);
        } else {
            setContentALert(data.errorMessage);
            setTimeout(() => setContentALert(''), 1500);
        }
    }
    return (
        <Fragment>
        {
            order &&
        
        <div className="order-detail">
            <button type="button" className="btn btn-outline-secondary ml-3" onClick={goBackList}>
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Back
            </button>
            <div className="infor-order mt-3 row m-0">
                <div className="col-6">
                    {!isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Customer Name</div>
                        <div className="col-6 content">{order.customerName}</div>
                    </div>}
                    {!isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Customer Phone</div>
                        <div className="col-6 content">{order.customerPhoneNumber}</div>
                    </div>}
                    {isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Shop Name</div>
                        <div className="col-6 content">{order.shopName}</div>
                    </div>}
                    {isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Shop Phone Number</div>
                        <div className="col-6 content">{order.phoneNumberOfShop}</div>
                    </div>}
                    <div className="row">
                        <div className="col-6 title">Order Time</div>
                        <div className="col-6 content">
                            <Moment date={order.orderTime} format="YYYY-MM-DD HH:mm:ss" />
                        </div>
                    </div>
                    {!isCustomer &&
                    <div className="row">
                        <div className="col-6 title">Ship To</div>
                        <div className="col-6 content">{order.deliveryInformation}</div>
                    </div>}
                </div>
                {!isCustomer &&
                <div className="col-6 row justify-content-end">
                    <div className="col-9">
                        <select className="form-control" ref={orderStatus}>
                            <option value="">Order Status</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="SentToKitchen">Sent To Kitchen</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Ready for Delivery">Ready for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="col-3">  
                        <button type="button" className="btn btn-outline-success"onClick={submitStatus}>Apply</button>
                    </div>
                </div>
                }
                {isCustomer &&
                <div className="col-6 row">
                    <div className="col-3 title">Status</div>
                    <div className="col-6 content">
                        <span className="badge badge-primary">{order.status || "Pending"}</span>
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
                        <td>Total: ${order.totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            {contentALert && <Notification contentALert={contentALert}/>}
        </div>
        }
        </Fragment>
    )
}

export default OrderDetail;