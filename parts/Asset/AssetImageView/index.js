import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AssetView from './AssetView';
import MenuCloseIcon from 'components/Icons/MenuCloseIcon';
import Box from '@material-ui/core/Box';
import { isEmpty } from 'utils/utility';
import { INVALID_ASSET_URL } from 'config/settings';

const useStyles = makeStyles(theme => ({
  imageView: {
    cursor: 'pointer',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    '&:hover': {
      filter: 'contrast(120%)',
    },
  },
  largeView: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    height: 'auto',
    objectFit: 'contain',
    maxWidth: 1000,
  },
  labelLine: {
    fontSize: '0.8rem',
    '& a': {
      textDecoration: 'underline',
    },
    '& p': {
      fontSize: '0.8rem',
    },
  },
  overlay: {
    cursor: 'pointer',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    opacity: 1,
    inset: 0,
    transition: 'opacity 0.3s ease-in-out 0s',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
}));

function AssetImageView({ tokenId, asset }) {
  const classes = useStyles();
  const [isOpenLargeView, setOpenLargeView] = useState(false);

  const showLargeViewHandler = value => () => {
    setOpenLargeView(value);
  };

  const isAnimation = asset?.imageUrl?.toLowerCase().includes('.mp4');
  const isInvalid = isEmpty(asset);

  return (
    <>
      {isInvalid ? null : (
        <AssetView
          tokenId={tokenId}
          src={asset?.imageUrl || asset?.imagePreviewUrl || INVALID_ASSET_URL}
          className={classes.imageView}
          isAnimation={isAnimation}
          onClick={showLargeViewHandler(true)}
        />
      )}
      <Box display='flex' alignItems='center' justifyContent='center' className={classes.labelLine}>
        <a href={asset?.permalink || asset?.openseaLink} target='_blank'>
          <Typography>View on Opensea</Typography>
        </a>
      </Box>
      {isOpenLargeView && (
        <div className={classes.overlay} onClick={showLargeViewHandler(false)}>
          <MenuCloseIcon className={classes.closeIcon} viewBox={'6 4 13 15'} />
          <AssetView
            tokenId={tokenId}
            src={asset?.imageUrl || INVALID_ASSET_URL}
            className={classes.largeView}
            isAnimation={isAnimation}
            isLargeView
          />
        </div>
      )}
    </>
  );
}

export default AssetImageView;
