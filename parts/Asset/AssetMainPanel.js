import Grid from '@material-ui/core/Grid';
import GreyCard from 'components/UI/GreyCard';
import AssetImageView from './AssetImageView';
import AssetInfoPanel from './AssetInfoPanel';

export default function AssetMainPanel({ asset, tokenId, assetBalance, amount, callback }) {
  return (
    <GreyCard>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AssetImageView asset={asset} tokenId={tokenId} />
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <AssetInfoPanel
            asset={asset}
            tokenId={tokenId}
            assetBalance={assetBalance}
            amount={amount}
            callback={callback}
          />
        </Grid>
      </Grid>
    </GreyCard>
  );
}
