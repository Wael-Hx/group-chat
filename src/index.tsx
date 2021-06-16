import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import App from "./App";
import { cache } from "./cache";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme/theme";
import { getMainDefinition } from "@apollo/client/utilities";

const nodeEnv = process.env.NODE_ENV as "development" | "production",
  URI = process.env.REACT_APP_GQL_URI as string,
  WS = process.env.REACT_APP_GQL_WS as string,
  URI_DEV = process.env.REACT_APP_GQL_URI_DEV as string,
  WS_DEV = process.env.REACT_APP_GQL_WS_DEV as string;

const endpoint = createHttpLink({
  uri: nodeEnv === "development" ? URI_DEV : URI,
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: nodeEnv === "development" ? WS_DEV : WS,
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
