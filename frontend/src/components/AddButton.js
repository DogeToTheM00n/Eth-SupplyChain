const AddButton = (props) => {
    return (
        <div style={{width: "40%", margin: "auto", textAlign:"center", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
           <span style={{cursor: 'pointer', fontSize: '30px'}} onClick={props.handleShow}>&#43;</span>
           {/* <span style={{cursor: 'pointer', fontSize: '20px'}} onClick={props.handleShow1}>Add funds</span> */}
        </div>
    )
}

export default AddButton