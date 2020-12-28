import React, { useState, useEffect } from 'react';
import client from '../config/graphql';
import { GET_MY_LIST } from '../config/query';
import { Grid, Container, Snackbar } from '@material-ui/core';
import { css } from '@emotion/react';
import MyListCard from '../components/MyListCard';
import { Skeleton, Alert } from '@material-ui/lab';
import EmptyState from '../components/EmptyState';


const MyPokemonList = () => {
  const [list, setList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const releasePokemon = (nickname) => {
    const { myList: currentList } = client.readQuery({
      query: GET_MY_LIST
    })

    const newList = currentList.filter(el => el.nickname !== nickname)

    client.writeQuery({
      query: GET_MY_LIST,
      data: {
        myList: newList 
      }
    })

    localStorage.setItem('myList', JSON.stringify({myList: newList}))
    setList(newList)
  }

  const closeAlert = () => {
    setOpenAlert(false)
  }

  useEffect(() => {
    setLoading(true)
    const cache = client.readQuery({
      query: GET_MY_LIST
    })
    setList(cache.myList)
    setLoading(false)
  }, [])

  if (!list.length) return <EmptyState />

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3} css={css`
          padding-bottom: 16px;
          @media (max-width: 600px) {
            padding-bottom: 80px;
          }
        `}>
          {
            isLoading? (
              [...Array(12)].map((el, i) => {
                return (
                  <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                    <Skeleton variant="rect" height={240} animation="wave" />
                  </Grid>
                )
              })
            ) : (
              list.map(pokemon => {
                return (
                  <MyListCard key={pokemon.nickname} pokemon={pokemon} releasePokemon={releasePokemon} setOpenAlert={setOpenAlert} />
                )
              })
            )
          }
        </Grid>
        <Snackbar
          open={openAlert} 
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={closeAlert}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={closeAlert}
          >
            Pokemon has been released
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}

export default MyPokemonList