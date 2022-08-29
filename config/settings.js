export const COUNTS_ON_PAGE = 24;

export const ChainId = parseInt(process.env.CHAIN_ID) || 4;

export const INFURA_API_KEY = process.env.INFURA_API_KEY;

const settings =
  ChainId === 4
    ? {
        GREYTokenContractAddress: '0xc778417e063141139fce010982780140aa0cd5ab', // WETH
        GreyNFTContractAddress: '0x9d2627235230966a970Edbbbf6330EAC86fbcFF2',
        GreyNFTCollection: 'grey-official-collection-v3',
        PaymentToken: '0xc778417e063141139fce010982780140aa0cd5ab',
        INFURA_URL: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
        OPENSEA_API: 'https://rinkeby-api.opensea.io/api/v1',
      }
    : {
        GREYTokenContractAddress: '0x9b2d81a1ae36e8e66a0875053429816f0b6b829e',
        GreyNFTContractAddress: '0x506628bd80a00dc4d72469553025caee97562533',
        GreyNFTCollection: 'grey-nft',
        PaymentToken: '0x9b2d81a1ae36e8e66a0875053429816f0b6b829e',
        INFURA_URL: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
        OPENSEA_API: 'https://api.opensea.io/api/v1',
      };

export const OPENSEA_API = settings['OPENSEA_API'];

export const GreyNFTContractAddress = settings['GreyNFTContractAddress'];

export const GREYTokenContractAddress = settings['GREYTokenContractAddress'];

export const GreyNFTCollection = settings['GreyNFTCollection'];

export const PaymentToken = settings['PaymentToken'];

export const INFURA_URL = settings['INFURA_URL'];

export const MORALIS_API = 'https://deep-index.moralis.io/api/v2';

export const MORALIS_X_API_KEY = process.env.MORALIS_X_API_KEY;

export const MORALIS_SERVER_URL =
  process.env.MORALIS_SERVER_URL || 'https://2o6qhltiy0fg.usemoralis.com:2053/server';

export const MORALIS_APP_ID =
  process.env.MORALIS_APP_ID || 'vfeWeibXWrIaxdToTR6vrc9pBF98Y4POl7F0YwxX';

export const PINATA_API = 'https://api.pinata.cloud/pinning';

export const PINATA_API_KEY = '0d868285f40a08565232'; // '76bec69362fa900fc1a9'; // TODO:

export const PINATA_SECRET_API_KEY =
  //   '492f468516f89023b74c37ac7e9fa08d69529ee924516cfa443f67c4beb0e65f';
  'a9038cbf8d8ea554af57ff482772036dad167ea9f174621a969fca52792fd944'; // TODO:

export const INVALID_ASSET_URL =
  'https://lh3.googleusercontent.com/mE16EI3MNo55SS0c-hztyH1CgiLTIJpQVFtCH1S1cwx1LzD9_qbMeuQwOYNFAjCWUNhC_lBs7IG0_KJRCchEdG2Kucgf9XeY2uNxr5I=w401';
