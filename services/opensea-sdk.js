import * as Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';

import {
  INFURA_URL,
  GreyNFTContractAddress,
  GREYTokenContractAddress,
  ChainId,
  PaymentToken,
  COUNTS_ON_PAGE,
} from 'config/settings';

let provider;

if (typeof window !== 'undefined' && window?.ethereum !== undefined) {
  provider = new Web3(window.ethereum).currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(INFURA_URL);
}

const seaport = new OpenSeaPort(provider, {
  networkName: ChainId === 1 ? Network.Main : ChainId === 4 ? Network.Rinkeby : null,
});

export const getAssetBalance = async (address, tokenId) => {
  const asset = {
    tokenAddress: GreyNFTContractAddress,
    tokenId,
    schemaName: 'ERC1155',
  };

  const balance = await seaport.getAssetBalance({
    accountAddress: address,
    asset,
  });
  return balance.toNumber();
};

export const getGreyBalance = async address => {
  try {
    const balanceOfGrey = await seaport.getTokenBalance({
      accountAddress: address,
      tokenAddress: GREYTokenContractAddress,
    });

    return balanceOfGrey.toNumber();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAssetByTokenId = async tokenId => {
  try {
    const asset = await seaport.api.getAsset({
      tokenAddress: GreyNFTContractAddress,
      tokenId,
      schemaName: 'ERC1155',
    });

    return asset;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAssetsByAddress = async ({ address, page = 0 }) => {
  try {
    // getAssets(query?: OpenSeaAssetQuery, page?: number): Promise<{
    const asset = await seaport.api.getAssets(
      {
        owner: address,
        asset_contract_address: GreyNFTContractAddress,
        // order_by?: string;
        // order_direction?: string;
        limit: COUNTS_ON_PAGE,
        offset: COUNTS_ON_PAGE * page,
      },
      6,
    );

    return asset;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPaymentTokens = async () => {
  const tokens = (await seaport.api.getPaymentTokens()).tokens;
  return tokens;
};

export const createSellOrder = async ({
  account = '',
  tokenId = -1,
  startAmount = 0,
  endAmount = 0,
  expirationTime = undefined,
  paymentWithGrey = true,
}) => {
  const defaultExpirationTime = Math.round(Date.now() / 1000 + 60 * 60);

  const listing = await seaport.createSellOrder({
    asset: {
      tokenId,
      tokenAddress: GreyNFTContractAddress,
      schemaName: 'ERC1155',
    },
    accountAddress: account,
    startAmount: startAmount,
    // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
    endAmount: endAmount,
    // expirationTime: expirationTime || defaultExpirationTime,
    paymentTokenAddress: paymentWithGrey ? PaymentToken : undefined,
  });

  return listing;
};

export const createBuyOrder = async ({
  account = '',
  tokenId = -1,
  startAmount = 0,
  expirationTime = undefined,
  paymentWithGrey = true,
}) => {
  const defaultExpirationTime = Math.round(Date.now() / 1000 + 60 * 60);

  const offer = await seaport.createBuyOrder({
    asset: {
      tokenId,
      tokenAddress: GreyNFTContractAddress,
      schemaName: 'ERC1155',
    },
    accountAddress: account,
    // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
    startAmount: startAmount,
    expirationTime: expirationTime || defaultExpirationTime,
    paymentTokenAddress: paymentWithGrey ? PaymentToken : undefined,
  });

  return offer;
};

export const cancelOrder = async ({ account = '', order }) => {
  const result = await seaport.cancelOrder({
    order,
    accountAddress: account,
  });

  return result;
};

export const fulfillOrder = async ({ account = '', order }) => {
  const result = await seaport.fulfillOrder({
    order,
    accountAddress: account,
    referrerAddress: '0x8F7A7Be5b174EdeF469791be81C47A1dA7C795e5', // TODO:
  });

  return result;
};

export const getOrders = async ({ tokenId, page = 0, side = OrderSide.Buy }) => {
  const { orders, count } = await seaport.api.getOrders(
    {
      asset_contract_address: GreyNFTContractAddress,
      token_id: tokenId,
      side,
    },
    page,
  );

  return {
    orders,
    count,
  };
};
