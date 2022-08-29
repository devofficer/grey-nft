import { format } from 'date-fns';
import GreyCard from 'components/UI/GreyCard';
import Typography from '@material-ui/core/Typography';
import ContainedButton from 'components/Buttons/ContainedButton';

import { shortenAddress } from 'utils/utility';

const TH = ({ align, children }) => (
  <th>
    <Typography align={align}>{children}</Typography>
  </th>
);

const TD = ({ align, children }) => (
  <td>
    <Typography align={align}>{children}</Typography>
  </td>
);

export default function AssetOrderList({ orders }) {
  return (
    <GreyCard title={title}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <TH align='left'>Unit Price</TH>
            <TH>USD Unit Price</TH>
            <TH>Quantity</TH>
            <TH>Action</TH>
            <TH>Expiration</TH>
            <TH align='right'>From</TH>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <TD>
                {order.base_price / Math.pow(10, order?.payment_token_contract?.decimals || 18)}{' '}
                {order.payment_token_contract.symbol}
              </TD>
              <TD></TD>
              <TD align='center'>{order.quantity}</TD>
              <td align='center'>
                <ContainedButton>Cancel</ContainedButton>
              </td>
              <TD align='center'>
                {!order.expiration_time
                  ? '-'
                  : format(new Date(order.expiration_time * 1000), 'do MMM - H:mm')}
              </TD>
              <TD align='right'>{shortenAddress(order.maker.address)}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </GreyCard>
  );
}
