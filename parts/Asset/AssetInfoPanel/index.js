import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ContainedButton from 'components/Buttons/ContainedButton';
import RefreshIcon from 'components/Icons/RefreshIcon';

import MakeOfferDialog from 'parts/Dialogs/MakeOfferDialog';
import ListingDialog from 'parts/Dialogs/ListingDialog';
import PAGES from 'constants/links/pages';
import { isVaultStocked } from 'utils/web3';

const useStyles = makeStyles(theme => ({
  assetName: {
    color: theme.palette.text.secondary,
  },
  refreshIcon: {
    cursor: 'pointer',
  },
}));

export default function AssetInfoPanel({ asset, tokenId, assetBalance = 0, amount, callback }) {
  const classes = useStyles();
  const router = useRouter();

  const { name = '', description = '', price = 0 } = asset || {};
  const { account } = useWeb3React();
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [openListingDialog, setOpenListingDialog] = useState(false);
  const [isVaultAvailable, setVaultAvailable] = useState();

  const toggleListingHandler = open => () => {
    setOpenListingDialog(open);
  };

  const toggleOfferHandler = open => () => {
    setOpenOfferDialog(open);
  };

  const showOwnersHandler = async () => {
    router.push(`${router.asPath}/holders`);
  };

  const showDetailsHandler = async () => {
    router.push(`${router.asPath.replace('/holders', '')}`);
  };

  const isHoldersPage = router.asPath.includes('/holders');

  async function checkVaultStock() {
    const result = await isVaultStocked(tokenId, 1);
    setVaultAvailable(result);
  }

  useEffect(() => {
    if (tokenId !== undefined) {
      checkVaultStock();
    }

    return () => {
      setVaultAvailable();
    };
  }, [tokenId]);

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom className={classes.assetName}>
          #{tokenId} {name}
        </Typography>
        {callback && <RefreshIcon className={classes.refreshIcon} onClick={callback} />}
      </Box>
      {assetBalance + amount ? (
        <Typography variant='h5' gutterBottom>
          Balance: {assetBalance} / {amount}
        </Typography>
      ) : null}
      <Typography gutterBottom>{description}</Typography>
      {!isHoldersPage ? (
        <ContainedButton onClick={showOwnersHandler}>Show Owners</ContainedButton>
      ) : (
        <ContainedButton onClick={showDetailsHandler}>Show Details</ContainedButton>
      )}
      {account && amount > assetBalance && (
        <ContainedButton onClick={toggleOfferHandler(true)}>Make Offer</ContainedButton>
      )}
      {assetBalance > 0 && (
        <ContainedButton onClick={toggleListingHandler(true)}>Sell</ContainedButton>
      )}
      {isVaultAvailable && (
        <Link href={`${PAGES.VAULT.url}/${tokenId}`}>
          <a>
            <ContainedButton>Buy From Vault</ContainedButton>
          </a>
        </Link>
      )}
      {openOfferDialog && (
        <MakeOfferDialog
          tokenId={tokenId}
          account={account}
          title='Make an Offer'
          open={openOfferDialog}
          onClose={toggleOfferHandler(false)}
          callback={callback}
        />
      )}
      {openListingDialog && (
        <ListingDialog
          tokenId={tokenId}
          account={account}
          title='Listing'
          open={openListingDialog}
          onClose={toggleListingHandler(false)}
          callback={callback}
        />
      )}
    </>
  );
}
