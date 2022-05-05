import DistributorProdList from "../components/DistributorProdList"
import {Tabs, Tab} from "react-bootstrap"
import {useState} from "react"
const productlist = [{productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 0}, {productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 0}, {productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 1}, {productCode: "12312", productNotes: "4kg tomato", productionPrice: 0.1, sellingPrice: 0.2, imageHash: "0x7B502C3A1F48C8609AE212CDFB639DEE39673F5E", status: 1}]
const DistributorPage = () => {
    const [tabKey, setTabKey] = useState('ListedItems');
    return (
        <>
        <div style = {{marginTop: "10vh"}}>
            <div style={{width: "40%", textAlign: "center", margin: "auto", fontSize: "40px"}}>Distributor Dashboard</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Your Address: 0x7CA42Bc582CC8F230E9ff0f928aC4bFeE27EeEa5</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Distributor Name: Sarthak</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Distributor Information: Good Distributor</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Location: Gwalior</div>
        </div>
        <Tabs
                id="controlled-tab-example"
                activeKey={tabKey}
                onSelect={(k) => setTabKey(k)}
                className="mb-3"
                style={{width: "60%", margin: 'auto'}}
            >
                <Tab eventKey="ListedItems" title="Listed Items">
                    <DistributorProdList productlist = {productlist} tabKey={tabKey}/>
                </Tab>
                <Tab eventKey="YourItems" title="Your Items">
                    <DistributorProdList productlist = {productlist} tabKey={tabKey}/>
                </Tab>
        </Tabs>
        </>
        
    )
}

export default DistributorPage     