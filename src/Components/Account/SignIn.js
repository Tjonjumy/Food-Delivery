import { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';


import './Account.css';
import homeBannerImg from '../../assets/images/home-banner.png';
import { authActions } from '../../Store/auth';

const SignIn = (props) => {
    const {role} = props;
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const history = useHistory();

    const [signError, setSignError] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [enteredPhoneNumberTouched, setEnteredPhoneNumberTouched] = useState(false);
    const enteredPhoneNumberIsValid = phoneNumber.trim() !== '' && phoneNumber.trim().length === 10;
    const phoneNumberInputIsInvalid = !enteredPhoneNumberIsValid && enteredPhoneNumberTouched;

    const maxlengthHandler = (event) => {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
    }

    const inputChangeHandler = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
        setSignError(false);
    }

    const inputBlurHandler = () => {
            setEnteredPhoneNumberTouched(true);
        }

    const urlApi = role == 'shop' ? 'http://localhost:8080/api/Shop/login' : 'http://localhost:8080/api/Customer/login';
    
    const loginHandler = async (event) => {
        event.preventDefault();
        if (!enteredPhoneNumberIsValid) {
            return;
        }
        const response = await fetch(urlApi, {
            method: 'POST', 
            body: JSON.stringify({phoneNumber: phoneNumber}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        });
        if (!response.ok) {
            setSignError(true);
        }
        const data = await response.json();
        if (role == 'shop') {
            history.push('/admin');
            dispatch(authActions.login({phoneNumber: data.phoneNumber, shopId: data.shopId, image: data.image}));
            const shopId = data.shopId;
            localStorage.setItem('shopId', shopId);
        } else {
            dispatch(authActions.login({phoneNumber: data.phoneNumber, customerId: data.customerId, image: data.avatar}));
            localStorage.setItem('customer', JSON.stringify(data)); 
            history.push('/shopping');
        }
    } 

    useEffect(() => {
        if (isAuth) {
            if (role == 'shop') {
                history.push("/admin");
            } else {
                history.push("/shopping");
            }
        }
    });

    const redirectToSignup = () => {
        if (role == 'shop') {
            history.push("/shop/sign-up");
        } else {
            history.push("/buyer/sign-up");
        }
    }

    const phoneInputClasses = phoneNumberInputIsInvalid || signError
        ? 'form-control is-invalid'
        : 'form-control';

    return <Fragment>
                <div className="main-container">
                    <div className="row m-0 intro-page">
                        <div className='col-md-6 justify-content-center row'>
                            <div className="card col-8 pb-4">
                                <h2 className="card-title mt-3">Sign-In</h2>
                                <form onSubmit={loginHandler}>
                                    <div className="form-group row">
                                        <label htmlFor="inputPassword" className="col-12 col-form-label">
                                            Phone Number
                                        </label>
                                        <div className="col-12">
                                            <input type="number" className={phoneInputClasses} id="phoneNumber" 
                                            name="phoneNumber" placeholder="PhoneNumber" maxLength="10"  
                                            onInput={maxlengthHandler}
                                            onChange={inputChangeHandler}
                                            onBlur={inputBlurHandler}
                                            />
                                            {
                                                phoneNumberInputIsInvalid &&
                                                <div id="validationServer03Feedback" className="invalid-feedback">
                                                Phone number should take only numbers and length should be 10 digits.
                                                </div>
                                            }
                                            {
                                                signError &&
                                                <div id="validationServer03Feedback" className="invalid-feedback">
                                                Account does not exist.
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12 form-group mt-3 p-0">
                                        <button type="submit" className="btn btn-primary col-12">Continue</button>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-3 row col-8 justify-content-center divider">
                                <h5>{role === 'shop' ? 'New Seller' : 'New customer?'}</h5>
                            </div>
                            <div className="col-8 form-group mt-3 p-0">
                                <button type="submit" className="btn btn-warning col-12"
                                onClick={redirectToSignup}>Create your account</button>
                            </div>
                        </div>
                        <div className="col-md-6 main-image">
                            <img src={homeBannerImg} alt='Register banner'/>
                        </div>
                    </div>
                </div>
            </Fragment>
}

export default SignIn;