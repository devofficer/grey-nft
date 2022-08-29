import Head from 'next/head';
import { useState, useContext } from 'react';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import { AppContext } from 'contexts';
import { useWeb3React } from '@web3-react/core';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import ContainedButton from 'components/Buttons/ContainedButton';
import SetWhiteListDialog from 'parts/Dialogs/SetWhiteListDialog';
import SetWhiteListStateDialog from 'parts/Dialogs/SetWhiteListStateDialog';
import SetTokenPriceDialog from 'parts/Dialogs/SetTokenPriceDialog';
import SetBatchTransferDialog from 'parts/Dialogs/BatchTransferDialog';

export default function Marketplace({}) {
  const { isOwner } = useContext(AppContext);
  const { account } = useWeb3React();

  const [isOpenWhitelistDialog, setOpenWhitelistDialog] = useState();
  const [isOpenWhitelistStateDialog, setOpenWhitelistStateDialog] = useState();
  const [isOpenTokenPriceDialog, setOpenTokenPriceDialog] = useState();
  const [isOpenBatchTransferDialog, setOpenBatchTransferDialog] = useState();

  const headJsx = (
    <Head>
      <title>Admin | Grey Marketplace</title>
      <meta name='keywords' content='Grey token admin nft marketplace ethereum opensea' />
      <meta name='description' content='Admin page of Grey Marketplace' />
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
  } else if (isOwner === undefined) {
    return (
      <Box display='flex' justifyContent='center' mt='80px'>
        {headJsx}
        <LoadingSpinner />
      </Box>
    );
  } else if (!account || isOwner === false) {
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
    <Box display='flex' justifyContent='center' flexWrap='wrap'>
      <ContainedButton onClick={() => setOpenWhitelistDialog(true)}>Set Whitelist</ContainedButton>
      <ContainedButton onClick={() => setOpenWhitelistStateDialog(true)}>
        Set Whitelist State
      </ContainedButton>
      <ContainedButton onClick={() => setOpenTokenPriceDialog(true)}>
        Set Token Price
      </ContainedButton>
      <ContainedButton onClick={() => setOpenBatchTransferDialog(true)}>
        Batch Transfer
      </ContainedButton>
      {isOpenWhitelistDialog && (
        <SetWhiteListDialog
          open={isOpenWhitelistDialog}
          onClose={() => setOpenWhitelistDialog(false)}
          title='Set WhiteList'
          account={account}
          callback={null}
        />
      )}
      {isOpenWhitelistStateDialog && (
        <SetWhiteListStateDialog
          open={isOpenWhitelistStateDialog}
          onClose={() => setOpenWhitelistStateDialog(false)}
          title='Set WhiteList State'
          account={account}
          callback={null}
        />
      )}
      {isOpenTokenPriceDialog && (
        <SetTokenPriceDialog
          open={isOpenTokenPriceDialog}
          onClose={() => setOpenTokenPriceDialog(false)}
          title='Set Token Price'
          account={account}
          callback={null}
        />
      )}
      {isOpenBatchTransferDialog && (
        <SetBatchTransferDialog
          open={isOpenBatchTransferDialog}
          onClose={() => setOpenBatchTransferDialog(false)}
          title='Batch Transfer'
          account={account}
          callback={null}
        />
      )}
    </Box>
  );
}
