import ListBod from "../components/ListBod"
import AddButton from "../components/AddButton"
import { Modal, Button, Form, Tabs, Tab} from "react-bootstrap"
import classes from './CeoPage.module.css'
import { useEffect, useState } from "react"
import {IoAddCircleSharp} from "react-icons/io5"
import Multisigwallet from '../artifacts/frontend/src/contracts/multisig/Multisigwallet.sol/Multisigwallet.json';
import {ethers} from 'ethers';

const CeoPage = () => {
    const [key, setKey] = useState('BOD');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newBod, setNewBod] = useState("")
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [funds, setFunds] = useState("")
    const [provider, setprovider] = useState(null);
    const [signer, setsigner] = useState(null);
    const [contract, setcontract] = useState(null);
    const [walletBalance, setwalletBalance] = useState(null);
    const changeBod = (event) => {
        setNewBod(event.target.value)
    }
    const changeFunds = (event) => {
        setFunds(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(newBod)
    }
    const handleSubmit1 = async (event) => {
        event.preventDefault()
        let tx = await signer.sendTransaction({
            to: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
            value: funds,
        });
    }
    // 10000000000000000000
    window.Multisigwallet=Multisigwallet;
    const contractAddress ="0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
    
    useEffect(() => {
        // console.log(Multisigwallet);
        async function init(){
            const provider =new ethers.providers.Web3Provider(window.ethereum);
            setprovider(provider);
            const signer =provider.getSigner();
            setsigner(signer);
            
            const contractInstance =new ethers.Contract(contractAddress,Multisigwallet.abi,signer);
            setcontract(contractInstance);

            try {
                const walletBalance = await contractInstance.getBalance();
                // console.log(ethers.utils.formatEther(walletBalance))
                setwalletBalance(ethers.utils.formatEther(walletBalance))
            } catch (err) {
                console.log("Error: ", err)
            }
        }
        init();
    },[])

    return <>
        <div style={{ marginTop: "10vh" }}>
            {/* <div style={{ width: "40%", textAlign: "center", margin: "auto", fontSize: "40px" }}>Board of Directors</div> */}
            <div style={{ width: "40%", textAlign: "center", margin: "auto", paddingBottom: "2vh" }}>Your Address: 0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5</div>
            <div style={{ width: "40%", textAlign: "center", margin: "auto", paddingBottom: "2vh" }}><span>Balance: {walletBalance} ETH</span> <span style={{cursor: 'pointer'}} onClick={handleShow1}><IoAddCircleSharp/></span></div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                style={{width: "40%", margin: 'auto'}}
            >
                <Tab eventKey="BOD" title="B.O.D">
                    <ListBod/>
                    <AddButton handleShow={handleShow} handleShow1={handleShow1} />
                </Tab>
                <Tab eventKey="Distributors" title="Distributors">
                    <ListBod/>
                </Tab>
                <Tab eventKey="Farmers" title="Farmers">
                    <ListBod/>
                    <AddButton handleShow={handleShow} handleShow1={handleShow1} />
                </Tab>
                <Tab eventKey="Customers" title="Customers">
                    <ListBod/>
                    <AddButton handleShow={handleShow} handleShow1={handleShow1} />
                </Tab>
            </Tabs>
            {/* <ListBod /> */}
            
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add {key}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} prevent>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={newBod}
                            onChange={changeBod}
                        />
                    </Form.Group>
                    <Button style={{ marginLeft: '40%' }} type="submit" className={classes.BootstrapButton}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
                <Modal.Title>Add Funds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit1} prevent>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter amount</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={funds}
                            onChange={changeFunds}
                        />
                    </Form.Group>
                    <Button style={{ marginLeft: '40%' }} type="submit" className={classes.BootstrapButton}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}

export default CeoPage