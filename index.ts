import gql from 'graphql-tag';
import nodeFetch from 'node-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import * as dotenv from 'dotenv';
import { MyLoginQuery } from './schema';

dotenv.config();

(async () => {
  try {
    const client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        fetch: nodeFetch,
        headers: {
          authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
      }),
      cache: new InMemoryCache(),
    });

    const query = gql`
      query MyLogin {
        viewer {
          login
        }
      }
    `;

    const response = await client.query<MyLoginQuery>({
      query,
    });

    console.log(response.data.viewer.login);
  } catch (err) {
    console.log(err);
  }
})();
