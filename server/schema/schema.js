let graphql = require("graphql");
let _ = require("lodash");
let Book = require("../models/book");
let Author = require("../models/author");

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//dummy data
// let books = [
//     { id:"1", name:"koti kommacchi", genre:"biopic", authorId: "1"},
//     { id:"2", name:"Amaravati kadhalu", genre:"drama", authorId: "2"},
//     { id:"3", name:"budugu", genre:"comedy", authorId: "2"},
//     { id:"3", name:"bommalu geeyandi", genre:"art", authorId: "3"}
// ];

// let authors = [
//     { id: "1", name: "veturi", age: "70" },
//     { id: "2", name: "Mullapudi venkata ramana", age: "60" },
//     { id: "3", name: "bapu", age: "55" }
// ];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({        // we wrap the fields inside a function as otherwise the graphql doesn't know what AuthorType is as it is defined below and not above.
        id: { type: GraphQLID }, // if we take id type as GraphQLString, then we need to pass only string to query, 
                                // if we take GraphQLID, it works with any type, be it string or integer.
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // console.log(parent);
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // console.log(parent);
                // return _.filter(books, {authorId: parent.id})
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db/any other source
                // console.log(typeof(args.id)); // returns always string
                // return _.find(books, {id: args.id});
                // return books.filter(book => {
                //     return book.id === args.id
                // });
                return Book.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();  // mongoose function
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();  // mongoose function
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

// query looks like
// book(id:"123") {
    // name
    // genre
// }