import { useCallback, useState } from 'react';


const FoodItem = (props) => {
    const { name, price, image, itemId, shopId, isActive } = props.item;
    const [isDisabled, setIsDisabled] = useState(false);
    const url = 'http://localhost:8080/api/Item';
    const removeItem = useCallback(async () => {
        try {
            const response = await fetch(url,
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
            console.log(data);
            setIsDisabled(true);
            props.toggleAlert(true, 'Disable item successfully!');
            setTimeout(() => {props.toggleAlert(false)}, 1000);
            //dispatch(foodsActions.setItems({items: data.items, total: data.items.length}));

        } catch (error) {
            console.log(error)
        }
    }, []);

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
                <button type="button" className="btn btn-outline-secondary mr-2"
                data-toggle="modal" data-target="#exampleModal"
                onClick={editItem}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit
                </button>
                <button type="button" className="btn btn-outline-danger"
                    disabled={!isActive || isDisabled ? 'disabled' : null}
                    onClick={removeItem}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete
                </button>
            </div>
        </div>
        {/* <AddFoodItem toggleAlert={props.toggleAlert} item={props.item}/> */}
    </>
}

export default FoodItem;