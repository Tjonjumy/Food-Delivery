import { Fragment } from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';

import './AdminHome.css';

const DashBoard = () => {
    const { url } = useRouteMatch();

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <div className="card text-center">
                        <i className="fa fa-check-square-o icon-dashboard" aria-hidden="true"></i>
                        <div className="card-body">
                            <h2 className="card-title">10+ orders</h2>
                            <NavLink to={`${url}/orders`} className="btn btn-primary">View</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                    <div className="card text-center">
                        <i className="fa fa-cutlery icon-dashboard" aria-hidden="true"></i>
                        <div className="card-body">
                            <h2 className="card-title">25+ products</h2>
                            <NavLink to={`${url}/foods`} className="btn btn-primary">View</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DashBoard;