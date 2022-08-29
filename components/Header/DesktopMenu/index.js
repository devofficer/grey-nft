import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import TopAppBarLeft from './TopAppBarLeft';
import TopAppBarMenu from './TopAppBarMenu';
import TopAppBarRight from './TopAppBarRight';
import { TOP_BAR_MENUS } from 'constants/links/top-menu-items';
import MobileMenu from 'components/Header/MobileMenu';
import Web3Status from 'components/Web3Status';

const useStyles = makeStyles(theme => ({
  menu: {
    // display: 'flex',
    height: '100%',
    margin: theme.spacing(0, 1, 0, 2),
    flexGrow: 1,
  },
}));
const DesktopMenu = () => {
  const classes = useStyles();

  return (
    <>
      <TopAppBarLeft />
      <Hidden mdDown implementation='css' className={classes.menu}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          height={1}>
          <TopAppBarMenu menuItems={TOP_BAR_MENUS} />
          <Web3Status />
        </Box>
      </Hidden>
      <MobileMenu />
      {/* <TopAppBarRight /> */}
    </>
  );
};

export default DesktopMenu;
