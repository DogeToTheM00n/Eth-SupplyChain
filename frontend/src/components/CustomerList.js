import CustomerListItem from "./CustomerListItem"
import classes from  "./CustomerList.module.css"
const CustomerList = (props) => {
    return (
        <div className={classes.CustomerList}>
            {props.productlist.map((product) => {
                return (
                    <CustomerListItem product = {product}/>
                )
            })}
        </div>
    )
}

export default CustomerList