import React, {useState} from 'react';
import { Grid, Card, CardContent, Chip, Button, Dialog,  DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar } from '@material-ui/core';
import { css } from '@emotion/react';
import pokeball from '../assets/pokeball.svg';
import mq from '../config/mediaQueries';

const MyListCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClick = () => {
    props.releasePokemon(props.pokemon.nickname)
    setOpenDialog(false)
    props.setOpenAlert(true)
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <Card 
          elevation={3} 
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
                `}>{props.pokemon.nickname}</h3>
                <Chip color="primary" style={{backgroundColor: '#FFFFFF66', color: '#3B4CCA'}} label={props.pokemon.name} />
              </Grid>
              <Grid item>
              <Button color="primary" variant="contained" style={{backgroundColor: '#FFFFFF66', borderRadius: 8, color:'#3B4CCA', marginTop: '16px'}} onClick={handleOpen}>Release</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Dialog
        open={openDialog}
        disableEnforceFocus
        aria-labelledby={"dialog-title-" + props.pokemon.id}
        aria-describedby={"dialog-description-" + props.pokemon.id}
        titleStyle={{textAlign: "center"}}
        PaperProps={{
          style: {
            backgroundColor: '#FFDE00'
          },
        }}
      >
        <DialogTitle id={"dialog-title-" + props.pokemon.id}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={"dialog-description-" + props.pokemon.id}>Once a pokemon has been released it can't be reverted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleClick}>Release</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MyListCard