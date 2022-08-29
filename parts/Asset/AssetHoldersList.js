import GreyCard from 'components/UI/GreyCard';
import Typography from '@material-ui/core/Typography';

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

export default function AssetHoldersList({ title, holders }) {
  return (
    <GreyCard title={title}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <TH align='left'>Address</TH>
            <TH align='center'>Balance</TH>
            <TH align='right'>Token Id</TH>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, index) => (
            <tr key={index}>
              <TD>{shortenAddress(holder.owner_of)}</TD>
              <TD align='center'>{holder.amount}</TD>
              <TD align='right'>{holder.token_id}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </GreyCard>
  );
}
