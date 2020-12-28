import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: props => ({
    padding: theme.spacing(1, 1),
    height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: props.background
  }),
}));

export default function Moves (props) {
  const classProps = {background: props.background}
  const classes = useStyles(classProps)

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Paper elevation={2} className={classes.root}>
        <Typography align="center">{props.getName(props.move.move.name)}</Typography>
      </Paper>
    </Grid>
  )
}