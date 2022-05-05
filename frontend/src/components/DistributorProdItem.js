import classes from './DistributorProdItem.module.css'

const DistributorProdItem = (props) => {
    const handleBuy = () => {

    }
    const handleSell = () => {

    }
    return (
        <div className= {classes.DistributorProdItem}>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productCode}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productNotes}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productionPrice}</div>
            <div style={{flex: "3", textAlign: 'center'}}>{props.product.imageHash}</div>
            {props.tabKey=="ListedItems"?<div style={{flex: "1", textAlign: 'center', cursor: 'pointer'}} onClick={handleBuy}>Buy</div>:null}
            {props.tabKey=="YourItems"?<div style={{flex: "1", textAlign: 'center', cursor: 'pointer'}} onClick={handleSell}>Sell</div>:null}
        </div>
    )
}

export default DistributorProdItem