import { useState } from 'react';

import DialogWrapper from 'hoc/DialogWrapper';

import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ContainedButton from 'components/Buttons/ContainedButton';
import { safeBatchTransferFrom } from 'utils/web3';

export default function BatchTransferDialog({ open, onClose, title, account, callback }) {
  const [tokenIds, setTokenIds] = useState();
  const [toAddress, setToAddress] = useState();
  const [amountList, setAmountList] = useState(1);
  const [loading, setLoading] = useState(false);

  const batchTransferHandler = async () => {
    setLoading(true);
    try {
      const result = await safeBatchTransferFrom({
        fromAddress: account,
        toAddress,
        ids: tokenIds.split(' '),
        amounts: amountList.split(' '),
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

  return (
    <DialogWrapper open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Token Ids</DialogContentText>
        <OutlinedInput
          autoFocus
          placeholder='e.g. 0 1 2'
          fullWidth
          value={tokenIds}
          onChange={ev => setTokenIds(ev.target.value)}
        />
        <DialogContentText>
          <br />
          Amount List
        </DialogContentText>
        <OutlinedInput
          placeholder='Amount List'
          fullWidth
          value={amountList}
          onChange={ev => setAmountList(ev.target.value)}
        />
        <DialogContentText>
          <br />
          To Address
        </DialogContentText>
        <OutlinedInput
          placeholder='To Address'
          fullWidth
          value={toAddress}
          onChange={ev => setToAddress(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <ContainedButton onClick={batchTransferHandler} color='primary' loading={loading}>
          Transfer
        </ContainedButton>
      </DialogActions>
    </DialogWrapper>
  );
}
