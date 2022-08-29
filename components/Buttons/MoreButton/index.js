
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';

import MoreIcon from 'components/Icons/MoreIcon';

const useStyles = makeStyles(theme => ({
  selectedItem: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.main
  },
  selectedIcon: {
    color: theme.palette.primary.main
  },
  padding: { 
    marginLeft: theme.spacing(2) 
  },
  listItem: {
    height: '64px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft : theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  selectedColor: {
    color: theme.custom.palette.darkRed
  }
}));

const MoreButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Hidden smDown implementation='css' className={classes.listItem}>
      <ListItem
        button
        classes={{
          selected: classes.selectedItem,
          root: classes.listItem
        }}
        onClick={handleClick}>
        <MoreIcon className={anchorEl != null ? classes.selectedColor : null} />
      </ListItem>
    </Hidden>
  );
};

export default MoreButton;
