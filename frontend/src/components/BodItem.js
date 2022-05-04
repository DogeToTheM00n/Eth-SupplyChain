import classes from './BodItem.module.css'

const BodItem = (props) => {
    return (
        <div className={classes.BodItem}>
            {props.address}
        </div>
    )
}

export default BodItem