import React from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import Pokemon from './components/Pokemon';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';


function App() {

  const cache = new InMemoryCache();
const link = new HttpLink({
    uri : 'https://beta.pokeapi.co/graphql/v1beta/'
})

  const client = new ApolloClient({
    cache,
    link
  })
 
  

  return (
    <ApolloProvider client={client}>
    <Pokemon />
    </ApolloProvider>
  );
}

export default App;
