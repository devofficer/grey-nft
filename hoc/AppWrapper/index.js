import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';
// import { MoralisProvider, useMoralis } from 'react-moralis';

import Header from 'components/Header';
import Footer from 'components/Footer';
import WalletModal from 'components/WalletModal';
import { AppContext } from 'contexts';
import { useEagerConnect, useInactiveListener } from 'utils/hooks';
import { isEmpty } from 'utils/utility';
import { MORALIS_SERVER_URL, MORALIS_APP_ID } from 'config/settings';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.main,
    minHeight: '100vh',
    backgroundImage: 'url(/img/background.jpg)',
    backgroundSize: 'cover',
  },
  headerWrapper: {
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  main: {
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
    minHeight: `calc(100vh - ${
      theme.custom.layout.topAppBarHeight + theme.custom.layout.footerHeight
    }px)`,
    padding: theme.spacing(3, 5, 3, 5),
    maxWidth: theme.custom.layout.maxAppWidth,
    width: '100%',
  },
}));

const AppWrapper = ({ children }) => {
  const classes = useStyles({});
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;
  const { isWalletModalOpened, setIsWalletModalOpened } = useContext(AppContext);
  const [activatingConnector, setActivatingConnector] = useState();

  // const { logout } = useMoralis();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    if (!isEmpty(account) && isWalletModalOpened) {
      setIsWalletModalOpened(false);
    }
  }, [account, isWalletModalOpened]);

  useEffect(() => {
    if (isEmpty(account)) {
    }
  }, [account]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  const openCloseDialogHandler = show => () => {
    setIsWalletModalOpened(show);
  };

  return (
    // <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <div className={classes.root}>
      {isWalletModalOpened && (
        <WalletModal
          headerTitle={'Select a Wallet'}
          open={true}
          onClose={openCloseDialogHandler(false)}
          setActivatingConnector={setActivatingConnector}
          activatingConnector={activatingConnector}
          context={context}
        />
      )}
      <div className={classes.headerWrapper}>
        <Header />
      </div>
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
    // </MoralisProvider>
  );
};

export default AppWrapper;
