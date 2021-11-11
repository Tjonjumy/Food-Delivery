import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, NavLink, Switch, Route } from 'react-router-dom';

import AllShop from './AllShop';
import ShopHome from './ShopHome';
import Cart from '../Cart/Cart';
import AllOrdered from '../Cart/AllOrdered'
import OrderDetail from '../Shop/OrderDetail';

const CusHomePage = () => {
    let { url } = useRouteMatch();

    const customer = JSON.parse(localStorage.getItem('customer'));
    let customerName, phoneNumber, customerId;
    if (customer) {
        customerName = customer.name;
        phoneNumber = customer.phoneNumber;
        customerId = customer.customerId;
    }

    const cartId = useSelector(state => state.cart.cartId);
    const copyShopUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/shop/cart/${cartId}`);
    }

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
                                            <NavLink exact activeClassName="active" to={`${url}`}>
                                                <i className="glyphicon glyphicon-home"></i>
                                                Home </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to={`${url}/orders`}>
                                                <i className="glyphicon glyphicon-ok"></i>
                                                All Ordered </NavLink>
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
                                <Switch>
                                    <Route exact path="/shop">
                                        <AllShop />
                                    </Route>
                                    <Route exact path={`${url}/orders`}>
                                        <AllOrdered />
                                    </Route>
                                    <Route path={`${url}/orders/:orderId`}>
                                        <OrderDetail isCustomer={true}/>
                                    </Route>
                                    <Route exact path={`${url}/cart/:cartId`}>
                                        <Cart />
                                    </Route>
                                    <Route path={`${url}/:shopId`}>
                                        <ShopHome />
                                    </Route>
                                    
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cart />
    </Fragment>
}

export default CusHomePage;