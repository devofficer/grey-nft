import Head from 'next/head';
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getNFTAssets } from 'services/opensea';
import { getTotalCounts } from 'utils/web3';
import { COUNTS_ON_PAGE } from 'config/settings';
import AssetCard from 'components/AssetCard';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import Paginator from 'components/UI/Paginator';

export default function Marketplace({}) {
  const [assetList, setAssetList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [page, setPage] = useState(1);
  const [totalCounts, setTotalCounts] = useState(1);

  const fetchNFTAssets = async () => {
    try {
      setIsLoading(true);
      const assets = await getNFTAssets(page - 1);
      setAssetList(assets);
    } catch (err) {
      console.log('[fetchNFTAssets] err ==>', err);
    }
    setIsLoading(false);
  };

  const fetchTotalNFTCounts = async () => {
    try {
      const counts = await getTotalCounts();
      setTotalCounts(counts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNFTAssets();
  }, [page]);

  useEffect(() => {
    fetchTotalNFTCounts();
  }, []);

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center'>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <div>
      <Head>
        <title>Marketplace | Grey Marketplace</title>
        <meta name='keywords' content='Grey token home nft marketplace ethereum opensea' />
        <meta name='description' content='Home page of Grey Marketplace' />
      </Head>
      <Typography variant='h5' gutterBottom>
        Marketplace
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
      <Box display='flex' justifyContent='center' m={2}>
        <Paginator
          totalPages={Math.ceil(totalCounts / COUNTS_ON_PAGE) || 1}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </Box>
    </div>
  );
}
