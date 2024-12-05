import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Configure Apollo Client to work with both SSR and CSR
const createApolloClient = () => {
  return new ApolloClient({
    // @TODO: I wonder why this is here
    ssrMode: typeof window === 'undefined', // Disables force-fetching on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_LINK,
      // @TODO: Look into the purpose of this property
      credentials: 'same-origin',
    }),
    // @TODO: I should look deeper as to what it actually does and its benefits
    cache: new InMemoryCache(), // Cache the results of queries
  });
};

export default createApolloClient;