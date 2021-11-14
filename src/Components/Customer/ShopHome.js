import { Fragment, useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { foodsActions } from '../../Store/foods';
import { cartActions } from '../../Store/cart'
import FoodItem from './Foods/FoodItem';
import Loader from '../Alert/Loader';
import Notification from '../Alert/Notification';

const ShopHome = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isShowALert, setIsShowALert] = useState(false);
    const [contentALert, setContentALert] = useState(false);
    const [classALert, setClassALert] = useState('alert-success');

    const customer = JSON.parse(localStorage.getItem('customer'));
    let customerId;
    if (customer) {
        customerId = customer.customerId;
    }

    let { shopId } = useParams();
    const cartId = useSelector(state => state.cart.cartId);

    const urlApiGetShop = `http://localhost:8080/api/Shop/${shopId}`;
    const urlApiCreateCart = 'http://localhost:8080/api/Cart/create';
    const urlApiGetCart = `http://localhost:8080/api/Cart/${cartId}?getShop=false`;

    const showLoader = () => {
        setIsLoading(true);
    }

    const hideLoader = () => {
        setIsLoading(false);
    }

    const toggleAlert = (isShow, contentALert, isDanger) => {
        setIsShowALert(isShow);
        setContentALert(contentALert);
        if (isDanger == 1) {
            setClassALert('alert-danger');
        }
    }

    const createCart = useCallback(async () => {
        try {
            const response = await fetch(urlApiCreateCart, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    customerId: customerId,
                    shopId: shopId
                })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            fetchCartData(data.cartId);
            if (data.isSuccess) {
            } else {
                //alert(data.errorMessage)
            }
            dispatch(cartActions.createCart(data.cartId));
            //{"cartId":"88d702","isSuccess":false,"errorMessage":"You have a exit cart with this shop"}
        } catch (error) {
            console.log(error)
        }
    })

    const fetchCartData = useCallback(async (cartId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/Cart/${cartId}?getShop=false`, {
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            const data = await response.json();
            const items = data.itemsInCart;
            let totalQuantity = 0;
            items.forEach(item => {
                totalQuantity += item.amount;
            })
            dispatch(cartActions.setCartData({ items, totalQuantity }))
        } catch (error) {
            console.log(error)
        }
    })

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(urlApiGetShop,
                { method: 'GET' }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            dispatch(foodsActions.setItems({ items: data.items, total: data.items.length }));
            setTimeout(() => { hideLoader() }, 500);
        } catch (error) {
            setTimeout(() => { hideLoader() }, 500);
            console.log(error)
        }
    }, []);

    useEffect(() => {
        showLoader();
        createCart();
        fetchItems();
    }, []);

    const copyShopUrl = () => { }

    const items = useSelector(state => state.foods.items);
    const activeItems = items.filter(item => item.isActive);
    const listIems = activeItems.map((item) => {
        return <FoodItem item={item}
            key={item.itemId}
            customerId={customerId}
            showLoader={showLoader}
            hideLoader={hideLoader}
            toggleAlert={toggleAlert}
        />
    })


    return <Fragment>
        {isShowALert && <Notification classALert={classALert} contentALert={contentALert} />}

        {isLoading && <Loader />}
        <div className="foods-wraper row">
            {listIems}
        </div>
    </Fragment>
}

export default ShopHome;