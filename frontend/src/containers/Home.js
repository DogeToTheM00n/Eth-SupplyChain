import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ethers} from 'ethers';
import classes from './Home.module.css'

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
            localStorage.setItem('address', await signer.getAddress())
            console.log("Account:", await signer.getAddress());
        }
        funUseEffect();
    }, []);

    return (
        <div>
        <div style = {{marginLeft: 'auto', marginRight: 'auto', marginTop: "10vh", width: "40%"}}>
            <div style={{textAlign: "center", margin: "auto", fontSize: "35px"}}>Welcome to Supply chain management with Ethereum</div>
            <div style={{textAlign: "center", margin: "auto", paddingBottom: "1vh"}}>Your Address: {account}</div>
            <div className={classes.optionList}>
                <div className={classes.optionItem}><Link to="/admin" style={{textDecoration: "none"}}>CEO Page</Link></div>
                <div className={classes.optionItem}><Link to="/wallet" style={{textDecoration: "none"}}>Board of Directors Page</Link></div>
                <div className={classes.optionItem}><Link to="/farmer" style={{textDecoration: "none"}}>Farmer Page</Link></div>
                <div className={classes.optionItem}><Link to="/customer" style={{textDecoration: "none"}}>Customer Page</Link></div>
                <div className={classes.optionItem}><Link to="/distributor" style={{textDecoration: "none"}}>Distributor Page</Link></div>
                <div className={classes.optionItem}><Link to="/retailer" style={{textDecoration: "none"}}>Retailer Page</Link></div>
            </div>
        </div>
        </div>
    )
}

export default Home