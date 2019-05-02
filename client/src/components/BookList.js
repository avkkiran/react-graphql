import React, { Component } from 'react';

import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      selected: null
    }
  }
  displayBooks = () => {
    let data = this.props.data;
    if(data.loading) {
      return (<li>Loading Books...</li>)
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={() => this.setState({ selected: book.id })}> {book.name} </li>
        );
      });
    }
  }
  render() {
    // console.log(this.state.id);
    return (
      <div id="main">
        <ul id="booklist">
            {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
