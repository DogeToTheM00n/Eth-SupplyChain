import classes from './TransactionItem.module.css'

const TransactionItem = (props) => {
    const confirmOnClick = () => {

    }
    const executeOnClick = () => {

    }
    return (
        <div className={classes.TransactionItem}>
            <div>{props.transaction.data}</div>
            <div>{props.transaction.approvalCount}</div>
            {(((props.transaction.approvalCount*100)/props.numberofBod)<=60)?
                <div className={classes.Mutton} style={{cursor: 'pointer'}} onClick={confirmOnClick}>Confirm</div>:
                <div className={classes.Mutton} style={{cursor: 'pointer'}} onClick={executeOnClick}>Execute</div>
                }
        </div>
    )
}

export default TransactionItem