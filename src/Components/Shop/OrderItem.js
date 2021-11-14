import Moment from 'react-moment';
import { NavLink, useRouteMatch } from 'react-router-dom'


const OrderItem = (props) => {
    const { url } = useRouteMatch();

    const { customerName,
        customerPhoneNumber,
        totalPrice,
        status,
        orderTime,
        orderId,
    } = props.order;
    const { idx } = props; 
    return (
        <tr>
            <th scope="row">{idx+1}</th>
            <td>{customerName}</td>
            <td>{customerPhoneNumber}</td>
            <td>${totalPrice}</td>
            <td>{status || 'Pending'}</td>
            <td>
                <Moment date={orderTime} format="YYYY-MM-DD HH:mm:ss" /></td>
            <td>
                <NavLink to={`${url}/${orderId}`}>View</NavLink>
            </td>
        </tr>
    )
}

export default OrderItem;