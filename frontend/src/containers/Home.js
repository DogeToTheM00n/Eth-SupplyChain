import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import {ethers} from 'ethers';

const Home = () => {

    const [account, setaccount] = useState('0x0');
    useEffect( () => {
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
            <div>Welcome to Supply chain management with Ethereum</div>
            <div>{account}</div>
            <button>CEO (link this to /admin)</button><br></br>
            <button>BODs (link this to /wallet)</button><br></br>
            <button>Farmer </button><br></br>
            <button>Farmer </button><br></br>
        </>
    )
}

export default Home