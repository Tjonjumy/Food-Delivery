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
    const cartId = useSelector(state => state.cart.cartId);

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
      if (customerId) {
        localStorage.removeItem('customer');
      } else {
        localStorage.removeItem('shopId');
      }
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

    const goToCart = () => {
      history.push(`/shopping/cart/${cartId}`);
    }

    return <Fragment>
        <ul className="header">
          {!isCustomer && !isAuth &&
          <li>
            <Link to="/shop/sign-in"><i className="fa fa-shopping-bag" aria-hidden="true"></i>&nbsp;For Seller</Link>
          </li>}
          <li>
            <Link to="/" onClick={forAllUser}><i className="fa fa-home" aria-hidden="true"></i>&nbsp;Home</Link>
          </li>
          {
            (!customerId && !shopId && !isAuth) &&
            <li>
              <Link to="/buyer/sign-in" onClick={forCustomerHeader}>Sign In</Link>
            </li>
          }
          { (isAuth) && 
            <li className="user-info-wraper">
              { (customerId) &&
              <CartButton goToCart={goToCart}/>}
              <Avatar logOutHandler={logOutHandler} avatar={avatar}/>
            </li>
          }
        </ul>
    </Fragment>
}

export default Header;