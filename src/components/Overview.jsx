import React from 'react';
import { Grid, Card, CardContent, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const useStyles = makeStyles((theme) => ({
  styledCard: {
    width: '12vw',
    [theme.breakpoints.down('xs')]: {
      width: '28vw'
    },
    height: '100px'
  }
}))

const H2 = styled.h2(props => (
  {
    marginTop: 0,
    fontSize: props.title? '1.4rem' : '1rem'
  })
)

export default function Overview (props) {
  const classes = useStyles()
  
  return (
    <>
      <Grid 
        container 
        spacing={3}
        direction="row"
        justify="center"
      >
        <Grid item>
          <Card className={classes.styledCard}>
            <CardContent css={css`
              background-color: ${props.getBackrgound(props.pokemon.types[0]?.type.name) + 'BF'}
            `}>
              <H2 title="true">{props.pokemon.weight/10 + ' kg'}</H2>
              <H2>Weight</H2>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.styledCard}>
            <CardContent css={css`
              background-color: ${props.getBackrgound(props.pokemon.types[0]?.type.name) + 'BF'}
            `}>
              <H2 title="true">{props.pokemon.height/10 + ' m'}</H2>
              <H2>Height</H2>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div>
        <h3>Types</h3>
        {
          props.pokemon.types.map((type, i) => {
            return (
              <Chip css={css`
                margin-left: 12px;
              `} color='primary' style={{backgroundColor: props.getBackrgound(type.type.name) + '66', color: '#000000'}} key={type+i} label={props.getName(type.type.name)} />
            )
          })
        }
      </div>
      <div>
        <h3>Abilities</h3>
        {
          props.pokemon.abilities.map((ability, i) => {
            return (
              <Chip css={css`
                margin-left: 12px;
              `} color='primary' style={{backgroundColor: props.getBackrgound(props.pokemon.types[0]?.type.name) + '66', color: '#000000'}} key={ability+i} label={props.getName(ability.ability.name)} />
            )
          })
        }
      </div>
    </>
  )
}