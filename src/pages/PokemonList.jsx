import React, { useState, useRef} from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS, GET_MY_LIST } from '../config/query';
import { useHistory } from "react-router-dom";
import { Container, Grid } from '@material-ui/core';
import { Pagination, Skeleton } from '@material-ui/lab';
import PokemonCard from '../components/PokemonCard';
import client from '../config/graphql';
import { css } from '@emotion/react';

const PokemonList = () => {
  const [offset, setOffset] = useState(1)
  const [page, setPage] = useState(1)
  const topPage = useRef(null)

  const { error, loading, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 23, offset }
  })

  const myList = client.readQuery({
    query: GET_MY_LIST
  })

  const history = useHistory()

  const openDetail = (name, image) => {
    history.push(`/detail/${name}`, { image: image })
  }

  const getCount = (count) => {
    return Math.ceil(count / 24)
  }

  const handlePageChange = (event, value) => {
    const currentOffset = ((value - 1) * 24 + 1)
    setOffset(currentOffset)
    setPage(value)
    topPage.current.scrollIntoView()
  }

  if(error) return <h1>{ error.message }</h1>

  return (
    <>
      <Container maxWidth="lg">
        <Grid css={css`
          padding-bottom: 16px;
          @media (max-width: 600px) {
            padding-bottom: 80px;
          }
        `} container spacing={3} ref={topPage}>
          {
            loading? (
              [...Array(12)].map((el, i) => {
                return (
                  <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                    <Skeleton variant="rect" height={240} animation="wave" />
                  </Grid>
                )
              })
            ) : (
              data.pokemons.results.map(pokemon => {
                return (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} openDetail={openDetail} myList={myList.myList} ></PokemonCard>
                )
              })
            )
          }
          <Pagination 
            css={css`
              margin: auto;
            `} 
            count={getCount(data?.pokemons.count)} 
            page={page} 
            variant="outlined" 
            shape="rounded" 
            color="primary"
            style={{color: '#3B4CCA'}}
            onChange={handlePageChange} />
        </Grid>
      </Container>
    </>
  )
}

export default PokemonList