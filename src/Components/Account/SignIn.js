import { Fragment, useState} from 'react';
import { useHistory } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';


import './Account.css';
import homeBannerImg from '../../assets/images/home-banner.png';
import { authActions } from '../../Store/auth';

const SignIn = (props) => {
    const {role} = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [enteredPhoneNumberTouched, setEnteredPhoneNumberTouched] = useState(false);
    const enteredPhoneNumberIsValid = phoneNumber.trim() !== '' && phoneNumber.trim().length > 9 && phoneNumber.trim().length <= 15;
    const phoneNumberInputIsInvalid = !enteredPhoneNumberIsValid && enteredPhoneNumberTouched;

    const maxlengthHandler = (event) => {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
    }

    const inputChangeHandler = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const inputBlurHandler = () => {
        console.log(enteredPhoneNumberTouched, enteredPhoneNumberIsValid, phoneNumberInputIsInvalid)
            setEnteredPhoneNumberTouched(true);
        }

    const urlApi = role == 'shop' ? 'http://localhost:8080/api/Shop/login' : 'http://localhost:8080/api/Customer/login';
    const loginHandler = (event) => {
        event.preventDefault();
        console.log(enteredPhoneNumberIsValid)
        if (!enteredPhoneNumberIsValid) {
            return;
        }
        fetch(urlApi, {
            method: 'POST', 
            body: JSON.stringify({phoneNumber: phoneNumber}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })
        .then(response => {
            if (!response.ok) {
                throw('error')
            }
            console.log(response);
            return response.json()
        }
        )
        .then(data => {
            if (role == 'shop') {
                dispatch(authActions.login({phoneNumber: data.phoneNumber, shopId: data.shopId, image: data.image}));
                const shopId = data.shopId;
                localStorage.setItem('shopId', shopId);
                history.push('/admin')
            } else {
                dispatch(authActions.login({phoneNumber: data.phoneNumber, customerId: data.customerId, image: data.avatar}));
                localStorage.setItem('customer', JSON.stringify(data)); 
                history.push('/shopping')
            }
        })
        .catch((error) => {

            console.error('Error:', error);
        });
    }
    
    const redirectToSignup = () => {
        if (role == 'shop') {
            history.push("/shop/sign-up");
        } else {
            history.push("/buyer/sign-up");
        }
    }

    const phoneInputClasses = phoneNumberInputIsInvalid
        ? 'form-control is-invalid'
        : 'form-control';

    return <Fragment>
                <div className="main-container">
                    <div className="row m-0 intro-page">
                        <div className='col-md-6 justify-content-center row'>
                            <div className="card col-8 pb-4">
                                <h2 className="card-title mt-3">Sing-In</h2>
                                <form onSubmit={loginHandler}>
                                    <div className="form-group row">
                                        <label htmlFor="inputPassword" className="col-12 col-form-label">
                                            Phone Number
                                        </label>
                                        <div className="col-12">
                                            <input type="number" className={phoneInputClasses} id="phoneNumber" 
                                            name="phoneNumber" placeholder="PhoneNumber" maxLength="15"  
                                            onInput={maxlengthHandler}
                                            onChange={inputChangeHandler}
                                            onBlur={inputBlurHandler}
                                            />
                                            {
                                                phoneNumberInputIsInvalid &&
                                                <div id="validationServer03Feedback" className="invalid-feedback">
                                                    Please provide a valid phone number.
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12 form-group mt-3 p-0">
                                        <button type="submit" className="btn btn-warning col-12">Continue</button>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-3 row col-8 justify-content-center divider">
                                <h5>New customer?</h5>
                            </div>
                            <div className="col-8 form-group mt-3 p-0">
                                <button type="submit" className="btn btn-outline-secondary col-12"
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