import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GreyCard from 'components/UI/GreyCard';
import PAGES from 'constants/links/pages';
import { INVALID_ASSET_URL } from 'config/settings';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translate(0, -2px)',
      filter: 'contrast(90%)',
    },
  },
  assetName: {
    marginTop: 'auto',
  },
  imageView: {
    width: '100%',
    objectFit: 'contain',
  },
}));

export default function AssetCard({ asset, href }) {
  const tokenId = asset.token_id;
  const classes = useStyles();

  const isVideo = asset?.image_url.toLowerCase().includes('.mp4');

  return (
    <GreyCard className={classes.card}>
      <Link href={href || `${PAGES.ASSET.url}/${tokenId}`}>
        <a>
          {isVideo ? (
            <video
              width='100%'
              // height='100%'
              autoPlay
              loop
              muted
              playsInline>
              <source
                src={
                  asset.image_preview_url ||
                  asset.image_original_url ||
                  asset.animation_original_url
                }
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              className={classes.imageView}
              src={
                asset.image_preview_url ||
                asset.image_original_url ||
                asset.animation_original_url ||
                asset?.collection?.featured_image_url ||
                INVALID_ASSET_URL
              }
              title='asset'
            />
          )}
        </a>
      </Link>
      <Typography gutterBottom color='textSecondary' className={classes.assetName}>
        #{asset.token_id} {asset.name}
      </Typography>
      <Typography>{asset.description}</Typography>
    </GreyCard>
  );
}
