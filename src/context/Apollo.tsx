import { ApolloClient, ApolloProvider as BaseProvider, InMemoryCache } from '@apollo/client'
import React, { ReactChild } from 'react'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
})

export const ApolloProvider = ({ children }: { children: ReactChild }) => (
  <BaseProvider client={client}>
    {children}
  </BaseProvider>
)
