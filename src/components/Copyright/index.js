import React from 'react';
import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default ({className}) => (
  <Typography variant="body2" color="textSecondary" align="center" className={className}>
    {'Copyright © '}
    <Link color="inherit" href="https://geekzolanos.github.io/">Geekzolanos</Link>
    {' '}{new Date().getFullYear()}{'.'}
  </Typography>
);