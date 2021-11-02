import { Fragment, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';

import './AdminHome.css';
import Foods from './Foods';
import Orders from './Orders';
import { foodsActions } from '../../Store/foods';

const AdminHome = () => {
    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();

    const [shopName, setShopName] = useState('');
    const [shopPhoneNumber, setShopPhoneNumber] = useState('');

    const [isShowALert, setIsShowALert] = useState(false);
    const [contentALert, setContentALert] = useState('');

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
            console.log(data);
            setShopName(data.name);
            setShopPhoneNumber(data.phoneNumber);
            localStorage.setItem('shopName', data.name);
            localStorage.setItem('shopPhoneNumber', data.phoneNumber);
            dispatch(foodsActions.setItems({items: data.items, total: data.items.length}));

        } catch(error) {
            console.log(error)
        }
    }, []);
    

    useEffect(() => {
        fetchItems();
    }, []);

    const copyShopUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/shop/${shopId}`);
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

                            <div className="profile-userpic">

                            </div>

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
                            <Switch>
                                {/* <Route exact path={path}>
                            <h3>Please select a topic.</h3>
                            </Route> */}
                                {/* <Route path={`${path}/:topicId`}>
                                <Foods />
                            </Route> */}

                                <Route path='/admin/foods'>
                                    <Foods toggleAlert={toggleAlert}/>
                                </Route>
                                <Route path='/admin/orders'>
                                    <Orders />
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