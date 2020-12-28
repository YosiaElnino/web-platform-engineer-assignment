import React from 'react';
import { Grid, Card, CardContent, Chip } from '@material-ui/core';
import { css } from '@emotion/react';
import pokeball from '../assets/pokeball.svg';
import mq from '../config/mediaQueries';

const PokemonCard = (props) => {
  const name = props.pokemon.name[0].toUpperCase() + props.pokemon.name.slice(1);
  
  const getOwnedTotal = () => {
    let count = 0;
    props.myList.forEach(pokemon => {
      if (pokemon.name === props.pokemon.name) count += 1
    })
    return count
  }

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card 
        elevation={3}
        onClick={() => props.openDetail(props.pokemon.name, props.pokemon.image)} 
      >
        <CardContent css={css`
          background-color: #79C2E2;
          &:hover {
            cursor: pointer;
            background-color: #3B4CCA99
          }
        `} >
          <Grid container direction="column">
            <Grid item>
              <img css={mq({
                opacity: 0.3,
                width: ["100px", "150px", "150px", "150px"],
                height: ["100px", "150px", "150px", "150px"],
                position: "absolute"
              })} src={pokeball} alt="pokeball"/>
              <img css={mq({
                width: ["100px", "150px", "150px", "150px"],
                height: ["100px", "150px", "150px", "150px"],
                position: "relative"
              })
              } src={props.pokemon.image} alt={props.pokemon.name}/>
            </Grid>
            <Grid item>
              <h3 css={css`
                color: #3B4CCA;
                margin: 4px;
              `}>{name}</h3>
              <Chip color="primary" style={{backgroundColor: '#FFFFFF66', color: '#3B4CCA'}} label={"Owned: " + getOwnedTotal()} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PokemonCard