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
import { setWhiteListState } from 'utils/web3';

export default function SetWhiteListStateDialog({ open, onClose, title, account, callback }) {
  const [tokenIds, setTokenIds] = useState();
  const [tokenWhitelistState, setTokenWhitelistState] = useState('True');
  const [loading, setLoading] = useState(false);

  const setWhiteListStateHandler = async () => {
    setLoading(true);
    try {
      const result = await setWhiteListState({
        tokenIds: tokenIds.split(' '),
        tokenWhitelistState: tokenWhitelistState === 'True',
        address: account,
      });
      callback && callback();
      onClose && onClose();
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const handleRadioChange = event => {
    setTokenWhitelistState(event.target.value);
  };

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Token Ids</DialogContentText>
        <OutlinedInput
          autoFocus
          placeholder='Token Ids'
          fullWidth
          value={tokenIds}
          onChange={ev => setTokenIds(ev.target.value)}
        />

        <DialogContentText>
          <br />
          State
        </DialogContentText>
        <RadioGroup row value={tokenWhitelistState} onChange={handleRadioChange}>
          <FormControlLabel value={'True'} control={<Radio color='primary' />} label='True' />
          <FormControlLabel value={'False'} control={<Radio color='primary' />} label='False' />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton onClick={setWhiteListStateHandler} color='primary' loading={loading}>
          Set
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
