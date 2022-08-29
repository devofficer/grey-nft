import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ContainedButton from 'components/Buttons/ContainedButton';
import RefreshIcon from 'components/Icons/RefreshIcon';

import BuyDialog from 'parts/Dialogs/BuyDialog';

import { whiteListEnabledNFT, whiteListedAddress } from 'utils/web3';

const useStyles = makeStyles(theme => ({
  assetName: {
    color: theme.palette.text.secondary,
  },
  refreshIcon: {
    cursor: 'pointer',
  },
  notification: {
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.background.notification,
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(1, 0),
  },
}));

export default function AssetBuyInfoPanel({ asset, tokenId, assetBalance = 0, amount, callback }) {
  const classes = useStyles();
  const router = useRouter();

  const { name = '', description = '' } = asset || {};
  const { account } = useWeb3React();
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [isTokenWhitelisted, setTokenWhitelisted] = useState();
  const [isWhitelistedAddress, setWhitelistedAddress] = useState();

  const toggleBuyHandler = open => () => {
    setOpenBuyDialog(open);
  };

  const showOwnersHandler = async () => {
    router.push(`/asset/${tokenId}/holders`);
  };

  const showDetailsHandler = async () => {
    router.push(`${router.asPath.replace('/holders', '')}`);
  };

  const isHoldersPage = router.asPath.includes('/holders');

  async function checkWhitelistedToken() {
    try {
      const result = await whiteListEnabledNFT(tokenId);
      setTokenWhitelisted(result);
    } catch (error) {
      console.log('[checkWhitelistedToken] error ==>', error);
    }
  }

  async function checkWhitelistedAddress() {
    try {
      const result = await whiteListedAddress(tokenId, account);
      setWhitelistedAddress(result);
    } catch (error) {
      console.log('[checkWhitelistedAddress] error ==>', error);
    }
  }

  useEffect(() => {
    if (tokenId !== undefined) {
      checkWhitelistedToken();
    }

    return () => {
      setTokenWhitelisted();
    };
  }, [tokenId]);

  useEffect(() => {
    if (account && tokenId !== undefined) {
      checkWhitelistedAddress();
    }

    return () => {
      setWhitelistedAddress();
    };
  }, [tokenId, account]);

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
      {account && isTokenWhitelisted !== undefined && (
        <Box my='12px'>
          <span className={classes.notification}>
            {isTokenWhitelisted
              ? 'This token is currently in whitelist sale'
              : 'This token is currently in public sale'}
          </span>
        </Box>
      )}
      {isWhitelistedAddress !== undefined && (
        <Box my='12px'>
          <span className={classes.notification}>
            {isWhitelistedAddress ? 'You are whitelisted' : 'You are not whitelisted'}
            <br />
          </span>
        </Box>
      )}
      {!isHoldersPage ? (
        <ContainedButton onClick={showOwnersHandler}>Show Owners</ContainedButton>
      ) : (
        <ContainedButton onClick={showDetailsHandler}>Show Details</ContainedButton>
      )}
      {account && assetBalance > 0 && (
        <ContainedButton
          onClick={toggleBuyHandler(true)}
          disabled={isTokenWhitelisted && !isWhitelistedAddress}>
          Buy
        </ContainedButton>
      )}
      {openBuyDialog && (
        <BuyDialog
          tokenId={tokenId}
          maxAmount={assetBalance}
          account={account}
          title='Buy from Vault'
          open={openBuyDialog}
          onClose={toggleBuyHandler(false)}
          callback={callback}
        />
      )}
    </>
  );
}
