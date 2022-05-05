import classes from './ProductItem.module.css'

const ProductItem = (props) => {
    const confirmOnClick = () => {

    }
    const executeOnClick = () => {

    }
    return (
        <div className= {props.product.status===0?classes.ProductItemPending:classes.ProductItem}>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productCode}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productNotes}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.productionPrice}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.sellingPrice}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.imageHash}</div>
            <div style={{flex: "1", textAlign: 'center'}}>{props.product.status?"Listed":"Purchased"}</div>
            {/* {(((props.transaction.approvalCount*100)/props.numberofBod)<=60)?
                <div className={classes.Mutton} style={{cursor: 'pointer'}} onClick={confirmOnClick}>Confirm</div>:
                <div className={classes.Mutton} style={{cursor: 'pointer'}} onClick={executeOnClick}>Execute</div>
                } */}
        </div>
    )
}

export default ProductItem