import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

const Header = () => {
    return <Fragment>
        <ul className={classes.header}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
    </Fragment>
}

export default Header;