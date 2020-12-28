import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POKEMON, GET_MY_LIST } from '../config/query';
import client from '../config/graphql';
import PokemonData from '../components/PokemonData';
import mq from '../config/mediaQueries';
import { css } from '@emotion/react';
import { Button, Card, CardContent, Container, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Snackbar } from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';

const PokemonDetail = () => {
  const [open, setOpen] = useState(false)
  const [openFailed, setOpenFailed] = useState(false)
  const [openInput, setOpenInput] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [nickname, setNickname] = useState('')
  const [isValid, setValid] = useState(true)
  const params = useParams()
  const {loading, error, data} = useQuery(GET_POKEMON, {
    variables: { name: params.name }
  })

  const AlertContainer = (props) => {
    return <Alert elevation={6} variant="filled" {...props} />;
  }

  const catchPokemon = () => {
    const random = Math.floor(Math.random() * 2)
    setOpen(true)
    setTimeout(() => {
      if (random === 1) {
        setOpen(false)
        setOpenInput(true)
      } else {
        setOpen(false)
        setOpenFailed(true)
      }
    }, 2000)
  }

  const handleClick = () => {
    setOpenFailed(false)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNickname(event.target.value)
  }

  const validateNickname = () => {
    const cache = client.readQuery({
      query: GET_MY_LIST
    })
    let flag = false
    cache.myList.forEach(pokemon => {
      if (pokemon.nickname === nickname) {
        flag = true
        setValid(false)
      }
    })
    if (flag) return false
    setValid(true)
    return true  
  }

  const handleSubmit = () => {
    if (validateNickname()) {
      addToMyList(nickname)
      setOpenInput(false)
      setOpenAlert(true)
      setNickname('')
    } 
  }

  const closeAlert = () => {
    setOpenAlert(false)
  }

  const addToMyList = (nickname) => {
    const newList = {
      nickname,
      name: data.pokemon.name,
      image: data.pokemon.sprites.front_default 
    }

    const { myList: currentList } = client.readQuery({
      query: GET_MY_LIST,
    })

    client.writeQuery({
      query: GET_MY_LIST,
      data: {
        myList: [...currentList, newList]
      }
    })

    const myList = client.readQuery({
      query: GET_MY_LIST,
    })

    localStorage.setItem('myList', JSON.stringify(myList))
  }

  const cardColors = {
    fire: '#EE8130',
    grass: '#7AC74C',
    electric: '#F7D02C',
    water: '#6390F0',
    ground: '#E2BF65',
    rock: '#B6A136',
    fairy: '#D685AD',
    poison: '#A33EA1',
    bug: '#A6B91A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C22E28',
    ice: '#96D9D6',
    ghost: '#735797',
    dark: '#705746',
    steel: '#B7B7CE',
    normal: '#A8A77A'
  }
  
  const getBackrgound = () => {
    for (const key in cardColors) {
      if (key === data?.pokemon?.types[0]?.type.name) {
        return cardColors[key] 
      }
    }
  }

  const renderError = () => {
    if (!isValid) return (
      <p css={css`color: #811111`}>nickname must be unique</p>
    )
  }

  if (error) return <h1>{error.message}</h1>

  return (
    <>
      <Container maxWidth="lg" css={css `
          margin-top: 16px;
          @media (max-width: 600px) {
            padding-bottom: 80px;
          }
        `}>
        <Card css={css`margin-bottom: 32px`}>
          <CardContent css={css`
            background-color: ${getBackrgound() + '66'}
          `}>
            <Grid 
              container 
              spacing={2}
              direction="row"
              justify="center"
            >
              {
                loading? (
                  <Grid item xs={12} md={6}>
                    <Skeleton css={css`
                      text-align: center;
                      margin: auto`
                    } variant="circle" width={220} height={220}/>
                    <Skeleton css={css`
                      text-align: center;
                      margin: auto;
                      width: 40%;`
                    } />
                    <Skeleton css={css`
                      text-align: center;
                      margin: auto`
                    } variant="rect" width={100} height={40} />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6}>
                    <div css={mq({
                      'background-color': '#FFFFFF99',
                      'border-radius': '50%',
                      'text-align': 'center',
                      margin: 'auto',
                      width: ['180px', '220px', '280px', '320px'],
                      height: ['180px', '220px', '280px', '320px']
                    })}>
                      <img css={mq({
                        width: ['150px', '200px', '250px', '300px'],
                        'margin-top': '32px'
                      })} src={`https://pokeres.bastionbot.org/images/pokemon/${data.pokemon.id}.png`} alt={data.pokemon.name}/>
                    </div>
                    <h1>{data.pokemon.name[0].toUpperCase() + data.pokemon.name.slice(1)}</h1>
                    <Button color="primary" variant="contained" style={{backgroundColor: getBackrgound() + '66', borderRadius: 8, color:'#000000'}} onClick={() => catchPokemon()}>Catch</Button>
                  </Grid>
                )
              }
              {
                loading? (
                  <Grid item xs={12} md={6}>
                    <Skeleton css={css`
                      text-align: center;
                      margin: auto`
                    } variant="rect" width={500} height={300} />
                  </Grid>
                ):(
                  <Grid item xs={12} md={6}>
                    <PokemonData pokemon={data.pokemon} colors={cardColors} />
                  </Grid>
                )
              }
            </Grid>
          </CardContent>
        </Card>
        <Dialog
          open={open}
          disableEnforceFocus
          aria-labelledby={"modal-title-" + params.name}
          titleStyle={{textAlign: "center"}}
          PaperProps={{
            style: {
              backgroundColor: getBackrgound()
            },
          }}
        >
          <DialogTitle css={css`
            text-align: center;
          `} id={"modal-title-" + params.name}>
            Catching...
          </DialogTitle>
          <DialogContent>
            <img css={css`
              @media (max-width: 600px) {
                width: 200px;
              }
            `} src="https://i.pinimg.com/originals/13/ba/5b/13ba5b73cec2ee78a3a0fe3c8d58ac5f.gif" alt="catch"/>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openFailed}
          disableEnforceFocus
          aria-labelledby={"failed-title-" + params.name}
          aria-describedby={"failed-dialog-" + params.name}
          titleStyle={{textAlign: "center"}}
          PaperProps={{
            style: {
              backgroundColor: getBackrgound()
            },
          }}
        >
          <DialogTitle id={"failed-title-" + params.name}>
            Oops...
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={"failed-title-" + params.name}>{data?.pokemon?.name} is failed to catch, better luck next time</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClick()}>Okay</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openInput}
          disableEnforceFocus
          aria-labelledby={"input-title-" + params.name}
          titleStyle={{textAlign: "center"}}
          fullWidth={true}
          maxWidth='sm'
          PaperProps={{
            style: {
              backgroundColor: getBackrgound()
            },
          }}
        >
          <DialogTitle css={css`text-align: center`} id={"input-title-" + params.name}>
            Success!
          </DialogTitle>
          <DialogContent css={css`
            text-align: center;
          `}>
            <div css={mq({
              'background-color': '#FFFFFF99',
              'border-radius': '50%',
              'text-align': 'center',
              margin: 'auto',
              width: ['180px', '220px', '280px', '320px'],
              height: ['180px', '220px', '280px', '320px']
            })}>
              <img css={mq({
                width: ['150px', '200px', '250px', '300px'],
                'margin-top': '32px'
              })} src={`https://pokeres.bastionbot.org/images/pokemon/${data?.pokemon?.id}.png`} alt={data?.pokemon?.name}/>
            </div>
            <TextField style={{marginTop: '24px'}} onChange={event => handleChange(event)} value={nickname} label="Enter Nickname" variant="outlined" />
            {renderError()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleSubmit()}>Save Pokemon</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openAlert} 
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={closeAlert}
        >
          <AlertContainer severity="success" onClose={closeAlert} >
            Pokemon has been saved
          </AlertContainer>
        </Snackbar>
      </Container>
    </>
  )
}

export default PokemonDetail