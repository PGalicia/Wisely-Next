'use client';

import { ApolloProvider } from '@apollo/client';
import createApolloClient from '@/lib/apolloClient';

// Create the Apollo Client instance
const client = createApolloClient();

export default function ApolloClientWrapper({ children }: { children: any }) {
  return (
    <ApolloProvider client={client}>
      {children} 
    </ApolloProvider>
  );
}