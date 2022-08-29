import { useState, useEffect } from 'react';

import DialogWrapper from 'hoc/DialogWrapper';

import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContainedButton from 'components/Buttons/ContainedButton';
import { getNFTPrice, buyNFTFromVault } from 'utils/web3';

export default function BuyDialog({ open, onClose, title, tokenId, maxAmount, account, callback }) {
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const buyHandler = async () => {
    setLoading(true);
    try {
      const result = await buyNFTFromVault({
        address: account,
        tokenId,
        quantity: amount,
        fee: price * amount,
      });
      callback && callback();
      onClose && onClose();
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const maxHandler = () => {
    setAmount(maxAmount);
  };

  const fetchPrice = async () => {
    const nftPrice = await getNFTPrice(tokenId);
    setPrice(nftPrice);
  };

  useEffect(() => {
    fetchPrice(tokenId);
  }, [tokenId]);

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Price per NFT: {price / 1e18} ETH</DialogContentText>
        <DialogContentText>NFT to Buy (Maximum: {maxAmount})</DialogContentText>
        <OutlinedInput
          autoFocus
          placeholder='Amount'
          type='number'
          fullWidth
          value={amount}
          inputProps={{ min: 0, max: maxAmount }}
          startAdornment={
            <InputAdornment position='start'>
              <Chip label='MAX' clickable color='primary' onClick={maxHandler} />
            </InputAdornment>
          }
          onChange={ev => setAmount(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton
          onClick={buyHandler}
          color='primary'
          disabled={amount <= 0 || amount > maxAmount}
          loading={loading}>
          Buy
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
