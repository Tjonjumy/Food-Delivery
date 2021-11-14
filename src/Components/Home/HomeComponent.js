import { Fragment } from "react";
import { useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

import classes from './Home.module.css';
import homeBannerImg from '../../assets/images/home-banner.png';
const Home = () => {
    const history = useHistory();

    const shopId = useSelector(state => state.auth.shopId);
    const customerId = useSelector(state => state.auth.customerId);

    if (shopId) {
        history.push(`/admin`);
    };
    if (customerId) {
        history.push(`/shopping`);
    }

    return <Fragment>
        <div className={classes['main-container']}>
            <div className={`row m-0 ${classes['intro-page']}`}>
                <div className='col-md-6 pl-lg-5'>
                    <h1 className={classes.slogan}>Food Delivery</h1>
                    <p className='pl-2'>Freshness and craziness delivered at your doorstep.</p>
                    <button type="button" className="btn btn-primary btn-lg">
                        <Link to="/buyer/sign-up">Sign Up</Link>
                    </button>
                </div>
                <div className={`col-md-6 ${classes['main-image']}`}>
                    <img src={homeBannerImg} alt='Home banner'/>
                </div>
            </div>
        </div>
    </Fragment>
}

export default Home;