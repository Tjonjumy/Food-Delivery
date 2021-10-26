import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router,
          Switch,
          Route
} from "react-router-dom";

import Home from './Components/Home/HomeComponent';
import Header from './Components/UI/Header';
import SignUp from './Components/Account/SingUp';
import SignIn from './Components/Account/SignIn';
import AdminHome from './Components/Admin/AdminHome';
function App() {
 

  return (
    <Router>
      <div className='w-100'>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/admin">
            <AdminHome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
