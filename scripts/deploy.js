async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const TOR = await ethers.getContractFactory("PaintNFT");

    // Start deployment, returning a promise that resolves to a contract object
    const tor = await TOR.deploy("Nguyen Hoang NFT", "PaintNFT");
    await tor.deployed();
    console.log("Contract deployed to address:", tor.address);
    // https://drive.google.com/uc?export=view&id=1DjnsmD7_iNIYo18V5F7XCp1t_-lef4Nt
}

 main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
});