import { useState } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AppContext } from 'contexts';
import { ToastContainer } from 'react-toastify';
// import { MoralisProvider } from 'react-moralis';
import AppWrapper from 'hoc/AppWrapper';
import { theme } from 'styles/theme';
import usePersistState from 'hooks/usePersistState';
// import { MORALIS_SERVER_URL, MORALIS_APP_ID } from 'config/settings';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const getLibrary = provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function MyApp({ Component, pageProps }) {
  const [themeType, themeChange] = usePersistState('dark', 'theme-type');
  const [isWalletModalOpened, setIsWalletModalOpened] = useState(false);
  const [balanceData, setBalanceData] = useState({});
  const [isMinter, setIsMinter] = useState();
  const [isOwner, setIsOwner] = useState();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Grey NFT Marketplace</title>
        <meta name='description' content='Grey NFT Marketplace' />
        <link
          rel='icon'
          href='https://greytoken.net/wp-content/uploads/2021/07/cropped-GREY_Logo_Combination_Mark_w_tag-1-768x219.png'
        />
      </Head>
      <CssBaseline />
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      {/* <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}> */}
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppContext.Provider
          value={{
            themeType,
            themeChange,
            isWalletModalOpened,
            setIsWalletModalOpened,
            balanceData,
            setBalanceData,
            isMinter,
            setIsMinter,
            isOwner,
            setIsOwner,
          }}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </AppContext.Provider>
      </Web3ReactProvider>
      {/* </MoralisProvider> */}
    </ThemeProvider>
  );
}

export default MyApp;
