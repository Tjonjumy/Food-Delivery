import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Header.module.css';

const Header = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    return <Fragment>
        <ul className={classes.header}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {
            !isAuth && 
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          }
          {
            isAuth && 
            <li>
              <Link to="/sign-in">Sign Out</Link>
            </li>
          }
        </ul>
    </Fragment>
}

export default Header;