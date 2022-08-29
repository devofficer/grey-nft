import { useState } from 'react';

import DialogWrapper from 'hoc/DialogWrapper';

import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContainedButton from 'components/Buttons/ContainedButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setWhiteList } from 'utils/web3';

export default function SetWhiteListDialog({ open, onClose, title, account, callback }) {
  const [tokenId, setTokenId] = useState();
  const [addressList, setAddressList] = useState();
  const [userWhitelistState, setUserWhitelistState] = useState('True');
  const [loading, setLoading] = useState(false);

  const setWhiteListHandler = async () => {
    setLoading(true);
    try {
      const result = await setWhiteList({
        addressList: addressList.split(' '),
        tokenId,
        userWhitelistState: userWhitelistState === 'True',
        address: account,
      });
      console.log('result ==>', result);
      callback && callback();
      onClose && onClose();
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const handleRadioChange = event => {
    setUserWhitelistState(event.target.value);
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
          Address List
        </DialogContentText>
        <OutlinedInput
          autoFocus
          placeholder='Address List'
          fullWidth
          value={addressList}
          onChange={ev => setAddressList(ev.target.value)}
        />

        <DialogContentText>
          <br />
          State
        </DialogContentText>
        <RadioGroup row value={userWhitelistState} onChange={handleRadioChange}>
          <FormControlLabel value={'True'} control={<Radio color='primary' />} label='True' />
          <FormControlLabel value={'False'} control={<Radio color='primary' />} label='False' />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton onClick={setWhiteListHandler} color='primary' loading={loading}>
          Set
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
