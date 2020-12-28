import React from 'react';
import Title from '../assets/title.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import mq from '../config/mediaQueries';
import { Hidden, Grid, Paper } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Pokeball from '../assets/pokeicon.svg';
import Trainer from '../assets/trainer.svg';

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.5rem;
  color: #3B4CCA;
`

const TitleScreen = () => {
  return (
    <>
      <div css={css`margin-top: 16px;`}>
        <img css={mq({
          width: ['320px', '480px', '600px', '600px']
        })} src={Title} alt="poke-pedia"/>
        <Hidden xsDown>
          <Grid container spacing={4} justify="center">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <img css={css`width: 40px`} src={Pokeball} alt="pokeball"/>
                </Grid>
                <Grid item>
                  <StyledLink activeStyle={{fontWeight: "bold"}} to='/' exact={true}>Pokemons</StyledLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <img css={css`width: 40px`} src={Trainer} alt="pokeball"/>
                </Grid>
                <Grid item>
                  <StyledLink activeStyle={{fontWeight: "bold"}} css={css`margin-left: 16px`} to="/mylist">My List</StyledLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </div>
    </>
  )
}

export default TitleScreen