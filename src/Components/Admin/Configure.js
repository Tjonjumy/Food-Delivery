import { Fragment, useState, useRef, useEffect } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

import Loader from '../Alert/Loader';
import Notification from '../Alert/Notification';

const Configure = (props) => {

    const { shopName, shopPhoneNumber, logo } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const shopNameRef = useRef();
    const shopPhoneNumberRef = useRef();

    const imgRef = useRef();
    const imgPreviewRef = useRef();

    const [contentALert, setContentALert] = useState('');

    const [imgInp, setImgInp] = useStateWithCallbackLazy('');

    const [enteredShopName, setEnteredShopName] = useState('');
    const [enteredShopNameTouched, setEnteredShopNameTouched] = useState(false);
    
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
    const [enteredPhoneNumberTouched, setEnteredPhoneNumberTouched] = useState(false);

    const enteredShopNameIsValid = enteredShopName.trim() !== '' && enteredShopName.trim().length <= 100;
    const shopNameInputIsInvalid = !enteredShopNameIsValid && enteredShopNameTouched;

    const enteredPhoneNumberIsValid = enteredPhoneNumber.trim() !== '' && enteredPhoneNumber.trim().length === 10;
    const phoneNumberInputIsInvalid = !enteredPhoneNumberIsValid && enteredPhoneNumberTouched;

    let formIsValid = false;
    if (!shopNameInputIsInvalid && !phoneNumberInputIsInvalid) {
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
                setEnteredShopName(value);
                break;
            default:
                setEnteredPhoneNumber(value);
        }
    }

    const inputBlurHandler = (event) => {
        const filedName = event.target.name;
        switch (filedName) {
            case 'shopName':
                setEnteredShopNameTouched(true);
                break;
            default:
                setEnteredPhoneNumberTouched(true);
        }
    }

    const onEditForm = () => {
        setIsEdit(true);
    }
    const updateShopInfo = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        const formData = new FormData();
        formData.append('Name', enteredShopName);
        formData.append('PhoneNumber', shopPhoneNumber);
        formData.append('NewPhoneNumber', enteredPhoneNumber);
        formData.append('Logo', imgInp);
        const urlUpdateShop = 'http://localhost:8080/api/Shop';
        fetch(urlUpdateShop, {
            method: 'PUT', 
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (!data.errorMessage) {
                setIsLoading(true);
                window.location.reload();
                setContentALert('Update Successfully!');
                setTimeout(() => {
                    setIsLoading(false);
                    setContentALert('');
                }, 3500);
            }
        })
    }

    const removeImgHnadler = () => {
        const imgInput = document.getElementById('imgInp');
        imgInput.value = '';
        setImgInp('');
    }

    const maxlengthHandler = (event) => {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
    }

    const nameInputClasses = shopNameInputIsInvalid
        ? 'form-control is-invalid'
        : 'form-control';

    const phoneInputClasses = phoneNumberInputIsInvalid
        ? 'form-control is-invalid'
        : 'form-control';

    useEffect(() => {
        if (isEdit) {
            shopNameRef.current.value = shopName;
            shopPhoneNumberRef.current.value = shopPhoneNumber;
        }
        setEnteredShopName(shopName);
    }, [isEdit])

    return (
        <Fragment>
            <div className="card col-12 pb-4 pl-5">
                <h2 className="card-title text-center mt-3">Update Shop Information</h2>
                <form onSubmit={updateShopInfo}>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-12 col-form-label font-weight-bold">
                        Shop Name&nbsp;<span className="required">*</span>
                        </label>
                        {!isEdit && <div className="col-12">{shopName}</div>}
                        {   isEdit &&
                            <div className="col-12">
                            <input type="text" name="shopName" className={nameInputClasses}
                                id="shopName" maxLength="100"
                                ref={shopNameRef}
                                onChange={inputChangeHandler}
                                onBlur={inputBlurHandler}
                            />
                            {
                                shopNameInputIsInvalid &&
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                    Shop Name must not be empty.
                                </div>
                            }
                        </div>
                        }
                    </div>

                    <div className="form-group row">
                        <label htmlFor="phoneNumber" className="col-12 col-form-label font-weight-bold">
                            Phone Number&nbsp;<span className="required">*</span>
                        </label>
                        {!isEdit && <div className="col-12">{shopPhoneNumber}</div>}
                        {   isEdit &&
                            <div className="col-12">
                            <input type="number" className={phoneInputClasses} id="phoneNumber"
                                name="phoneNumber" maxLength="10"
                                ref={shopPhoneNumberRef}
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
                        </div>
                        }
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-12 col-form-label font-weight-bold">Logo</label>
                        <div className="col-12">
                            {!imgInp && <img src={`data:image/jpeg;base64,${logo}`} alt="food image" className="preview-img-update"/>}
                            {imgInp && <i className="fa fa-times remove-img-update" aria-hidden="true" onClick={removeImgHnadler}></i>}
                            {imgInp && <img className="preview-img-update" id="previewImg" src="#" alt="Your logo" ref={imgPreviewRef} />}
                            {isEdit && <label className="pt-2 inp-img d-block" htmlFor="imgInp" id="labelImgInp">
                                <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;Select another Image
                            </label>}
                            <input type="file" name="logo" className="form-control-file d-none" ref={imgRef}
                                accept="image/*" id="imgInp" onChange={previewImgHandler} />
                        </div>
                    </div>
                    <div className="col-12 form-group mt-3 p-0 text-center">
                        {!isEdit && <button type="button" className="btn btn-outline-primary w-auto col-12"
                            onClick={onEditForm}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit Information
                        </button>}

                        {isEdit &&
                            <button type="submit" className="btn btn-outline-primary w-auto col-12"
                            disabled={!formIsValid}>Update Information</button>}
                        {isEdit &&
                        <button type="button" className="btn btn-outline-secondary w-auto col-12 ml-3"
                        onClick={() => {setIsEdit(false)}}>Cancel</button>}
                    </div>
                </form>
            </div>
            {isLoading && <Loader />}
            {isLoading && <Notification contentALert={contentALert}/>}
        </Fragment>
    )
}

export default Configure;