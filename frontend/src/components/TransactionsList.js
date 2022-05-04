import classes from './TransactionsList.module.css'
import TransactionItem from './TransactionItem'
const transactions = [{data: "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", approvalCount: 1}, {data: "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", approvalCount: 2}, {data: "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", approvalCount: 2}, {data: "0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5", approvalCount: 3}]
const TransactionsList = () => {
    return (
        <div className={classes.TransactionsList}>
            {transactions.map((transaction) => {
                return (
                    <TransactionItem transaction = {transaction} numberofBod={4}/>
                )
            })}
        </div>
    )
}

export default TransactionsList