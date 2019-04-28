import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

class AuthorList extends Component {
  displayAuthors = () => {
    let data = this.props.data;
    if(data.loading) {
      return (<div>Loading Authors...</div>)
    } else {
      return data.authors.map(author => {
        return (
          <li key={author.id}> {author.name} </li>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div id="main">
        <ul id="booklist">
            {this.displayAuthors()}
        </ul>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AuthorList);
