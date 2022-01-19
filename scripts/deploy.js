const { ethers } = require('hardhat');

// Deployment
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const Useless = await ethers.getContractFactory('UselessToken');
    const useless = await Useless.deploy();

    console.log('UselessToken deployed to:', useless.address);
    console.log(
        'Account balance after deployment:',
        (await deployer.getBalance()).toString()
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
