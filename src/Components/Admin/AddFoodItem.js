import { Fragment, useState , useRef  } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useHistory } from 'react-router-dom';

const AddFoodItem = () => {
    const history = useHistory();

    const imgRef = useRef();
    const imgPreviewRef = useRef();

    const [imgInp, setImgInp] = useStateWithCallbackLazy('');
    const previewImgHandler = (evt) => {
        const selectedImg = imgRef.current.files[0];
        if (selectedImg) {
            setImgInp(selectedImg);
        }
    }
    const removeImgHnadler = () => {
        const imgInput = document.getElementById('imgInp');
        imgInput.value = '';
        setImgInp('');
    }
    return <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="staticEmail"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Price</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputPassword" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-lg-3 col-form-label">Logo</label>
                                    <div className="col-lg-9">
                                        {imgInp && <i className="fa fa-times" aria-hidden="true" onClick={removeImgHnadler}></i>}
                                        {imgInp && <img className="preview-img" id="previewImg" src="#" alt="Your logo" ref={imgPreviewRef} />}
                                        {!imgInp && <label className="pt-2 inp-img" htmlFor="imgInp" id="labelImgInp">
                                            <i className="fa fa-picture-o" aria-hidden="true"></i>&nbsp;Select Image
                                        </label>}
                                        {imgInp && <label className="pt-2 inp-img d-block" htmlFor="imgInp" id="labelImgInp">
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
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddFoodItem;