import CustomerList from "../components/CustomerList";
const productlist = [{productCode: "12312", productNotes: "4kg tomato", price: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 0}, {productCode: "12312", productNotes: "4kg tomato", price: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 0}, {productCode: "12312", productNotes: "4kg tomato", price: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 1}, {productCode: "12312", productNotes: "4kg tomato", price: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 1}]
const CustomerPage = () => {
    return (
        <>
            <div style = {{marginTop: "10vh"}}>
                <div style={{width: "40%", textAlign: "center", margin: "auto", fontSize: "40px"}}>Customer Dashboard</div>
                <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Your Address: 0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5</div>
                <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Customer Name: Sarthak</div>
            </div>
            <CustomerList productlist = {productlist}/>
        </>
    )
}

export default CustomerPage