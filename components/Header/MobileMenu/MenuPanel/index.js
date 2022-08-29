import { useContext } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Web3Status from 'components/Web3Status';
import MenuPanelListItem from './MenuPanelItem';
import { AppContext } from 'contexts';

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const MenuPanel = ({ title, menuItems, onItemClick }) => {
  const classes = useStyles();

  const { isMinter } = useContext(AppContext);

  return (
    <>
      <Box display='flex' mt={3}>
        <Web3Status />
      </Box>
      <Typography className={classes.title}>{title}</Typography>
      <List>
        {menuItems.map(
          menuItem =>
            (!menuItem.minterOnly || isMinter) && (
              <MenuPanelListItem
                key={menuItem.id}
                selected={false}
                menuItem={menuItem}
                onClick={onItemClick}
              />
            ),
        )}
      </List>
    </>
  );
};

export default MenuPanel;
