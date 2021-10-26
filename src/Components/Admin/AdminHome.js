import { Fragment } from 'react';
import { useParams, useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';

import './AdminHome.css';
import Foods from './Foods';
import Orders from './Orders';

const AdminHome = () => {
    let { path, url } = useRouteMatch();

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
                                    Marcus Doe Shop
                                </div>
                                <div className="profile-usertitle-job">
                                    Admin
                                </div>
                            </div>
                            
                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-success btn-sm">Follow</button>
                                <button type="button" className="btn btn-danger btn-sm">Message</button>
                            </div>
                            
                            <div className="profile-usermenu">
                                <ul className="nav flex-column">
                                    <li>
                                        <NavLink activeClassName="active"  to={`${url}/overview`}>
                                        <i className="glyphicon glyphicon-home"></i>
                                        Overview </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active"  to={`${url}/foods`}>
                                        <i className="glyphicon glyphicon-user"></i>
                                        Foods </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active"  to={`${url}/orders`}>
                                        <i className="glyphicon glyphicon-ok"></i>
                                        All Orders </NavLink>
                                    </li>
                                    <li>
                                        <NavLink activeClassName="active"  to={`${url}/configure`}>
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
                            {/* <Route exact path={path}>
                            <h3>Please select a topic.</h3>
                            </Route> */}
                            {/* <Route path={`${path}/:topicId`}>
                                <Foods />
                            </Route> */}
                            
                            <Route path='/admin/foods'>
                                <Foods />
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

function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams();
  
    return (
      <div>
        <h3>{topicId}</h3>
      </div>
    );
  }