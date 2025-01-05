'use client';
/**
 * Imports
 */
// Apollo
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '@/lib/apolloClient';

// React
import React from 'react';

// Create the Apollo Client instance
const client = createApolloClient();

export default function ApolloClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children} 
    </ApolloProvider>
  );
}