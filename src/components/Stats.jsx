import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { css } from '@emotion/react';

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: props => props.background
  },
  barColorPrimary: {
    backgroundColor: props => props.barColor
  }
})(LinearProgress);

export default function Stats (props) {
  const statValue = (base) => {
    return (base / 200) * 100
  }

  return (
    <Grid spacing={1} container alignItems="center">
      <Grid xs={4} item>
        <h4 css={css`text-align: left`}>{props.stat.stat.name}</h4>
      </Grid>
      <Grid xs item>
        <StyledLinearProgress 
          color='primary'
          background = {props.background}
          barColor = {props.barColor}
          variant="determinate" 
          value={statValue(props.stat.base_stat)} 
        />
      </Grid>
      <Grid xs={1} item>
        <h4 css={css`
          text-align: left;
          margin-left: 8px;
        `}>{props.stat.base_stat}</h4>
      </Grid>
    </Grid>
  )
}