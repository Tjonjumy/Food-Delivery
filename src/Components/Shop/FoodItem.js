import { useDispatch } from 'react-redux';

import { foodsActions } from '../../Store/foods';


const FoodItem = (props) => {
    const { name, price, image, itemId, shopId, isActive } = props.item;
    const dispatch = useDispatch();

    const urlDelete = 'http://localhost:8080/api/Item';
    const urlActive = 'http://localhost:8080/api/Item/active';

    const removeItem = async () => {    
        try {
            const response = await fetch(urlDelete,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    },
                    body: JSON.stringify(
                        {
                            'shopId': shopId,
                            'itemId': itemId
                        }
                    ),
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            if (!data.errorMessage) {
                dispatch(foodsActions.removeItem(itemId));
                props.toggleAlert(true, 'Disable item successfully!');
                setTimeout(() => {props.toggleAlert(false)}, 1000);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const activeItem = async () => {
        try {
            const response = await fetch(urlActive,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    },
                    body: JSON.stringify(
                        {
                            'shopId': shopId,
                            'ItemId': itemId
                        }
                    ),
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            if (data.isSucess) {
                dispatch(foodsActions.activeItem(data.itemId));
                props.toggleAlert(true, 'Active item successfully!');
                setTimeout(() => {props.toggleAlert(false)}, 1000);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const editItem = () => {
        props.getItemEdit(props.item);
    }

    return <>
        <div className="row mt-3">
            <div className="col-3 food-img">
                <img src={`data:image/jpeg;base64,${image}`} alt="food image"/>
            </div>
            <div className="col-3">{name}</div>
            <div className="col-3">${price}</div>
            <div className="col-3">
                <button type="button" className="btn btn-outline-secondary btn-sm mr-2"
                data-toggle="modal" data-target="#exampleModal"
                onClick={editItem}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                </button>
                {isActive &&
                <button type="button" className="btn btn-outline-danger btn-sm"
                    onClick={removeItem}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete
                </button>}
                {!isActive &&
                <button type="button" className="btn btn-outline-success btn-sm"
                    onClick={activeItem}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Active
                </button>}
            </div>
        </div>
        {/* <AddFoodItem toggleAlert={props.toggleAlert} item={props.item}/> */}
    </>
}

export default FoodItem;