import classes from './RetailerListItem.module.css'

const RetailerListItem = (props) => {
    const handleBuy = () => {

    }
    const handleSell = () => {

    }
    return (
        <div className= {classes.RetailerListItem}>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productCode}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productNotes}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.price}</div>
            <div style={{flex: "3", textAlign: 'center'}}>{props.product.imageHash}</div>
            <div style={{flex: "1", textAlign: 'center', cursor: 'pointer'}} onClick={handleSell}>Buy</div>
        </div>
    )
}

export default RetailerListItem