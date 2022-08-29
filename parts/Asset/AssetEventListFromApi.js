import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import GreyCard from 'components/UI/GreyCard';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import { getAssetEvents } from 'services/opensea';
import { shortenAddress } from 'utils/utility';
import { ChainId } from 'config/settings';

const TH = ({ align, children }) => (
  <th>
    <Typography align={align}>{children}</Typography>
  </th>
);

const TD = ({ align, children }) => (
  <td>
    <Typography align={align} noWrap>
      {children}
    </Typography>
  </td>
);

const labelMap = {
  successful: 'Sale',
  transfer: 'Transfer',
  created: 'List',
  offer_entered: 'Offer',
  cancelled: 'Cancel',
  bid_withdrawn: 'Bid Cancel',
};

export default function AssetEventListFromApi({ tokenId, account }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [page, setPage] = useState(1);
  let timer = null;

  const fetchTransaction = async () => {
    try {
      setIsLoading(true);
      const result = await getAssetEvents({ tokenId, page: page - 1 });
      setEvents(result.asset_events);
    } catch (error) {
      // TODO: check 429 error
      console.log('[fetchEvents] error ==>', error);
    }
    setIsLoading(false);
  };

  const fetchEvents = async () => {
    timer = setTimeout(async () => {
      fetchTransaction();
    }, 3000);
  };

  useEffect(() => {
    if (events?.length) {
      clearInterval(timer);
    }
  }, [events?.length]);

  useEffect(() => {
    if (tokenId) {
      fetchEvents();
    }

    return () => setEvents([]);
  }, [tokenId, page]);

  return (
    <GreyCard title={'Events'}>
      {isLoading ? (
        <Box display='flex' justifyContent='center'>
          <LoadingSpinner />
        </Box>
      ) : (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <TH align='left'>Event</TH>
              <TH>Unit Price</TH>
              <TH>Quantity</TH>
              <TH>From</TH>
              <TH>To</TH>
              <TH>Date</TH>
              <TH align='right'>Transaction Details</TH>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              const amount = event.ending_price || event.total_price || event.bid_amount;
              return (
                <tr
                  key={event.id}
                  onClick={() => {
                    console.log(event);
                  }}>
                  <TD>
                    {event?.from_account?.address === '0x0000000000000000000000000000000000000000'
                      ? 'Minted'
                      : labelMap[event.event_type] || event.event_type}
                  </TD>
                  <TD align='center'>
                    {amount ? amount / Math.pow(10, event?.payment_token?.decimals) : null}{' '}
                    {amount ? event?.payment_token?.symbol : ''}
                  </TD>
                  <TD align='center'>{event.quantity}</TD>
                  <TD align='center'>
                    {shortenAddress(
                      event?.from_account?.address || event?.transaction?.from_account?.address,
                      account,
                    )}
                  </TD>
                  <TD align='center'>
                    {shortenAddress(
                      event?.to_account?.address || event?.transaction?.to_account?.address,
                      account,
                    )}
                  </TD>
                  <TD align='center'>
                    {!event.created_date
                      ? '-'
                      : format(new Date(event.created_date), 'do MMM - H:mm')}
                  </TD>
                  <TD align='right'>
                    {event?.transaction?.transaction_hash && (
                      <a
                        href={`https://${ChainId === 4 ? 'rinkeby.' : ''}etherscan.io/tx/${
                          event?.transaction?.transaction_hash
                        }`}
                        target='_blank'>
                        View on Etherscan
                      </a>
                    )}
                  </TD>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* <Box display='flex' justifyContent='center' m={2}>
        <Paginator totalPages={4} currentPage={page} setCurrentPage={setPage} />
      </Box> */}
    </GreyCard>
  );
}
