import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query getPokemons($limit: Int, $offset: Int){
    pokemons(limit: $limit, offset: $offset){
      count
      next
      previous
      results {
        id
        name
        image
      }
    }
  }
`

export const GET_POKEMON = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      weight
      height
      stats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`

export const GET_MY_LIST = gql`
  query getMyList{
    myList{
      nickname,
      name,
      image
    }
  }
`