import { useState } from 'react';
import { format } from 'date-fns';
import GreyCard from 'components/UI/GreyCard';
import Typography from '@material-ui/core/Typography';
import ContainedButton from 'components/Buttons/ContainedButton';

import { shortenAddress } from 'utils/utility';
import { cancelOrder, fulfillOrder } from 'services/opensea-sdk';

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

export default function AssetOfferList({ title, account, orders, callback }) {
  const [cancelingOrder, setCancelingOrder] = useState();
  const [buyingOrder, setBuyingOrder] = useState();

  const cancelHandler = order => async () => {
    setCancelingOrder(order.hash);
    try {
      const result = await cancelOrder({ account, order });
      setCancelingOrder(null);
      callback && callback();
    } catch (error) {
      console.log('[cancel order Handler] error ==>', error);
      setCancelingOrder(null);
    }
  };

  const buyHandler = order => async () => {
    setBuyingOrder(order.hash);

    try {
      const result = await fulfillOrder({ account, order });
      setBuyingOrder(null);
      callback && callback();
    } catch (error) {
      console.log('[buy order Handler] error ==>', error);
      setBuyingOrder(null);
    }
  };

  return (
    <GreyCard title={title}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <TH align='left'>Unit Price</TH>
            <TH>USD Unit Price</TH>
            <TH>Quantity</TH>
            <TH>Expiration</TH>
            <TH align='center'>From</TH>
            <TH align='right'>Action</TH>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <TD>
                {order.basePrice / Math.pow(10, order?.paymentTokenContract?.decimals || 18)}
                {order?.paymentTokenContract?.symbol}
              </TD>
              <TD></TD>
              <TD align='center'>{order.quantity.toNumber()}</TD>
              <TD align='center'>
                {!order.expirationTime.toNumber()
                  ? '-'
                  : format(new Date(order.expirationTime.toNumber() * 1000), 'do MMM - HH:mm')}
              </TD>
              <TD align='center'>{shortenAddress(order.makerAccount.address)}</TD>
              <td align='right'>
                {order.maker.toLowerCase() === account?.toLowerCase() ? (
                  <ContainedButton
                    loading={cancelingOrder === order.hash}
                    onClick={cancelHandler(order)}>
                    Cancel
                  </ContainedButton>
                ) : (
                  <ContainedButton loading={buyingOrder === order.hash} onClick={buyHandler(order)}>
                    Accept
                  </ContainedButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GreyCard>
  );
}
