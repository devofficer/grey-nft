import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ContainedButton from 'components/Buttons/ContainedButton';
import PAGES from 'constants/links/pages';

export default function Home() {
  return (
    <Grid container spacing={3} style={{ padding: '12px' }}>
      <Head>
        <title>Home | Grey Marketplace</title>
        <meta name='keywords' content='Grey token home nft marketplace ethereum opensea' />
        <meta name='description' content='Home page of Grey Marketplace' />
      </Head>
      <Grid item xs={12} md={6}>
        <Box p={[3, 6]} ml={[0, 4, 6]} mt={[0, 6]}>
          <Typography variant='h4' color='textSecondary'>
            Welcome to the Grey <br />
            NFT Marketplace
          </Typography>
          <br />
          <Typography variant='h5'>
            Join our Discord Channel <br />
            to stay up to date on our <br />
            first NFT Drop
          </Typography>
          <br />
          <Link href={PAGES.COMMUNITIY.url}>
            <a target='_blank'>
              <ContainedButton>Join Discord</ContainedButton>
            </a>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={5} style={{ position: 'relative' }}>
        <Image
          src='/img/hoa portrait.jpg'
          width={1600}
          height={1600}
          layout='responsive'
          objectFit='contain'
          alt='landing-banner'
        />
      </Grid>
    </Grid>
  );
}
