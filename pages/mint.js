import Head from 'next/head';
import { useContext } from 'react';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import MintForm from 'parts/Mint/MintForm';
import Box from '@material-ui/core/Box';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import { AppContext } from 'contexts';

export default function Mint({}) {
  const { isMinter } = useContext(AppContext);

  const { chainId, account } = useWeb3React();

  const headJsx = (
    <Head>
      <title>Mint | Grey Marketplace</title>
      <meta name='keywords' content='Grey token mint nft marketplace ethereum opensea' />
      <meta name='description' content='Mint page of Grey Marketplace' />
    </Head>
  );

  if (!account) {
    return (
      <Box id='wallet-not-connected' display='flex' justifyContent='center' mt='80px'>
        {headJsx}
        <Image
          src='/img/wallet-not-connected.png'
          width={200}
          height={200}
          layout='fixed'
          alt='restricted'
        />
      </Box>
    );
  } else if (isMinter === undefined) {
    return (
      <Box display='flex' justifyContent='center' mt='80px'>
        {headJsx}
        <LoadingSpinner />
      </Box>
    );
  } else if (!account || isMinter === false) {
    return (
      <Box id='restricted' display='flex' justifyContent='center' mt='80px'>
        {headJsx}
        <Image
          src='/img/restricted-access.png'
          width={200}
          height={200}
          layout='fixed'
          alt='restricted'
        />
      </Box>
    );
  }

  return (
    <div>
      {headJsx}
      <MintForm signerAddress={account} chainId={chainId} />
    </div>
  );
}
