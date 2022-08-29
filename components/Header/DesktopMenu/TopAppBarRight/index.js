import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ThemeChange from './ThemeChange';
import Web3Status from 'components/Web3Status';
import Avatar from './Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
    background: 'none !important',
  },
  padding: {
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
    // display: 'flex',
    // justifyContent: 'flex-end',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(0),
    padding: 0,
    height: '100%',
  },
}));

const TopAppBarRight = ({ theme, index }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Web3Status /> */}
      {/* <ThemeChange /> */}
      {/* <ListItem className={classes.padding}>
      </ListItem> */}
      {/* <Divider orientation="vertical" className={classes.dividerHeight} />
      <ListItem className={classes.avatarPadding}>
        <Avatar />
      </ListItem> */}
    </div>
  );
};

export default TopAppBarRight;
