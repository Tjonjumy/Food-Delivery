import { Fragment, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddFoodItem from './AddFoodItem';
import { foodsActions } from '../../Store/foods';
import FoodItem from '../Foods/FoodItem';

const Foods = (props) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState(null);
    const id = localStorage.getItem('shopId');
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
    const url = `http://localhost:8080/api/Shop/${id}`;
    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(url,
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log(data);
            dispatch(foodsActions.setItems({items: data.items, total: data.items.length}));

        } catch(error) {
            console.log(error)
        }
    }, []);
    

    // useEffect(() => {
    //     fetchItems();
    // }, [fetchItems]);


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
        {listItems}
        
        <AddFoodItem toggleAlert={props.toggleAlert} item={item}/>
        
    </Fragment>
}

export default Foods;