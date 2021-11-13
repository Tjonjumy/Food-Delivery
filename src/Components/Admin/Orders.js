import { useSelector } from 'react-redux';

import OrderItem from '../Shop/OrderItem';

const Orders = () => {

    const orders = useSelector(state => state.order.orders)
    const listOrder = orders.map((order, index) => {
        return <OrderItem order={order} key={order.orderId} idx={index}/>
    });

    return (
        <div className="list-order">
            <table className="table ordered-item-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Customer Phone</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Order Time</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrder}   
                </tbody>
            </table>
        </div>
    )
}

export default Orders;