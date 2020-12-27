import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Tab, Tabs } from '@material-ui/core';
import { css } from '@emotion/react';
import Overview from './Overview';
import Stats from './Stats';
import Moves from './Moves';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`poke-tabpanel-${index}`}
      aria-labelledby={`poke-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired 
}

const tabProps = (index) => {
  return {
    id: `poke-tab-${index}`,
    'aria-controls': `poke-tabpanel-${index}`
  };
}

export default function PokemonData (props) {
  const [value, setValue] = useState(0)
  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const getName = (name) => {
    return name[0].toUpperCase() + name.slice(1)
  }
  const getBackrgound = (type) => {
    for (const key in props.colors) {
      if (key === type) {
        return props.colors[key]
      }
    }
  }

  return (
    <>
      <Tabs TabIndicatorProps={{style: {backgroundColor: getBackrgound(props.pokemon.types[0]?.type.name)}}} centered value={value} onChange={handleTabChange}>
        <Tab label="Overview" {...tabProps(0)} />
        <Tab label="Stats" {...tabProps(1)} />
        <Tab label="Moves" {...tabProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Overview pokemon={props.pokemon} getBackrgound={getBackrgound} getName={getName} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          props.pokemon.stats.map((stat, i) => {
            const background = getBackrgound(props.pokemon.types[0]?.type.name) + '4D'
            const barColor = getBackrgound(props.pokemon.types[0]?.type.name)
            return (
              <Stats key={stat+i} stat={stat} background={background} barColor={barColor} /> 
            )
          })
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid css={css`
          max-height: 40vh;
          overflow-y: auto;
        `} container spacing={2}>
        {
          props.pokemon.moves.map((move, i) => {
            const backgroundColor = getBackrgound(props.pokemon.types[0]?.type.name) + '66'
            return (
              <Moves key={i} move={move} getName={getName} background={backgroundColor} />
            )
          })
        }
        </Grid>
      </TabPanel>
    </>
  )
}