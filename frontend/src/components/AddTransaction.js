const AddTransaction = (props) => {
    return (
        <div style={{width: "40%", margin: "auto", textAlign:"center", fontSize: "40px"}}>
            <span style={{cursor:'pointer'}} onClick={props.handleShow}>&#43;</span>
        </div>
    )
}

export default AddTransaction