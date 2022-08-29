import { useState } from 'react';

import DialogWrapper from 'hoc/DialogWrapper';

import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContainedButton from 'components/Buttons/ContainedButton';
import { setTokenPrice } from 'utils/web3';

export default function SetTokenPriceDialog({ open, onClose, title, account, callback }) {
  const [tokenId, setTokenId] = useState();
  const [tokenPrice, setPrice] = useState();
  const [loading, setLoading] = useState(false);

  const setTokenPriceHandler = async () => {
    setLoading(true);
    try {
      const result = await setTokenPrice({
        tokenId,
        price: tokenPrice,
        address: account,
      });
      callback && callback();
      onClose && onClose();
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Token Id</DialogContentText>
        <OutlinedInput
          autoFocus
          placeholder='Token Id'
          type='number'
          fullWidth
          value={tokenId}
          inputProps={{ min: 0 }}
          onChange={ev => setTokenId(ev.target.value)}
        />

        <DialogContentText>
          <br />
          Token Price in Wei
        </DialogContentText>
        <OutlinedInput
          autoFocus
          placeholder='Token Price'
          fullWidth
          value={tokenPrice}
          onChange={ev => setPrice(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton onClick={setTokenPriceHandler} color='primary' loading={loading}>
          Set
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
