import React, { Component } from 'react';

import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    let {book} = this.props.data;
    if(book) {
        return (<div id="book-details">
                    <h2> {book.name} </h2>
                    <h4> {book.genre} </h4>
                    <h4> {book.author.name} </h4>
                    <h3> All Books </h3>
                    <ul className="other-books">
                    {book.author.books.map(authorBook => {
                        return <li key={authorBook.id}>{authorBook.name}</li>
                    })}
                    </ul>
                </div>)
    } else {
      return (
        <div> No book id is selected.... </div>
      );
    }
  }
  render() {
    return (
      <div id="main">
            {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
