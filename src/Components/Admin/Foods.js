import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import AddFoodItem from './AddFoodItem';
import FoodItem from '../Shop/FoodItem';

const Foods = (props) => {

    const [item, setItem] = useState(null);

    const items = useSelector(state => state.foods.items);

    const getItemEdit = (item) => {
        setItem(item);
    }
    //const activeItems = items.filter(item => item.isActive);
    const listItems = items.map(item => {
        return <FoodItem key={item.itemId} item={item} 
            toggleAlert={props.toggleAlert}
            getItemEdit={getItemEdit}
            />
    })
    
    return <Fragment>
        <div className="row justify-content-end m-0">
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Add
            </button>
        </div>
        { listItems.length == 0  &&
            <div className="text-center">Has no product.</div>
        }
        {listItems.length > 0 && 
        <div className="row mt-3">
            <div className="col-3">Picture</div>
            <div className="col-3">Name</div>
            <div className="col-3">Price</div>
            <div className="col-3"></div>
        </div>}
        {listItems}
        
        <AddFoodItem toggleAlert={props.toggleAlert} item={item}/>
        
    </Fragment>
}

export default Foods;