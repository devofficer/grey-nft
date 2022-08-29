import Grid from '@material-ui/core/Grid';
import GreyCard from 'components/UI/GreyCard';
import AssetImageView from './AssetImageView';
import AssetBuyInfoPanel from './AssetBuyInfoPanel';

export default function AssetBuyMainPanel({ asset, tokenId, assetBalance, amount, callback }) {
  return (
    <GreyCard>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AssetImageView asset={asset} tokenId={tokenId} />
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <AssetBuyInfoPanel
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
