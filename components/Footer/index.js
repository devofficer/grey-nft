import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FOOTER_LINKS } from 'constants/links/pages';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  footerRoot: {
    width: '100%',
    marginTop: theme.spacing(2),
    borderTop: '1px solid #d8e2ef',
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: theme.palette.background.main,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2),
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(2, 2, 6, 2),
    // backgroundColor: theme.palette.background.main,
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: theme.spacing(3),
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  link: {
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footerRoot}>
      <div className={classes.container}>
        {FOOTER_LINKS.map((columnData, index) => (
          <div className={classes.column} key={`column-${index}`}>
            <Typography className={classes.title} key={`column-title-${index}`}>
              {columnData.title}
            </Typography>
            {columnData.items.map((data, colIndex) => (
              <a href={data.url} rel='noreferrer' target='_blank' key={`data-${index}-${colIndex}`}>
                <Typography className={classes.link}>{data.title}</Typography>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
