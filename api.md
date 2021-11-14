# login:
urlApi = role == 'shop' ? 'http://localhost:8080/api/Shop/login' : 'http://localhost:8080/api/Customer/login'
fetch(urlApi, {
            method: 'POST', 
            body: JSON.stringify({phoneNumber: phoneNumber}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })

# sign up
const formData = new FormData();
        formData.append('Name', shopName);
        formData.append('PhoneNumber', phoneNumber);
        if (role == 'shop') {
            formData.append('Logo', imgInp);
        } else {
            formData.append('Avatar', imgInp);
        }
const urlApi = role == 'shop' ? 'http://localhost:8080/api/Shop/register' : 'http://localhost:8080/api/Customer/register';
        fetch(urlApi, {
            method: 'POST', 
            body: formData,
        })
# get shop
const urlFetchShop = `http://localhost:8080/api/Shop/${shopId}`;

    const fetchShop = useCallback(async () => {
        try {
            const response = await fetch(urlFetchShop,
                {
                    method: 'GET',
                }
            );
# create new Item
const formData = new FormData();
        formData.append('ShopId', shopId);
        formData.append('Name', nameItemRef.current.value.trim());
        formData.append('Price', priceRef.current.value);
        formData.append('Image', imgInp);
        fetch('http://localhost:8080/api/Item/create', {
            method: 'POST', 
            body: formData,
        })
# disable item
const url = 'http://localhost:8080/api/Item';
fetch(url,
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
            )


# create cart 
const urlApiCreateCart = 'http://localhost:8080/api/Cart/create';
 fetch(urlApiCreateCart, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    customerId: customerId,
                    shopId: shopId
                })
            })
# Get cart
const urlApiGetCart = `http://localhost:8080/api/Cart/${cartId}?getShop=false`;
fetch(urlApiGetCart, {
                method: 'GET',
            })

# add/remove Item to cart
const urlApiAddItem = 'http://localhost:8080/api/Cart/add/item';
fetch(urlApiAddItem, {
                method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        customerId: customerId,
                        cartId: cartId,
                        itemId: itemId
                    })
            })

const urlApiRemoveItem = 'http://localhost:8080/api/Cart/remove/item';
fetch(urlApiRemoveItem, {
                method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        customerId: customerId,
                        cartId: cartId,
                        itemId: itemId
                    })
            })