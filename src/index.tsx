import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { cache } from "./cache";

const URI: string = process.env.REACT_APP_GQL_URI as string;

const endpoint = createHttpLink({ uri: URI, credentials: "include" });

const client = new ApolloClient({
  link: endpoint,
  cache: cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
