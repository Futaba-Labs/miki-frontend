import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://miki-indexer-production.up.railway.app/graphql',
  cache: new InMemoryCache(),
});
