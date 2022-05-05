import classes from './DistributorProdList.module.css'
import DistributorProdItem from './DistributorProdItem'
const DistributorProdList = (props) => {
    return (
        <div className={classes.DistributorProdList}>
            {props.productlist.map((product) => {
                return (
                    <DistributorProdItem product = {product} tabKey={props.tabKey}/>
                )
            })}
        </div>
    )
}

export default DistributorProdList