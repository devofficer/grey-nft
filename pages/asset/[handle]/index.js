import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import AssetMainPanel from 'parts/Asset/AssetMainPanel';
import AssetMetaPanel from 'parts/Asset/AssetMetaPanel';
import AssetOrderList from 'parts/Asset/AssetOrderListFromSdk';
import AssetEventListFromApi from 'parts/Asset/AssetEventListFromApi';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import { getAssetByTokenId } from 'services/opensea-sdk';
import { getAssetBalance } from 'utils/web3';
import { getNFTInfo } from 'services/moralis';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));

export default function AssetPage({}) {
  const classes = useStyles();
  const router = useRouter();
  const tokenId = router.query.handle;

  const { account } = useWeb3React();

  const [assetData, setAssetData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [assetBalance, setAssetBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  async function fetchAssetAmount() {
    try {
      const assetInfoFromMoralis = await getNFTInfo(tokenId);
      setAmount(parseInt(assetInfoFromMoralis.amount));
    } catch (error) {
      console.log('[fetchAssetAmount] error ==>', error);
      // throw new Error(error);
    }
  }

  async function fetchAssetData() {
    try {
      setIsLoading(true);
      const assetFromOpenSea = await getAssetByTokenId(tokenId);
      setAssetData(assetFromOpenSea);
    } catch (error) {
      console.log('[fetchAssetData] error ==>', error);
      // throw new Error(error);
    }
    setIsLoading(false);
  }

  async function fetchAssetBalance() {
    console.log('fetchAssetBalance called');
    try {
      const balance = await getAssetBalance(account, tokenId);
      setAssetBalance(balance);
    } catch (error) {
      console.log('[fetchAssetBalance] ==>', error);
    }
  }

  const initialize = () => {
    if (tokenId) {
      fetchAssetAmount();
      fetchAssetData();
    }
  };

  useEffect(() => {
    initialize();
  }, [tokenId]);

  useEffect(() => {
    if (tokenId && account) {
      fetchAssetBalance();
    }
  }, [tokenId, account]);

  if (isLoading) {
    return (
      <Box textAlign='center'>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>Asset Detail | {assetData?.name} | Grey Marketplace</title>
        <meta name='keywords' content='asset detail grey token nft marketplace ethereum opensea' />
        <meta
          name='description'
          content={`Asset detail page of Grey Marketplace | ${assetData?.description}`}
        />
      </Head>
      <AssetMainPanel
        tokenId={tokenId}
        asset={assetData}
        assetBalance={assetBalance}
        amount={amount}
        callback={initialize}
      />
      <AssetMetaPanel tokenId={tokenId} asset={assetData} assetBalance={assetBalance} />
      {assetData?.sellOrders?.length > 0 && (
        <AssetOrderList
          account={account}
          title='Listings'
          orders={assetData.sellOrders}
          callback={initialize}
        />
      )}
      {assetData?.buyOrders?.length > 0 && (
        <AssetOrderList
          account={account}
          title='Offers'
          orders={assetData.buyOrders}
          callback={initialize}
        />
      )}
      <AssetEventListFromApi tokenId={tokenId} account={account} />
    </div>
  );
}
