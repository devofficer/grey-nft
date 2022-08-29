import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import AssetMainPanel from 'parts/Asset/AssetMainPanel';
import AssetHoldersList from 'parts/Asset/AssetHoldersList';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import Paginator from 'components/UI/Paginator';
import { getOwners } from 'services/moralis';
import { getAssetByTokenId } from 'services/opensea-sdk';
import { getNFTInfo } from 'services/moralis';
import { getAssetBalance } from 'utils/web3';
import { COUNTS_ON_PAGE } from 'config/settings';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));

export default function HoldersPage({}) {
  const classes = useStyles();
  const router = useRouter();
  const tokenId = router.query.handle;
  const { account } = useWeb3React();

  const [isLoading, setIsLoading] = useState();
  const [isAssetLoading, setIsAssetLoading] = useState();
  const [assetData, setAssetData] = useState();
  const [assetBalance, setAssetBalance] = useState(0);
  const [holders, setHolders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

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

  const fetchOwners = async () => {
    try {
      setIsLoading(true);
      const result = await getOwners({ tokenId, page: page - 1 });
      setTotal(result.total);
      setHolders(result.result);
    } catch (err) {
      console.log('[fetchOwners] err ==>', err);
    }
    setIsLoading(false);
  };

  async function fetchAssetData() {
    try {
      setIsAssetLoading(true);

      const assetFromOpenSea = await getAssetByTokenId(tokenId);
      setAssetData(assetFromOpenSea);
    } catch (error) {
      throw new Error(error);
    }
    setIsAssetLoading(false);
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
      fetchAssetData();
      fetchAssetAmount();
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

  useEffect(() => {
    if (tokenId) {
      fetchOwners();
    }
  }, [tokenId, page]);

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
        <title>Holders of Asset {tokenId} | Grey Marketplace</title>
        <meta name='keywords' content='asset holders grey token nft marketplace ethereum opensea' />
        <meta name='description' content='Asset holder detail page of Grey Marketplace' />
      </Head>
      <AssetMainPanel
        tokenId={tokenId}
        asset={assetData}
        amount={amount}
        assetBalance={assetBalance}
      />
      <AssetHoldersList title='Holders' holders={holders} />
      <Box display='flex' justifyContent='center' m={2}>
        <Paginator
          totalPages={Math.ceil(total / COUNTS_ON_PAGE) || 1}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </Box>
    </div>
  );
}
