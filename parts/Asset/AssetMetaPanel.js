import Grid from '@material-ui/core/Grid';
import GreyCard from 'components/UI/GreyCard';
import Typography from '@material-ui/core/Typography';

export default function AssetMetaPanel({ asset, tokenId }) {
  return (
    <GreyCard>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography>Token Id: {tokenId}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography>Sales Count: {asset?.numSales}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography>
            Last Sale:{' '}
            {(asset?.lastSale?.totalPrice ?? 0) /
              Math.pow(10, asset?.lastSale?.paymentToken?.decimals || 18)}{' '}
            {asset?.lastSale?.paymentToken?.symbol || ''}
          </Typography>
        </Grid>
      </Grid>
    </GreyCard>
  );
}
