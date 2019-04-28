import React, { Component } from 'react';

import { graphql } from "react-apollo";
import { getBookDetails } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    let data = this.props.data;
    if(data.loading) {
      return (<li>Loading Book details...</li>)
    } else {
      return (
        <li key={book.id}> {book.name} </li>
      );
    }
  }
  render() {
    console.log(this.props);
    return (
      <div id="main">
        <ul id="booklist">
            {this.displayBookDetails()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBookDetails)(BookDetails);
