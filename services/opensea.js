import axios from 'axios';
import {
  OPENSEA_API,
  COUNTS_ON_PAGE,
  GreyNFTContractAddress,
  GreyNFTCollection,
} from 'config/settings';

// TODO: update with pagination later
export const getAssetsByAddress = async (address, page = 0) => {
  const result = await axios.get(
    `${OPENSEA_API}/assets?owner=${address}&collection=${GreyNFTCollection}&offset=${
      page * COUNTS_ON_PAGE
    }&limit=${COUNTS_ON_PAGE}`,
  );
  return result.data.assets;
};

export const getNFTAssets = async (page = 0) => {
  const result = await axios.get(
    `${OPENSEA_API}/assets?offset=${
      page * COUNTS_ON_PAGE
    }&limit=${COUNTS_ON_PAGE}&collection=${GreyNFTCollection}`,
  );
  return result.data.assets;
};

export const getSingleAsset = async tokenId => {
  const result = await axios.get(`${OPENSEA_API}/asset/${GreyNFTContractAddress}/${tokenId}`);
  return result.data;
};

export const getAssetEvents = async ({ tokenId, page = 0 }) => {
  const result = await axios.get(
    `${OPENSEA_API}/events?asset_contract_address=${GreyNFTContractAddress.toLocaleLowerCase()}&collection_slug=greynft1155-v1&token_id=${tokenId}&offset=${
      COUNTS_ON_PAGE * page
    }&limit=${COUNTS_ON_PAGE}`,
  );
  return result.data;
};
