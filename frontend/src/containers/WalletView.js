import TransactionsList from "../components/TransactionsList"
import AddTransaction from "../components/AddTransaction"
import {useEffect, useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import classes from './WalletView.module.css'
const WalletView = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formValues, setFormValues] = useState({to: '', value: '', data: ''})
    const handleChange = (event) => {
        setFormValues((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formValues)
    }
    useEffect(() => {

    }, [])
    return <div style = {{marginTop: "10vh"}}>
            <div style={{width: "40%", textAlign: "center", margin: "auto", fontSize: "40px"}}>Wallet Transactions</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", padding: "2vh"}}>Your Address: 0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", padding: "2vh"}}>Balance: 18 ETH</div>
            <TransactionsList/>
            <AddTransaction handleShow={handleShow}/>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} prevent>
                    <Form.Group className="mb-3">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.to}
                        onChange={handleChange}
                        name='to'
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.value}
                        onChange={handleChange}
                        name='value'
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={formValues.data}
                        onChange={handleChange}
                        name='data'
                    />
                    </Form.Group>
                    <Button style={{marginLeft: '40%'}} type="submit" className={classes.BootstrapButton}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            </Modal>
        </div>
}

export default WalletView