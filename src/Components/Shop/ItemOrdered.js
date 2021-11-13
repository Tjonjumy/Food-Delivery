

const ItemOrdered = (props) => {
    const { itemName, amount, price } = props.item;
    return (
        <tr>
            <th scope="row">{itemName}</th>
            <td>{price}</td>
            <td>{amount}</td>
            <td>${(amount * price).toFixed(2)}</td>
        </tr>
    );
}

export default ItemOrdered;