import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: 28,
    height: 20,
    color: theme.palette.text.primary,
  },
}));

const CommunityIcon = ({ className, viewBox, color, ...rest }) => {
  const classes = useStyles();
  return (
    <SvgIcon viewBox={viewBox || '0 0 14 12'} {...rest} className={clsx(classes.root, className)}>
      <g transform='translate(-71.000000, -1061.000000)' fill='currentColor'>
        <g id='Group-7-Copy-5' transform='translate(55.000000, 1022.000000)'>
          <g id='Group-10-Copy' transform='translate(11.000000, 34.000000)'>
            <g id='men-copy-7' transform='translate(5.000000, 5.000000)'>
              <path
                d='M12.0465442,7 C13.123695,7 14,7.82958026 14,8.84924138 L14,8.84924138 L14,10.8904402 C14,11.5022418 13.474217,12 12.8279107,12 L12.8279107,12 L11.0977402,12 C11.1411127,11.8842551 11.1649531,11.759803 11.1649531,11.6301467 L11.1649531,11.6301467 L11.1649531,7.88582638 C11.1649531,7.57484637 11.1066737,7.27647671 11,7 L11,7 Z M8.13939633,6 C9.16533385,6 10,6.83466615 10,7.86060367 L10,7.86060367 L10,11.6278793 C10,11.8333991 9.83339907,12 9.62787927,12 L9.62787927,12 L4.37212073,12 C4.16660093,12 4,11.8333739 4,11.6278793 L4,11.6278793 L4,7.86060367 C4,6.83466615 4.83466615,6 5.86060367,6 L5.86060367,6 Z M3,7 C2.89332629,7.27647671 2.83504691,7.57484637 2.83504691,7.88582638 L2.83504691,11.6301467 C2.83504691,11.759803 2.85888727,11.8842551 2.90225981,12 L1.17208934,12 C0.525783005,12 0,11.5022418 0,10.8904402 L0,8.84924138 C0,7.82958026 0.876305009,7 1.95345579,7 L3,7 Z M2.5,3 C3.32711546,3 4,3.67288454 4,4.5 C4,4.75457691 3.93607371,4.99441895 3.82370064,5.20463332 C3.66360286,5.50420459 3.40487401,5.74334712 3.09108687,5.87842046 C2.90959759,5.95654005 2.7098082,6 2.5,6 C1.67288454,6 1,5.32711546 1,4.5 C1,3.67288454 1.67288454,3 2.5,3 Z M11.5,3 L11.644255,3.00687939 C12.40395,3.07969656 13,3.72153839 13,4.5 C13,5.32711546 12.3271155,6 11.5,6 C11.2901918,6 11.0904024,5.95654005 10.9089131,5.87842046 C10.595126,5.74334712 10.3363971,5.50420459 10.1762994,5.20463332 C10.0639263,4.99441895 10,4.75457691 10,4.5 C10,3.67288454 10.6728845,3 11.5,3 L11.5,3 Z M7,0.02296875 C8.34017187,0.02296875 9.43047656,1.11330078 9.43047656,2.45347266 C9.43047656,3.36248828 8.92877344,4.15644141 8.18778516,4.57326953 C7.83633594,4.77096484 7.43115625,4.88394922 7,4.88394922 C6.56884375,4.88394922 6.16366406,4.77096484 5.81221484,4.57326953 C5.07125391,4.15644141 4.56952344,3.36251562 4.56952344,2.45347266 C4.56952344,1.11327344 5.65982812,0.02296875 7,0.02296875 Z'
                id='Path-Copy-4'></path>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default CommunityIcon;