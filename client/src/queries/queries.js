import { gql } from "apollo-boost";

const getBooksQuery = gql`
    {
        books {
            name
            genre
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            name
            age
            id
        }
    }
`

const getBookDetails = gql`
    {
        book(id:$ID!) {
            name
            author
            id
        }
    }
`

const addBookMutation = gql`
    mutation($name:String!, $genre:String!, $authorId:ID!){
        addBook (name:$name, genre:$genre, authorId:$authorId) {
            name
            genre
            id
        }
    }
`

// exclamation is to say that it is required.
export { getBooksQuery, getAuthorsQuery, addBookMutation }