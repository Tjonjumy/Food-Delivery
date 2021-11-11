import './App.css';
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
import CusHomePage from './Components/Customer/CusHomePage';

function App() {
 

  return (
    <Router>
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

          <Route path="/shop">
            <CusHomePage />
          </Route>
          {/* <Route path="/shop/:shopId">
            <ShopHome />
          </Route> */}
          <PrivateRoute path="/admin">
            <AdminHome />
          </PrivateRoute>
        </Switch>
    </Router>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
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
              pathname: "/shop/sign-in",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

