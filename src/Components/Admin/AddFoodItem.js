import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

import { foodsActions } from '../../Store/foods';

const AddFoodItem = (props) => {
    const {item, isAdd} = props;
    
    const dispatch = useDispatch();
    const shopId = useSelector(state => state.auth.shopId);

    const imgRef = useRef();
    const nameItemRef = useRef();
    const priceRef = useRef();
    const imgPreviewRef = useRef();

    const [imgInp, setImgInp] = useStateWithCallbackLazy('');
    
    useEffect(() => {
        if (item && !isAdd) {
            nameItemRef.current.value = item.name;
            priceRef.current.value = item.price;
        }
    }, [isAdd, item])

    const previewImgHandler = (evt) => {
        const selectedImg = imgRef.current.files[0];
        if (selectedImg) {
            setImgInp(selectedImg, () => {
                imgPreviewRef.current.src = URL.createObjectURL(selectedImg);
            });
        }
    }
    const removeImgHnadler = () => {
        // const imgInput = document.getElementById('imgInp');
        imgRef.current.value = '';
        setImgInp('');
    }

    const addItemHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('ShopId', shopId);
        formData.append('Name', nameItemRef.current.value.trim());
        formData.append('Price', priceRef.current.value);
        formData.append('Image', imgInp);
        fetch('http://localhost:8080/api/Item/create', {
            method: 'POST', 
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            dispatch(foodsActions.addItem(data));
            imgRef.current.value = '';
            nameItemRef.current.value = '';
            priceRef.current.value = '';
            setImgInp('');
            props.toggleAlert(true, 'Add item successfully!');
            setTimeout(() => {props.toggleAlert(false)}, 1500)
            //{"itemId":"e1fe0b","name":"Hamburge","price":1.0,"image":"","isActive":true,"errorMessage":null,"shopId":null}
        })
    }
    const urlEditItem = 'http://localhost:8080/api/Item';
    const editItemHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('ShopId', shopId);
        formData.append('ItemId', item.itemId);
        formData.append('Name', nameItemRef.current.value.trim());
        formData.append('Price', priceRef.current.value);
        formData.append('Image', imgInp);
        fetch(urlEditItem, {
            method: 'PUT', 
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (!data.errorMessage) {
                const updateItem = {
                    itemId: item.itemId,
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    shopId: item.shopId,
                    isActive: item.isActive
                }
                dispatch(foodsActions.updateItem(updateItem));
                props.toggleAlert(true, 'Update successfully!');
                setTimeout(() => {props.toggleAlert(false)}, 1500)
            } else {
                props.toggleAlert(true, data.errorMessage);
                setTimeout(() => {props.toggleAlert(false)}, 1500)
            }
        })
    }

    return <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add food item</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                            <form onSubmit={addItemHandler}>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="staticEmail" ref={nameItemRef}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Price</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="inputPassword" ref={priceRef}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-lg-2 col-form-label">Logo</label>
                                    <div className="col-lg-10">
                                        {imgInp && <i className="fa fa-times remove-img" aria-hidden="true" onClick={removeImgHnadler}></i>}
                                        {imgInp && <img className="preview-img" id="previewImg" src="#" alt="Your logo" ref={imgPreviewRef} />}
                                        {!imgInp && isAdd && <label className="pt-2 inp-img" htmlFor="imgInp" id="labelImgInp">
                                            <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;Select Image
                                        </label>}
                                        {!isAdd && item && !imgInp && <img src={`data:image/jpeg;base64,${item.image}`} alt="food image" className="preview-img"/>}
                                        {( imgInp || !isAdd ) && <label className="pt-2 inp-img d-block" htmlFor="imgInp" id="labelImgInp">
                                            <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;Select another Image
                                        </label>}
                                        <input type="file" name="logo" className="form-control-file d-none" ref={imgRef}
                                            accept="image/*" id="imgInp" onChange={previewImgHandler} />
                                    </div>
                                </div>
                            </form>

                       
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {isAdd && <button type="submit" className="btn btn-primary" onClick={addItemHandler}>Add</button>}
                        {!isAdd && <button type="submit" className="btn btn-primary" onClick={editItemHandler}>Save</button>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddFoodItem;