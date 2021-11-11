import { Fragment, useEffect, useState } from 'react';
import { useRouteMatch, NavLink, Switch, Route } from 'react-router-dom';

import ShopItem from './ShopItem';
import ShopHome from './ShopHome';

const AllShop = () => {
    let { url } = useRouteMatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [allShops, setAllShops] = useState([]);

    const urlAllShop = 'http://localhost:8080/api/Shop/all';

    const customer = JSON.parse(localStorage.getItem('customer'));
    let customerName, phoneNumber, customerId;
    if (customer) {
        customerName = customer.name;
        phoneNumber = customer.phoneNumber;
        customerId = customer.customerId;
    }

    const listShop = allShops.map(shop => {
        return (
            <ShopItem key={shop.shopId} shop={shop} />
        )
    })

    const fetchAllShop = async () => {
        try {
            const response = await fetch(urlAllShop, {
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            if (!data.errorMessage) {
                setAllShops(data);
            } else {
                setErrorMessage(data.errorMessage);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const copyShopUrl = () => { }

    useEffect(() => {
        fetchAllShop();
    }, []);

    return (
        <Fragment>
            <div class="row">
                {listShop}
            </div>
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

export default AllShop;