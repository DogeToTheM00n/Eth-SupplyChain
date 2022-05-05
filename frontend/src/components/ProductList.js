import classes from './ProductList.module.css'
import ProductItem from './ProductItem'
const ProductList = (props) => {
    return (
        <div className={classes.ProductList}>
            {props.productlist.map((product) => {
                return (
                    <ProductItem product = {product}/>
                )
            })}
        </div>
    )
}

export default ProductList