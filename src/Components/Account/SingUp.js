import { Fragment, useState , useRef  } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useHistory } from 'react-router-dom';

import './Account.css';
import homeBannerImg from '../../assets/images/home-banner.png';

const SignUp = (props) => {
    const {role} = props;

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
    if (shopNameInputIsInvalid || phoneNumberInputIsInvalid) {
        formIsValid = true;
    }

    const previewImgHandler = (evt) => {
        const selectedImg = imgRef.current.files[0];
        if (selectedImg) {
            setImgInp(selectedImg, () => {
                imgPreviewRef.current.src = URL.createObjectURL(selectedImg);
            });
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
        if (!formIsValid) {
            //return;
        }
        const formData = new FormData();
        formData.append('Name', shopName);
        formData.append('PhoneNumber', phoneNumber);
        if (role == 'shop') {
            formData.append('Logo', imgInp);
        } else {
            formData.append('Avatar', imgInp);
        }
        console.log(formData);
        const urlApi = role == 'shop' ? 'http://localhost:8080/api/Shop/register' : 'http://localhost:8080/api/Customer/register';
        fetch(urlApi, {
            method: 'POST', 
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                
            } else {
                history.push(`/${role}/sign-in`);
            }
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
        <div className="main-container">
            <div className="row m-0 intro-page">
                <div className='col-md-6 justify-content-center row'>
                    <div className="card col-8 pb-4">
                        <h2 className="card-title mt-3">Create account</h2>
                        <form onSubmit={registerhandler}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-12 col-form-label">
                                    {role == 'shop' ? 'Shop Name' : 'Name'}&nbsp;<span className="required">*</span>
                                </label>
                                <div className="col-12">
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
                                <label htmlFor="phoneNumber" className="col-12 col-form-label">
                                    Phone Number&nbsp;<span className="required">*</span>
                                </label>
                                <div className="col-12">
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
                                <label htmlFor="inputPassword" className="col-12 col-form-label">Logo</label>
                                <div className="col-12">
                                    {imgInp && <i className="fa fa-times remove-img" aria-hidden="true" onClick={removeImgHnadler}></i>}
                                    {imgInp && <img className="preview-img" id="previewImg" src="#" alt="Your logo" ref={imgPreviewRef}/>}
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
                            <div className="col-12 form-group mt-3 p-0">
                                <button type="submit" className="btn btn-warning col-12">Create your account</button>
                            </div>
                        </form>
                </div>
                </div>
                <div className="col-md-6 main-image">
                    <img src={homeBannerImg} alt='Register banner'/>
                </div>
            </div>
        </div>
    </Fragment>
}

export default SignUp;
