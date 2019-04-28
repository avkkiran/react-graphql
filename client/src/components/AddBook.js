import React, { Component } from 'react';
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  displayAuthors = () => {
    // let data = this.props.data;
    let data = this.props.getAuthorsQuery;
    if(data.loading) {
      return (<option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}> {author.name} </option>
        );
      });
    }
  }
  setEntity = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name: </label>
          <input type="text" id="name" name="name" placeholder="Enter book name" value={this.state.name} onChange={this.setEntity} />
        </div>
        <div className="field">
          <label>Genre: </label>
          <input type="text" id="genre" name="genre" placeholder="Enter genre" value={this.state.genre} onChange={this.setEntity} />
        </div>
        <div className="field">
          <label>Author: </label>
          <select id="authorId" name="authorId" value={this.state.authorId} onChange={this.setEntity}>
              <option>Select Author</option>
              {this.displayAuthors()}
          </select>
        </div>
        <button>Add Book</button>
      </form>
    );
  }
}

// export default graphql(getAuthorsQuery)(AddBook);
export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
