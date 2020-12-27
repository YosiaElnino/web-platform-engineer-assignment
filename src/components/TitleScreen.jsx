import React from 'react';
import Title from '../assets/title.svg';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import mq from '../config/mediaQueries';
import { Hidden, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

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
          <Box marginBottom="16px">
            <StyledLink activeStyle={{fontWeight: "bold"}} to='/' exact={true}>Pokemons</StyledLink>
            <StyledLink activeStyle={{fontWeight: "bold"}} css={css`margin-left: 16px`} to="/mylist">My List</StyledLink>
          </Box>
        </Hidden>
      </div>
    </>
  )
}

export default TitleScreen