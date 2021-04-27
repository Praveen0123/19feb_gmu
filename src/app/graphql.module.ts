import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '@env/environment';
import { setContext } from 'apollo-link-context';

const uri = environment.API.graphQLUrl; // <-- add the URL of the GraphQL server here
const authLink = setContext((_, { headers }) =>
{
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});
export function createApollo(httpLink: HttpLink)
{
  const defaultOptions =
  {
    watchQuery:
    {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query:
    {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
    defaultOptions,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers:
    [
      {
        provide: APOLLO_OPTIONS,
        useFactory: createApollo,
        deps: [HttpLink]
      }
    ]
})
export class GraphQLModule { }
