import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ethers} from 'ethers';

const PREFIX ='SUPPLY_CHAIN_MANAGEMENT';

const Home = () => {

    const [account, setaccount] = useState("0x0");

    useEffect(() => {
        const funUseEffect= async ()=>{
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // Prompt user for account connections
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setaccount(await signer.getAddress());
            console.log("Account:", await signer.getAddress());
        }
        funUseEffect();
    }, []);

    return (
        <>
        <div style = {{marginTop: "10vh"}}>
            <div style={{width: "40%", textAlign: "center", margin: "auto", fontSize: "35px"}}>Welcome to Supply chain management with Ethereum</div>
            <div style={{width: "40%", textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Your Address: {account}</div>
            <div style={{width: "40%", margin: "auto", display: "flex", height: "50vh", justifyContent: "stretch", flexDirection: "column", marginTop: "2vh", alignItems: "center"}}>
                <Link to="/admin"><div>CEO Page</div></Link>
                <Link to="/wallet"><div>Board of Directors Page</div></Link>
                <Link to="/farmer"><div>Farmer Page</div></Link>
                <Link to="/customer"><div>Customer Page</div></Link>
            </div>
        </div>
        </>
    )
}

export default Home