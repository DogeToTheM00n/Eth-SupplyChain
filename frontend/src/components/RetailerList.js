import classes from './RetailerList.module.css'
import RetailerListItem from './RetailerListItem'
const RetailerList = (props) => {
    return (
        <div className={classes.RetailerList}>
            {props.productlist.map((product) => {
                return (
                    <RetailerListItem product = {product}/>
                )
            })}
        </div>
    )
}

export default RetailerList