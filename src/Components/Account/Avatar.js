import { useCallback, useState, useEffect } from 'react';

const Avatar = (props) => {
    const {avatar} = props;
    const [image, setImage] = useState(null);

    const shopId = localStorage.getItem('shopId');

    const urlFetchShop = `http://localhost:8080/api/Shop/${shopId}`;

    const fetchShopInfo = useCallback(async () => {
        const response = await fetch(urlFetchShop,
            {
                method: 'GET',
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setImage(data.image);
        //dispatch(foodsActions.setItems({items: data.items, total: data.items.length}));
    }, []);

    useEffect(() => {
        if (shopId) {
            fetchShopInfo();
        }
    })

    return (
        <>
            {/* <div className="avatar-wraper dropdown-toggle">
                <img src={`data:image/jpeg;base64,${image}`} alt="your avatar"
                    id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" />
            </div> */}
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                <img src={`data:image/jpeg;base64,${avatar}`} alt="your avatar" className="avatar" />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {/* <p className="dropdown-item" onClick={props.logOutHandler}>My Account</p> */}
                    <p className="dropdown-item" onClick={props.logOutHandler}>Sign Out</p>
                </div>
            </div>
        </>
    )
}

export default Avatar;