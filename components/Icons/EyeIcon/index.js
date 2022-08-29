
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: 17,
    height: 20,
    color: theme.palette.text.chip
  }
}));

const EyeIcon = ({ className, viewBox, color, ...rest }) => {
  const classes = useStyles();
  return (
    <SvgIcon viewBox={viewBox || "0 0 15 10"} {...rest} className={clsx(classes.root, className)}>
      <g id="Icons" transform="translate(-1003.000000, -464.000000)" >
        <g id="eye" transform="translate(1003.000000, 464.000000)">
          <path d="M7.49769939,0.0247440273 C4.63266871,0.0247440273 2.0345092,1.76877133 0.117331288,4.60153584 C-0.0391104294,4.83361775 -0.0391104294,5.15784983 0.117331288,5.38993174 C2.0345092,8.22610922 4.63266871,9.97013652 7.49769939,9.97013652 C10.3627301,9.97013652 12.9608896,8.22610922 14.8780675,5.39334471 C15.0345092,5.1612628 15.0345092,4.83703072 14.8780675,4.60494881 C12.9608896,1.76877133 10.3627301,0.0247440273 7.49769939,0.0247440273 Z M7.70322086,8.49914676 C5.80138037,8.63225256 4.23082822,6.88822526 4.35046012,4.76877133 C4.44861963,3.02133106 5.72162577,1.60494881 7.29217791,1.49573379 C9.1940184,1.36262799 10.7645706,3.10665529 10.6449387,5.22610922 C10.5437117,6.97013652 9.27070552,8.38651877 7.70322086,8.49914676 Z M7.60812883,6.88139932 C6.58358896,6.95307167 5.73696319,6.01450512 5.80444785,4.87457338 C5.85659509,3.93259386 6.54371166,3.17150171 7.39033742,3.11006826 C8.4148773,3.0383959 9.26150307,3.97696246 9.1940184,5.1168942 C9.13880368,6.06228669 8.45168712,6.82337884 7.60812883,6.88139932 Z" id="Shape"></path>
        </g>
      </g>
    </SvgIcon>
  )
};

export default EyeIcon;