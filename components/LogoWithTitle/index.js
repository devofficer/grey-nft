import { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from 'contexts';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PAGES from 'constants/links/pages';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: 0,
    margin: 'auto',
    maxWidth: 200,
    cursor: 'pointer',
  },
  logo: {
    marginRight: theme.spacing(1),
    width: theme.spacing(6.5),
    height: theme.spacing(6),
  },
  logoImage: {
    height: 40,
    objectFit: 'contain',
  },
}));

const logoUrl = {
  dark: '/img/logo-dark.png',
  light: '/img/logo-light.png',
};

const LogoWithTitle = ({ className }) => {
  const classes = useStyles();
  const { themeType } = useContext(AppContext);

  // const logoHandler = () => {
  //   router.push(PAGES.LANDING.url);
  // };

  return (
    <Link href={PAGES.LANDING.url}>
      <a>
        <div className={clsx(classes.root, className)}>
          <img className={classes.logoImage} src={logoUrl[themeType]} alt='logo' />
        </div>
      </a>
    </Link>
  );
};

export default LogoWithTitle;
