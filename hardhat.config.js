require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const config = {
    solidity: '0.8.4',
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {},
    },
};

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (API_URL && PRIVATE_KEY) {
    config.networks.ropsten = {
        url: API_URL,
        accounts: [PRIVATE_KEY],
    };
}

module.exports = config;
