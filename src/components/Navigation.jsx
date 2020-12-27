import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
// import { Home } from '@material-ui/icons';
// import { Pokeball } from 'mdi-material-ui';

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
      `} showLabels style={{backgroundColor: '#FFDE00'}} value={value} onChange={handlePageChange}>
        <BottomNavigationAction 
          component={Link}
          to='/'
          label='Home'
          value='/'
          style={{color: '#3B4CCA'}}
          // icon={<Home />}
        />
        <BottomNavigationAction 
          component={Link}
          to='/mylist'
          label='Pokedex'
          value='/mylist'
          style={{color: '#3B4CCA'}}
          // icon={<Pokeball />}
        />
      </BottomNavigation>
    </Hidden>
  )
}