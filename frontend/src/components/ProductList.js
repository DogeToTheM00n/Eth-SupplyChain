import classes from './ProductList.module.css'
import ProductItem from './ProductItem'
const mycrops = [{productCode: "12312", productNotes: "4kg tomato", price: 0.1, imageHash: "32390ru41"}]
const ProductList = () => {
    return (
        <div className={classes.ProductList}>
            {mycrops.map((product) => {
                return (
                    <ProductItem product = {product}/>
                )
            })}
        </div>
    )
}

export default ProductList