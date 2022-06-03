require('dotenv').config();
const API_URL = process.env.API_URL;
const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/nft_contract.sol/PaintNFT.json");

const contractAddress = "0x9467c03FCa2AB2Fc7C756D2D320EB8574C5ac6F0";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);


async function mintNFT(tokenURI) {
    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
    const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
    const tx = {
        from: METAMASK_PUBLIC_KEY, // our MetaMask public key
        to: contractAddress, // the smart contract address we want to interact with
        nonce: nonce, // nonce with the no of transactions from our account
        gas: 1000000, // fee estimate to complete the transaction
        data: nftContract.methods
        .mintItem(METAMASK_PUBLIC_KEY, tokenURI)
        .encodeABI(),
    } // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
    const signPromise = alchemyWeb3.eth.accounts.signTransaction(
        tx,
        METAMASK_PRIVATE_KEY
    );
    signPromise.then((signedTx) => {
        alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
            if (!err) {
            console.log(
                "The hash of our transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of our transaction!"
            );
            } else {
            console.log(
                "Something went wrong when submitting our transaction:",
                err
            );
            }
        }
        );
    })
    .catch((err) => {
        console.log(" Promise failed:", err);
    });
}

mintNFT("https://ipfs.io/ipfs/QmQRQk7v91hvao6fj6t58xVneUvzgxxD6jisPnjF7hT2Ag");