import React, { Component } from 'react';

// components
import BookList from "./components/BookList";
// import AuthorList from "./components/AuthorList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from './components/AddBook';

// apollo client setup
let client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>AVK Web app</h1>
          <BookList />
          <AddBook />
          {/* <AuthorList /> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
