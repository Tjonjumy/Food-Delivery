import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router,
          Switch,
          Route,
          Redirect,
} from "react-router-dom";

import Home from './Components/Home/HomeComponent';
import Header from './Components/Layout/Header';
import SignUp from './Components/Account/SingUp';
import SignIn from './Components/Account/SignIn';
import AdminHome from './Components/Admin/AdminHome';
import ShopHome from './Components/Customer/ShopHome';
function App() {
 

  return (
    <Router>
      <div className='w-100'>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/buyer/sign-in">
            <SignIn role="buyer"/>
          </Route>
          <Route path="/shop/sign-in">
            <SignIn role="shop"/>
          </Route>
          <Route path="/buyer/sign-up">
            <SignUp role="buyer"/>
          </Route>
          <Route path="/shop/sign-up">
            <SignUp role="shop"/>
          </Route>
          {/* <Route path="/shop">
            <AllShopHome />
          </Route> */}
          <Route path="/shop/:shopId">
            <ShopHome />
          </Route>
          <PrivateRoute path="/admin">
            <AdminHome />
          </PrivateRoute>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  let isAuth = useSelector(state => state.auth.isAuthenticated);
  const shopId = localStorage.getItem('shopId');
  return (
    <Route
      {...rest}
      render={({ location }) =>
      shopId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
