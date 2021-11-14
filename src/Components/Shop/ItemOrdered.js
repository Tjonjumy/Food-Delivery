

const ItemOrdered = (props) => {
    const { itemName, amount, price } = props.item;
    return (
        <tr>
            <td scope="row">{itemName}</td>
            <td>{price}</td>
            <td>{amount}</td>
            <td>${(amount * price).toFixed(2)}</td>
        </tr>
    );
}

export default ItemOrdered;