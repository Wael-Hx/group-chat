import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { cache } from "./cache";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import { getMainDefinition } from "@apollo/client/utilities";

const URI: string = process.env.REACT_APP_GQL_URI as string;
const WS: string = process.env.REACT_APP_GQL_WS as string;

const endpoint = createHttpLink({ uri: URI, credentials: "include" });

const wsLink = new WebSocketLink({
  uri: WS,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  endpoint
);

const client = new ApolloClient({
  link: splitLink,
  cache: cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
