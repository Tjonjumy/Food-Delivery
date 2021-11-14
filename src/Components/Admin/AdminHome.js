import { Fragment, useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';

import './AdminHome.css';
import DashBoard from './DashBoard';
import Foods from './Foods';
import Orders from './Orders';
import OrderDetail from '../Shop/OrderDetail';
import { foodsActions } from '../../Store/foods';
import { orderActions } from '../../Store/order';
import Configure from '../Admin/Configure';

const AdminHome = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();

    const [shopName, setShopName] = useState('');
    const [shopPhoneNumber, setShopPhoneNumber] = useState('');

    const [isShowALert, setIsShowALert] = useState(false);
    const [contentALert, setContentALert] = useState('');
    const [logo, setLogo] = useState(null);

    const shopId = localStorage.getItem('shopId');
    const urlApi = `http://localhost:8080/api/Shop/${shopId}`;
    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(urlApi,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setShopName(data.name);
            setShopPhoneNumber(data.phoneNumber);
            setLogo(data.image);
            localStorage.setItem('shopName', data.name);
            localStorage.setItem('shopPhoneNumber', data.phoneNumber);
            dispatch(foodsActions.setItems({items: data.items, total: data.items.length}));
        } catch(error) {
        }
    }, []);
    
    const urlFetchOrder = `http://localhost:8080/api/Order/${shopId}/shop/all`;

    const fetchOrderData = useCallback(async () => {
        try {
            const response = await fetch(urlFetchOrder,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            dispatch(orderActions.setOrderData(data.orders));

        } catch(error) {
            console.log(error)
        }
    }, []);


    useEffect(() => {
        fetchItems();
        fetchOrderData();
    }, []);

    const copyShopUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/shopping/${shopId}`);
    }

    const toggleAlert = (isShow, contentALert) => {
        setIsShowALert(isShow);
        setContentALert(contentALert);
    }
    return <Fragment>
        <div className="main-container">
            <div className="">
                <div className="row profile">
                    <div className="col-md-3">
                        <div className="profile-sidebar">
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {shopName} Shop
                                </div>
                                <div className="profile-usertitle-job">
                                    {shopPhoneNumber}
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
                        <div className="shop-content">
                        {isShowALert && 
                            <div className="alert alert-success" role="alert">
                                <i className="fa fa-check" aria-hidden="true">&nbsp;</i>{contentALert}</div>
                        }
                            <Switch>
                                <Route exact path='/admin'>
                                    <DashBoard />
                                </Route>
                                <Route path='/admin/foods'>
                                    <Foods toggleAlert={toggleAlert}/>
                                </Route>
                                <Route exact path='/admin/orders'>
                                    <Orders />
                                </Route>
                                <Route path='/admin/orders/:orderId'>
                                    <OrderDetail />
                                </Route>
                                <Route path='/admin/configure'>
                                    <Configure shopId={shopId} logo={logo} 
                                    shopPhoneNumber={shopPhoneNumber} shopName={shopName}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}

export default AdminHome;