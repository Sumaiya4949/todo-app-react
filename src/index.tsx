import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { initializeApp } from "firebase/app";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Pw1YoIvhyHvsyXUEGcnPk_Iwim4AioQ",
  authDomain: "todo-app-4949.firebaseapp.com",
  projectId: "todo-app-4949",
  storageBucket: "todo-app-4949.appspot.com",
  messagingSenderId: "840188496611",
  appId: "1:840188496611:web:818d4932cc486dcc0393d6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register();
