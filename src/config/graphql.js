import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_MY_LIST } from './query';

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache()
})

let myList = []
const cache = localStorage.getItem('myList')
if (cache) myList = JSON.parse(cache).myList

client.writeQuery({
  query: GET_MY_LIST,
  data: {
    myList
  }
})

export default client