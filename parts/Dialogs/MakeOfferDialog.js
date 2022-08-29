import { useState, useContext } from 'react';

import DialogWrapper from 'hoc/DialogWrapper';

import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContainedButton from 'components/Buttons/ContainedButton';
import { AppContext } from 'contexts';
import { createBuyOrder } from 'services/opensea-sdk';

export default function MakeOfferDialog({ open, onClose, title, tokenId, account, callback }) {
  const [price, setPrice] = useState(0);
  const [expireDays, setExpireDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isGrey, setIsGrey] = useState(false);
  const { balanceData } = useContext(AppContext);

  const buyHandler = async () => {
    setLoading(true);
    try {
      const result = await createBuyOrder({
        account,
        tokenId,
        startAmount: price,
        expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24 * expireDays),
        paymentWithGrey: isGrey,
      });
      callback && callback();
      onClose && onClose();
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const handleRadioChange = event => {
    setIsGrey(event.target.value === 'GREY');
  };

  const maxHandler = () => {
    setPrice(isGrey ? balanceData?.GREY / 1e18 : balanceData?.ETH / 1e18); // TODO: 1e9
  };

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Input price and offer expiration <br />
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
        <br />

        <OutlinedInput
          autoFocus
          type='number'
          fullWidth
          value={price}
          startAdornment={
            <InputAdornment position='start'>
              <Chip label='MAX' clickable color='primary' onClick={maxHandler} />
            </InputAdornment>
          }
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
        <br />
        <br />
        <DialogContentText>Expiration Days</DialogContentText>
        <OutlinedInput
          placeholder='Offer Expiration'
          type='number'
          fullWidth
          value={expireDays}
          onChange={ev => setExpireDays(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton onClick={buyHandler} color='primary' disabled={price <= 0}>
          Make Offer
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
