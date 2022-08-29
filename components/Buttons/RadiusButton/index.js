
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import ContainedButton from 'components/Buttons/ContainedButton';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 20
  }
}));

const RadiusButton = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <ContainedButton className={clsx(classes.root, className)} {...rest} />
  );
};

export default RadiusButton;
