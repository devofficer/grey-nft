import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ContainedButton from 'components/Buttons/ContainedButton';
import { getAssetsByAddress } from 'services/opensea';
import AssetCard from 'components/AssetCard';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import { COUNTS_ON_PAGE } from 'config/settings';

export default function Account({}) {
  const router = useRouter();
  const { account } = useWeb3React();
  const address = router.query.handle || account;

  const [page, setPage] = useState(1);
  const [assetList, setAssetList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isLast, setIsLast] = useState(false);

  const fetchNFTAssets = async () => {
    try {
      setIsLoading(true);
      const assets = await getAssetsByAddress(address, page - 1);
      setAssetList([...assetList, ...assets]);
      if (assets?.length === 0 || assets?.length < COUNTS_ON_PAGE) {
        setIsLast(true);
      }
    } catch (err) {
      console.log('[fetchNFTAssets] err ==>', err);
    }
    setIsLoading(false);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (address) {
      fetchNFTAssets();
    }
  }, [address, page]);

  return (
    <div>
      <Head>
        <title>Account Detail | Grey Marketplace</title>
        <meta name='keywords' content='Grey token vault nft marketplace ethereum opensea' />
        <meta name='description' content='Account detail page of Grey Marketplace' />
      </Head>
      <Typography variant='h5' gutterBottom>
        Account Page
      </Typography>
      {assetList.length ? (
        <Grid container spacing={3}>
          {assetList.map(asset => (
            <Grid item key={asset.id} xs={12} sm={6} md={4} lg={3}>
              <AssetCard asset={asset} />
            </Grid>
          ))}
        </Grid>
      ) : null}
      {isLoading && (
        <Box display='flex' justifyContent='center'>
          <LoadingSpinner />
        </Box>
      )}
      {!isLast && (
        <Box display='flex' justifyContent='center' m={2}>
          <ContainedButton onClick={loadMoreHandler}>Load More</ContainedButton>
        </Box>
      )}
    </div>
  );
}
