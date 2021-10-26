import { Fragment, useState} from 'react';
import { useHistory } from 'react-router'; 
import { useDispatch } from 'react-redux';

import classes from './Account.module.css'
import homeBannerImg from '../../assets/images/home-banner.png';
import { authActions } from '../../Store/auth';

const SignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [phoneNumber, setPhoneNumber] = useState('');

    const phoneNumberInputIsInvalid = false;

    const maxlengthHandler = (event) => {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
    }

    const inputChangeHandler = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const loginHandler = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/Shop/login', {
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
            return response.json()}
        )
        .then(data => {
            console.log(useDispatch)
            dispatch(authActions.login());
            const shopId = data.shopId;
            history.push('/admin')
        })
        .catch((error) => {

            console.error('Error:', error);
        });
    }

    const phoneInputClasses = 'form-control';
    return <Fragment>
                <div className={classes['main-container']}>
                    <div className={`row m-0 ${classes['intro-page']}`}>
                        <div className='col-md-6 pl-xl-5 pl-lg-3'>
                        <form onSubmit={loginHandler}>

                            <div className="form-group row">
                                <label htmlFor="inputPassword" className="col-lg-3 col-form-label">
                                    Phone Number&nbsp;<span className="required">*</span>
                                </label>
                                <div className="col-lg-9">
                                    <input type="number" className={phoneInputClasses} id="phoneNumber" 
                                    name="phoneNumber" placeholder="PhoneNumber" maxLength="15"  
                                    onInput={maxlengthHandler}
                                    onChange={inputChangeHandler}
                                    />
                                    {
                                        phoneNumberInputIsInvalid &&
                                        <div id="validationServer03Feedback" className="invalid-feedback">
                                            Please provide a valid phone number.
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="form-group justify-content-center row mt-5">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        </div>
                        <div className={`col-md-6 ${classes['main-image']}`}>
                            <img src={homeBannerImg} alt='Register banner'/>
                        </div>
                    </div>
                </div>
            </Fragment>
}

export default SignIn;