import { Fragment } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

import globalStyles from '../styles/global';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style jsx global>
            {globalStyles}
          </style>
          <link rel='preconnect' href='https://fonts.googleapis.com/'></link>
          <link rel='preconnect' href='https://fonts.gstatic.com/' crossorigin></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,600&family=Raleway:wght@500&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600&display=swap'
            rel='stylesheet'></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600&display=swap'
            rel='stylesheet'></link>
          <link
            rel='icon'
            type='image/png'
            href='https://greytoken.net/wp-content/uploads/2021/07/cropped-GREY_Icon_256-32x32.png'></link>
          <meta name='og:image' content='https://nft.greytoken.io/img/greytoken-social.jpg'></meta>
          <meta
            name='twitter:image'
            content='https://nft.greytoken.io/img/greytoken-social.jpg'></meta>
          <meta name='description' content='Grey Token NFT marketplace'></meta>
        </Head>
        <noscript>Please enable Javascript to continue using this application.</noscript>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      <Fragment key='styles'>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </Fragment>,
    ],
  };
};

export default MyDocument;
