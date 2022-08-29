import { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';

import TopAppBarMenuItem from './TopAppBarMenuItem';
import { AppContext } from 'contexts';

const useStyles = makeStyles(theme => ({
  menuItem: {
    flexDirection: 'row',
    minHeight: '100%',
    padding: 0,
    justifyContent: 'flex-end !important',
    marginRight: theme.spacing(2),
  },
}));

const TopAppBarMenu = ({ menuItems }) => {
  const classes = useStyles();

  const { isMinter, isOwner } = useContext(AppContext);
  const { account } = useWeb3React();

  return (
    <ListItem className={classes.menuItem}>
      {menuItems.map(
        menuItem =>
          ((!menuItem.minterOnly && !menuItem.authOnly) ||
            (menuItem.minterOnly && isMinter) ||
            (menuItem.authOnly && account) ||
            (menuItem.ownerOnly && isOwner)) && (
            <TopAppBarMenuItem key={menuItem.id} selected={false} menuItem={menuItem} />
          ),
      )}
    </ListItem>
  );
};

export default TopAppBarMenu;
