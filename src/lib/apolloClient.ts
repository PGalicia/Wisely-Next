import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Configure Apollo Client to work with both SSR and CSR
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables force-fetching on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_LINK,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(), // Cache the results of queries
  });
};

export default createApolloClient;