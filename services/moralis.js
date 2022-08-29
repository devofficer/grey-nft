import axios from 'axios';
import {
  ChainId,
  MORALIS_X_API_KEY,
  COUNTS_ON_PAGE,
  MORALIS_API,
  GreyNFTContractAddress,
} from 'config/settings';

export const getOwners = async ({ tokenId, page = 0 }) => {
  const result = await axios.get(
    `${MORALIS_API}/nft/${GreyNFTContractAddress.toLocaleLowerCase()}/${tokenId}/owners?chain=${
      ChainId === 1 ? 'eth' : 'rinkeby'
    }&format=decimal&order=block_number.DESC&offset=${
      page * COUNTS_ON_PAGE
    }&limit=${COUNTS_ON_PAGE}`,
    {
      headers: {
        'X-API-Key': MORALIS_X_API_KEY,
      },
    },
  );
  return result.data;
};

export const getNFTInfo = async tokenId => {
  const result = await axios.get(
    `${MORALIS_API}/nft/${GreyNFTContractAddress.toLocaleLowerCase()}/${tokenId}?chain=${
      ChainId === 1 ? 'eth' : 'rinkeby'
    }&format=decimal`,
    {
      headers: {
        'X-API-Key': MORALIS_X_API_KEY,
      },
    },
  );
  return result.data;
};
