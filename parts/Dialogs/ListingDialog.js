import { useState } from 'react';

import DialogWrapper from 'hoc/DialogWrapper';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ContainedButton from 'components/Buttons/ContainedButton';

import { createSellOrder } from 'services/opensea-sdk';

export default function ListingDialog({ open, onClose, title, tokenId, account, callback }) {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isGrey, setIsGrey] = useState(false); // TODO: set as true later

  const sellHandler = async () => {
    setLoading(true);
    try {
      const result = await createSellOrder({
        account,
        tokenId,
        startAmount: price,
        endAmount: price,
        // expirationTime = undefined,
        paymentWithGrey: isGrey,
      });
      callback && callback();
      onClose && onClose();
    } catch (error) {
      console.log('[ListingDialog] error ==>', error);
    }
    setLoading(false);
  };

  const handleRadioChange = event => {
    setIsGrey(event.target.value === 'GREY');
  };

  // const isDisabled = isGrey ? price > balanceData?.GREY / 1e18 : price > balanceData?.ETH / 1e18; // TODO: 1e9

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <div>
        <DialogContentText>
          Listed sell price cannot be edited once your item is listed. <br />
          (GREY will be available soon.)
        </DialogContentText>

        <RadioGroup row value={isGrey ? 'GREY' : 'ETH'} onChange={handleRadioChange}>
          <FormControlLabel
            value='GREY'
            disabled
            control={<Radio color='primary' />}
            label='GREY'
          />
          <FormControlLabel value='ETH' control={<Radio color='primary' />} label='ETH' />
        </RadioGroup>
        <OutlinedInput
          autoFocus
          type='number'
          fullWidth
          value={price}
          endAdornment={
            <InputAdornment position='end'>
              {!isGrey ? (
                <Chip avatar={<Avatar alt='weth' src='/img/eth.png' />} label='ETH' clickable />
              ) : (
                <Chip avatar={<Avatar alt='grey' src='/img/grey.png' />} label='GREY' clickable />
              )}
            </InputAdornment>
          }
          onChange={ev => setPrice(ev.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton
          onClick={sellHandler}
          color='primary'
          loading={loading}
          disabled={price <= 0}>
          LIST
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
