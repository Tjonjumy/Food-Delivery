import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Header.css';
import { authActions } from '../../Store/auth';
import CartButton from '../Cart/CartButton';
import Avatar from '../Account/Avatar';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    let customerId = useSelector(state => state.auth.customerId);
    let avatar = useSelector(state => state.auth.image);
    const shopId = localStorage.getItem('shopId');
    const customer = JSON.parse(localStorage.getItem('customer'));

    if (customer) {
      customerId = customer.customerId;
      avatar = customer.avatar;
    }
    if (shopId || customerId) {
      dispatch(authActions.login({shopId: shopId, customerId: customerId, image: avatar}));
    }

    const [isCustomer, setIsCustomer] = useState(false);
    const logOutHandler = () => {
      localStorage.removeItem('shopId');
      localStorage.removeItem('customer');
      dispatch(authActions.logout());
      history.push('/')
      //setIsSignedIn(false);
    }
    const forCustomerHeader = () => {
      setIsCustomer(true);
    }

    const forAllUser = () => {
      setIsCustomer(false);
    }

    return <Fragment>
        <ul className="header">
          {!isCustomer &&
          <li>
            <Link to="/shop/sign-in">For Seller</Link>
          </li>}
          <li>
            <Link to="/" onClick={forAllUser}>Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {
            (!customerId && !shopId && !isAuth) &&
            <li>
              <Link to="/buyer/sign-in" onClick={forCustomerHeader}>Sign In</Link>
            </li>
          }
            <li className="user-info-wraper">
            { (isAuth && customerId) &&
            <CartButton />}
          { 
            (isAuth) && 
                <Avatar logOutHandler={logOutHandler} avatar={avatar}/>
          }
            </li>
        </ul>
    </Fragment>
}

export default Header;