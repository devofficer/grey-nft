import { useState, useEffect } from 'react';
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
