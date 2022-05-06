import BodItem from './BodItem'
import classes from './ListBod.module.css'
// const addresses = ["0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5"]
const ListBod = (props) => {
    return (
        <div className={classes.ListBod}>
            {props.addresses.map((address) => {
                return (
                    <BodItem address = {address} />
                )
            })}
        </div>
    )
}

export default ListBod