import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import client from './config/graphql';
import { PokemonList, PokemonDetail, MyPokemonList } from './pages';
import TitleScreen from './components/TitleScreen';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <TitleScreen />
          <Switch>
            <Route exact path = '/'>
              <PokemonList />
            </Route>
            <Route path = '/detail/:name'>
              <PokemonDetail />
            </Route>
            <Route exact path = '/mylist'>
              <MyPokemonList />
            </Route>
          </Switch>
          <Navigation />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
