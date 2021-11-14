import { Fragment, useEffect, useState } from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';

const AllOrdered = () => {
    const { url } = useRouteMatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [allOrder, setAllOrder] = useState([]);

    

    const customer = JSON.parse(localStorage.getItem('customer'));
    let customerName, phoneNumber, customerId;
    if (customer) {
        customerName = customer.name;
        phoneNumber = customer.phoneNumber;
        customerId = customer.customerId;
    }

    const listOrder = allOrder.map(order => {
        return (
            <div className="col-sm-6 mb-3" key={order.orderId}>
                <div className="card text-center">
                    <i className="fa fa-cart-arrow-down card-img-top" aria-hidden="true"></i>
                    <div className="card-body">
                        <h5 className="card-title">
                        <i className="fa fa-coffee" aria-hidden="true"></i>&nbsp;{order.shopName}</h5>
                        <NavLink to={`${url}/${order.orderId}`} className="btn btn-primary">View</NavLink>
                    </div>
                </div>
            </div>
        )
    })

    const urlAllCart = `http://localhost:8080/api/Order/${customerId}/customer/all`;

    const fetchAllCart = async () => {
        try {
            const response = await fetch(urlAllCart, {
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            if (!data.errorMessage) {
                setAllOrder(data.orders);
            } else {
                setErrorMessage(data.errorMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const copyShopUrl = () => { }

    useEffect(() => {
        fetchAllCart();
    }, []);

    return (
        <Fragment>
            <div className="row">
                {listOrder}
            </div>
            { allOrder.length == 0 &&
                <div>You have no order.</div>
            }
            {
                errorMessage && 
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{errorMessage}</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
        </Fragment>
    )
}

export default AllOrdered;