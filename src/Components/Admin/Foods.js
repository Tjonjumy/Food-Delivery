import { Fragment } from 'react';

import AddFoodItem from './AddFoodItem';

const Foods = () => {
    return <Fragment>
        <div className="row justify-content-end">
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Add</button>
        </div>
        <div className="row mt-3">
            <div className="col-3">Picture</div>
            <div className="col-3">Name</div>
            <div className="col-3">Price</div>
            <div className="col-3"></div>
        </div>
        <div className="row mt-3">
            <div className="col-3 food-img">
                <img src="https://baoamthuc.com/wp-content/uploads/antag/2019/02/cach-lam-pizza-tom-chien-hap-dan-tai-nha-0143.jpg" alt="cake" />
            </div>
            <div className="col-3">Cake</div>
            <div className="col-3">$5.00</div>
            <div className="col-3">
                <button type="button" className="btn btn-secondary mr-2">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-3 food-img">
                <img src="https://baoamthuc.com/wp-content/uploads/antag/2019/02/cach-lam-pizza-tom-chien-hap-dan-tai-nha-0143.jpg" alt="cake" />
            </div>
            <div className="col-3">Cake</div>
            <div className="col-3">$5.00</div>
            <div className="col-3">
                <button type="button" className="btn btn-secondary mr-2">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </div>
        <AddFoodItem />
        
    </Fragment>
}

export default Foods;