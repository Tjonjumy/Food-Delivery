import { Fragment, useState , useRef  } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useHistory } from 'react-router-dom';

import classes from './Account.module.css';
import homeBannerImg from '../../assets/images/home-banner.png';

const SignUp = () => {
    const history = useHistory();

    const imgRef = useRef();
    const imgPreviewRef = useRef();

    const [imgInp, setImgInp] = useStateWithCallbackLazy('');

    const [shopName, setShopName] = useState('');
    const [enteredShopNameTouched, setEnteredShopNameTouched] = useState(false);
       
    const [phoneNumber, setPhoneNumber] = useState('');
    const [enteredPhoneNumberTouched, setEnteredPhoneNumberTouched] = useState(false);

    const enteredShopNameIsValid = shopName.trim() !== '' && shopName.trim().length <= 100;
    const shopNameInputIsInvalid = !enteredShopNameIsValid && enteredShopNameTouched;

    const enteredPhoneNumberIsValid = phoneNumber.trim() !== '' && phoneNumber.trim().length > 9 && phoneNumber.trim().length <= 15;
    const phoneNumberInputIsInvalid = !enteredPhoneNumberIsValid && enteredPhoneNumberTouched;

    let formIsValid = false;
    if (shopNameInputIsInvalid && phoneNumberInputIsInvalid) {
        formIsValid = true;
    }

    const previewImgHandler = (evt) => {
        const selectedImg = imgRef.current.files[0];
        if (selectedImg) {
            setImgInp(selectedImg);
        }
    }
    
    const inputChangeHandler = (event) => {
        const filedName = event.target.name;
        const value = event.target.value;
        switch (filedName) {
            case 'shopName':
                setShopName(value);
                break;
            default:
                setPhoneNumber(value);
        }
    }

    const maxlengthHandler = (event) => {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
    }
    
    const registerhandler = (event) => {
        event.preventDefault();
        setEnteredShopNameTouched(true);
        setEnteredPhoneNumberTouched(true);
        if (formIsValid) {
            return;
        }
        const formData = new FormData();
        formData.append('Name', shopName);
        formData.append('PhoneNumber', phoneNumber);
        formData.append('Logo', imgInp);
        fetch('http://localhost:8080/api/Shop/register', {
            method: 'POST', 
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            history.push('/sign-in')
        })
        .catch((error) => {

            console.error('Error:', error);
        });

    }

    const removeImgHnadler = () => {
        const imgInput = document.getElementById('imgInp');
        imgInput.value = '';
        setImgInp('');
    }

    const nameInputClasses = shopNameInputIsInvalid
        ? 'form-control is-invalid'
        : 'form-control';

    const phoneInputClasses = phoneNumberInputIsInvalid
        ? 'form-control is-invalid'
        : 'form-control';
        
    return <Fragment>
        <div className={classes['main-container']}>
            <div className={`row m-0 ${classes['intro-page']}`}>
                <div className='col-md-6 pl-xl-5 pl-lg-3'>
                <form onSubmit={registerhandler}>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-lg-3 col-form-label">
                            Shop Name&nbsp;<span className="required">*</span>
                        </label>
                        <div className="col-lg-9">
                            <input type="text" name="shopName" className={nameInputClasses} 
                            id="shopName" maxLength="100" placeholder="Name"
                            onChange={inputChangeHandler}
                            />
                            {
                                shopNameInputIsInvalid &&
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Shop Name must not be empty.
                                </div>
                            }
                        </div>
                    </div>

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
                    
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-lg-3 col-form-label">Logo</label>
                        <div className="col-lg-9">
                            {imgInp && <i className={`fa fa-times ${classes['remove-img']}`} aria-hidden="true" onClick={removeImgHnadler}></i>}
                            {imgInp && <img className={classes['preview-img']} id="previewImg" src="#" alt="Your logo" ref={imgPreviewRef}/>}
                            {!imgInp && <label className="pt-2 inp-img" htmlFor="imgInp" id="labelImgInp">
                                <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;Select Image
                            </label>}
                            {imgInp && <label className="pt-2 inp-img d-block" htmlFor="imgInp" id="labelImgInp">
                                <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;Select another Image
                            </label>}
                            <input type="file" name="logo" className="form-control-file d-none"  ref={imgRef}
                            accept="image/*" id="imgInp" onChange={previewImgHandler}/>
                        </div>
                    </div>
                    <div className="form-group justify-content-center row mt-5">
                        <button type="submit" className="btn btn-primary">Register</button>
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

export default SignUp;
