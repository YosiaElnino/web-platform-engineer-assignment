import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import Pokeball from '../assets/pokeicon.svg';
import Trainer from '../assets/trainer.svg';

const PokeballIcon = () => {
  return (
    <img css={css`
      width: 32px;
    `} src={Pokeball} alt="pokeball"/>
  )
}

const TrainerIcon = () => {
  return (
    <img css={css`
      width: 32px;
    `} src={Trainer} alt="pokeball"/>
  )
}

export default function Navigation () {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname)
  const handlePageChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Hidden smUp>
      <BottomNavigation css={css`
        width: 100%;
        position: fixed;
        bottom: 0;
      `} style={{backgroundColor: '#FFDE00'}} value={value} onChange={handlePageChange}>
        <BottomNavigationAction 
          component={Link}
          to='/'
          label='Pokemons'
          value='/'
          style={{color: '#3B4CCA'}}
          icon={<PokeballIcon />}
        />
        <BottomNavigationAction 
          component={Link}
          to='/mylist'
          label='My List'
          value='/mylist'
          style={{color: '#3B4CCA'}}
          icon={<TrainerIcon />}
        />
      </BottomNavigation>
    </Hidden>
  )
}