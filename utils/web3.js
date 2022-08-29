import Web3 from 'web3';
import { Contract } from '@ethersproject/contracts';
import {
  GREYTokenContractAddress,
  GreyNFTContractAddress,
  ChainId,
  INFURA_URL,
} from 'config/settings';

const abi = require('config/abi/nft.json');

let web3;

const greyAbi = require('config/abi/grey.json');

if (typeof window !== 'undefined' && window?.ethereum !== undefined) {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3.providers.HttpProvider(INFURA_URL);
}

export const getNetworkType = async () => {
  const userNetwork = await web3.eth.net.getNetworkType();
  return userNetwork;
};

export const getBalance = async (address, crypto, library) => {
  if (crypto === 'ETH') {
    return await web3.eth.getBalance(address);
  }
  const erc20Contract =
    crypto === 'GREY' || crypto === 'Grey'
      ? new Contract(GREYTokenContractAddress, greyAbi, library.getSigner(address))
      : null;

  if (!erc20Contract) {
    return undefined;
  }

  const balance = (await erc20Contract.balanceOf(address)).toString();
  return balance;
};

export const getFormatedBalance = (balance, crypto) => {
  if (web3?.utils) {
    return (
      // web3.utils.fromWei(balance || '0', crypto === 'GREY' ? 'nano' : 'ether') * 1 // TODO:
      (
        web3.utils.fromWei(balance || '0', crypto === 'GREY' ? 'ether' : 'ether') * 1
      ).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      })
    );
  }
  return (balance / 1e18).toFixed(2);
};

export const getTotalCounts = async () => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  const counts = await erc1155Contract.methods.count().call();

  return counts;
};

export const getAssetBalance = async (address, tokenId) => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  const balance = await erc1155Contract.methods.balanceOf(address, tokenId).call();

  return balance;
};

export const checkMintRole = async address => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const isMinter = await erc1155Contract.methods.isMinter(address).call();
    return isMinter;
  } catch (error) {
    console.log('[checkMintRole] error ==>', error);
  }

  return false;
};

export const getOwnerAddress = async () => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const ownerAddress = await erc1155Contract.methods.owner().call();
    return ownerAddress;
  } catch (error) {
    console.log('[getOwnerAddress] error ==>', error);
  }

  return false;
};

export const mintNFT = async ({ address, amount, tokenURI }) => {
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const result = await erc1155Contract.methods
      .mintWithTokenURI(amount, tokenURI)
      .send({ from: address });
    return result;
  } catch (error) {
    console.log('[mintNFT] error ==>', error);
  }

  return false;
};

export const getNFTPrice = async tokenId => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const tokenPrice = await erc1155Contract.methods.tokenPricing(tokenId).call();
    return tokenPrice;
  } catch (error) {
    console.log('[getNFTPrice] error ==>', error);
  }

  return 0;
};

export const buyNFTFromVault = async ({ address, tokenId, quantity, fee }) => {
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const result = await erc1155Contract.methods
      .buyToken(tokenId, quantity)
      .send({ from: address, value: fee });
    return result;
  } catch (error) {
    console.log('[buyNFTFromVault] error ==>', error);
  }
};

export const whiteListEnabledNFT = async tokenId => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const isWhitelistedToken = await erc1155Contract.methods.whiteListEnabled(tokenId).call();
    return isWhitelistedToken;
  } catch (error) {
    console.log('[whiteListEnabled] error ==>', error);
  }
  return false;
};

export const whiteListedAddress = async (tokenId, address) => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const isWhitelistedAddress = await erc1155Contract.methods.whiteList(tokenId, address).call();
    return isWhitelistedAddress;
  } catch (error) {
    console.log('[whiteListedAddress] error ==>', error);
  }
  return false;
};

export const isVaultStocked = async (tokenId, amount) => {
  const web3 = new Web3(INFURA_URL);
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const vaultStocked = await erc1155Contract.methods.isVaultStocked(tokenId, amount).call();
    return vaultStocked;
  } catch (error) {
    console.log('[isVaultStocked] error ==>', error);
  }
  return false;
};

export const setWhiteList = async ({ addressList, tokenId, userWhitelistState, address }) => {
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const result = await erc1155Contract.methods
      .setWhiteList(addressList, tokenId, userWhitelistState)
      .send({ from: address });
    return result;
  } catch (error) {
    console.log('[setWhiteList] error ==>', error);
  }

  return false;
};

export const setWhiteListState = async ({ tokenIds, tokenWhitelistState, address }) => {
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const result = await erc1155Contract.methods
      .setWhiteListState(tokenIds, tokenWhitelistState)
      .send({ from: address });
    return result;
  } catch (error) {
    console.log('[setWhiteListState] error ==>', error);
  }

  return false;
};

// price in wei
export const setTokenPrice = async ({ tokenId, price, address }) => {
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const result = await erc1155Contract.methods
      .setTokenPrice(tokenId, price)
      .send({ from: address });
    return result;
  } catch (error) {
    console.log('[setTokenPrice] error ==>', error);
  }

  return false;
};

export const safeBatchTransferFrom = async ({ fromAddress, toAddress, ids, amounts, address }) => {
  const erc1155Contract = new web3.eth.Contract(abi, GreyNFTContractAddress);

  try {
    const result = await erc1155Contract.methods
      .safeBatchTransferFrom(fromAddress, toAddress, ids, amounts, '0x01')
      .send({ from: address });
    return result;
  } catch (error) {
    console.log('[safeBatchTransferFrom] error ==>', error);
  }

  return false;
};
