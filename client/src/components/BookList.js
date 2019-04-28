import React, { Component } from 'react';

import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  displayBooks = () => {
    let data = this.props.data;
    if(data.loading) {
      return (<li>Loading Books...</li>)
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}> {book.name} </li>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div id="main">
        <ul id="booklist">
            {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
