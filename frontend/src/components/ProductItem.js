import classes from './ProductItem.module.css'

const ProductItem = (props) => {
    const confirmOnClick = () => {

    }
    const executeOnClick = () => {

    }
    return (
        <div className={classes.ProductItem}>
            <div>{props.product.productCode}</div>
            <div>{props.product.productNotes}</div>
            <div>{props.product.price}</div>
            <div>{props.product.imageHash}</div>
            {/* {(((props.transaction.approvalCount*100)/props.numberofBod)<=60)?
                <div className={classes.Mutton} style={{cursor: 'pointer'}} onClick={confirmOnClick}>Confirm</div>:
                <div className={classes.Mutton} style={{cursor: 'pointer'}} onClick={executeOnClick}>Execute</div>
                } */}
        </div>
    )
}

export default ProductItem