import { Fragment, useEffect, useCallback, useState } from 'react';
import { useParams, useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { foodsActions } from '../../Store/foods';
import { cartActions } from '../../Store/cart'
import FoodItem from './Foods/FoodItem';
import Cart from '../Cart/Cart';

const ShopHome = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isShowALert, setIsShowALert] = useState(false);
    const [contentALert, setContentALert] = useState(false);

    const customer = JSON.parse(localStorage.getItem('customer'));
    let customerName, phoneNumber, customerId;
    if (customer) {
        customerName = customer.customerName;
        phoneNumber = customer.phoneNumber;
        customerId = customer.customerId;
    }

    let { shopId } = useParams();
    let { path, url } = useRouteMatch();
    const cartId = useSelector(state => state.cart.cartId);

    const urlApiGetShop = `http://localhost:8080/api/Shop/${shopId}`;
    const urlApiCreateCart = 'http://localhost:8080/api/Cart/create';
    const urlApiGetCart = `http://localhost:8080/api/Cart/${cartId}?getShop=false`;

    const showLoader = () => {
        setIsLoading(true);
    }

    const hideLoader = () => {
        setIsLoading(false);
    }

    const toggleAlert = (isShow, contentALert) => {
        setIsShowALert(isShow);
        setContentALert(contentALert);
    }
    
    const createCart = useCallback(async () => {
        try {
            const response = await fetch(urlApiCreateCart, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    customerId: customerId,
                    shopId: shopId
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            if (data.isSuccess) {
            } else {
                //alert(data.errorMessage)
            }
            dispatch(cartActions.createCart(data.cartId));
            //{"cartId":"88d702","isSuccess":false,"errorMessage":"You have a exit cart with this shop"}
        } catch (error) {
            console.log(error)
        }
    })

    const fetchCartData = useCallback(async () => {
        try {
            const response = await fetch(urlApiGetCart, {
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            console.log(data)
            const items = data.itemsInCart;
            let totalQuantity = 0;
            items.forEach(item => {
                totalQuantity += item.amount;
            })
            dispatch(cartActions.setCartData({ items, totalQuantity }))
        } catch (error) {
            console.log(error)
        }
    })

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(urlApiGetShop,
                { method: 'GET' }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            dispatch(foodsActions.setItems({ items: data.items, total: data.items.length }));
            setTimeout(() => {hideLoader()}, 500);
        } catch (error) {
            setTimeout(() => {hideLoader()}, 500);
            console.log(error)
        }
    }, []);


    useEffect(() => {
        showLoader();
        fetchItems();
        if (customerId) {
            createCart();
        }
    }, [fetchItems]);

    if (cartId) {
        fetchCartData();
    }
    const copyShopUrl = () => { }
    
    const items = useSelector(state => state.foods.items);
    const activeItems = items.filter(item => item.isActive);
    const listIems = activeItems.map((item) => {
        return <FoodItem item={item}
        key={item.itemId} 
        customerId={customerId} 
        showLoader={showLoader} 
        hideLoader={hideLoader}
        toggleAlert={toggleAlert}
        />
    })

    
    return <Fragment>
        <div className="main-container">
            <div className="">
                <div className="row profile">
                    <div className="col-md-3">
                        <div className="profile-sidebar">

                            <div className="profile-userpic">

                            </div>

                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {customerName}
                                </div>
                                <div className="profile-usertitle-job">
                                    {phoneNumber}
                                </div>
                            </div>

                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-outline-secondary"
                                    onClick={copyShopUrl}>
                                    <i className="fa fa-clone" aria-hidden="true"></i>&nbsp;Copy
                                </button>
                                <button type="button" className="btn btn-outline-primary">
                                    <i className="fa fa-share" aria-hidden="true"></i>&nbsp;Share
                                </button>
                            </div>

                            <div className="profile-usermenu">
                                <ul className="nav flex-column">
                                    <li>
                                        <NavLink exact activeClassName="active" to={`${url}/`}>
                                            <i className="glyphicon glyphicon-home"></i>
                                            Home </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active" to={`${url}/foods`}>
                                            <i className="glyphicon glyphicon-user"></i>
                                            Foods </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active" to={`${url}/orders`}>
                                            <i className="glyphicon glyphicon-ok"></i>
                                            All Orders </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active" to={`${url}/configure`}>
                                            <i className="glyphicon glyphicon-flag"></i>
                                            Configure </NavLink>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="profile-content">
                            {isShowALert && 
                                <div class="alert alert-success" role="alert">
                                    <i class="fa fa-check" aria-hidden="true">&nbsp;</i>{contentALert}</div>
                            }
                            {isLoading && 
                            <div>
                            <div className="backdrop"></div>
                            <div className="loader">
                                <div class="spinner-grow text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-secondary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-success" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-danger" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-warning" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-info" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            </div>
                            }
                            <div className="foods-wraper row">
                                {listIems}
                            </div>
                            {/* <Switch>
                                <Route path='/admin/foods'>
                                    <Foods />
                                </Route>
                                <Route path='/admin/orders'>
                                    <Orders />
                                </Route>
                            </Switch> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Cart />
    </Fragment>
}

export default ShopHome;