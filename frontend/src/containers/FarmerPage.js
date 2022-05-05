import {BsPlusLg} from "react-icons/bs"
import ProductList from "../components/ProductList"
import AddCropButton from "../components/AddCropButton"
import {useState} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import classes from "./FarmerPage.module.css"
const productlist = [{productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 0}, {productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 0}, {productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 1}, {productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 1}]
// address, location, farmer name, information
const FarmerPage = () => {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleSubmit = (event) => {
        event.preventdefault()
        console.log(state)
    }
    const [state, setState] = useState({productCode: "", productNotes: "", price: "", imageHash: ""})
    const handleChange = (event) => {
        setState((prev) => {
            return {
                ...prev, [event.target.name]: event.target.value
            }
        })
    }
    return (
        <>
        <div style = {{marginTop: "10vh"}}>
            <div style={{width: "40%", textAlign: "center", margin: "auto", fontSize: "40px"}}>My Assets</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Your Address: 0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Farmer Name: Analkrit</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Farmer Information: Good Farmer</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Location: Haryana from Hisar</div>
            <ProductList productlist = {productlist}/>
            <AddCropButton handleShow={handleShow}/>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} prevent>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Product Code</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={state.productCode}
                            onChange={handleChange}
                            name = "productCode"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Product Notes</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={state.productNotes}
                            onChange={handleChange}
                            name = "productNotes"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter price</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={state.price}
                            onChange={handleChange}
                            name = "price"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Image Hash</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={state.imageHash}
                            onChange={handleChange}
                            name="imageHash"
                        />
                    </Form.Group>
                    <Button style={{ marginLeft: '40%' }} type="submit" className={classes.BootstrapButton}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default FarmerPage