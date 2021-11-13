import { Fragment, useEffect } from 'react';
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
                        {customerId &&
                        <div className="col-md-3">
                            <div className="profile-sidebar">

                                <div className="profile-userpic">

                                </div>

                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        {customerName}
                                    </div>
                                    <div className="profile-usertitle-job">
                                        <i className="fa fa-mobile" aria-hidden="true"></i>&nbsp;{phoneNumber}
                                    </div>
                                </div>


                                <div className="profile-usermenu">
                                    <ul className="nav flex-column">
                                        <li>
                                            <NavLink exact activeClassName="active" to={`${url}`}>
                                                <i className="glyphicon glyphicon-home"></i>
                                                Home </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active" to={`${url}/purchase`}>
                                                <i className="glyphicon glyphicon-ok"></i>
                                                All Ordered </NavLink>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>}
                        <div className={customerId ? "col-md-9" : "col-md-12"}>
                            <div className="shop-content">
                                <Switch>
                                    <Route exact path="/shopping">
                                        <AllShop />
                                    </Route>
                                    <Route path="/shopping/cart/:cartId">
                                        <Cart />
                                    </Route>
                                    <Route exact path={`${url}/purchase`}>
                                        <AllOrdered />
                                    </Route>
                                    <Route path={`${url}/purchase/:orderId`}>
                                        <OrderDetail isCustomer={true}/>
                                    </Route>
                                    {/* <Route exact path={`${url}/cart/:cartId`}>
                                        <Cart />
                                    </Route> */}
                                    <Route path={`${url}/:shopId`}>
                                        <ShopHome />
                                    </Route>
                                    
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </Fragment>
}

export default CusHomePage;