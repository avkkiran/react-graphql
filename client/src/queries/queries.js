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

const getBookQuery = gql`
    query($id:ID){
        book(id:$id) {
            name
            genre
            id
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
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
export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery }