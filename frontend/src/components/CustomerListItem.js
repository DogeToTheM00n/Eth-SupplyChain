import classes from './CustomerListItem.module.css'

const CustomerListItem = (props) => {
    const handleBuy = () => {

    }
    const handleSell = () => {

    }
    return (
        <div className= {classes.CustomerListItem}>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productCode}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productNotes}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.price}</div>
            <div style={{flex: "3", textAlign: 'center'}}>{props.product.imageHash}</div>
            <div style={{flex: "1", textAlign: 'center', cursor: 'pointer'}} onClick={handleSell}>Buy</div>
        </div>
    )
}

export default CustomerListItem