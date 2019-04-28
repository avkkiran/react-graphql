// Error returned while accessing localhost:4000/graphql endpoint before creating schema
// {"errors":[{"message":"GraphQL middleware options must contain a schema."}]}

// after initializing the schema
// {"errors":[{"message":"Must provide query string."}]}

// current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// (node:26597) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoNetworkError: connection 5 to graphqlmongocluster-shard-00-02-iaxgr.mongodb.net:27017 closed
// add your public ip address of your host windows machine or public address of your vm (depends on the context)

// create a mongo db instance in mlab.com
// db user details: kiranavk/sails123
// cloud.mongodb.com credentials: kiran.adhikarla@yahoo.co.in/ExpImp123$

let express = require("express");
let graphqlHTTP = require("express-graphql");
let schema = require("./schema/schema");
let mongoose = require("mongoose");
let cors = require("cors");
// let MongoClient = require("mongodb").MongoClient;
// let uri = "mongodb+srv://avkkiran:sails123@graphqlmongocluster-iaxgr.mongodb.net/test?retryWrites=true";
let uri = "mongodb+srv://avkkiran:sails123@graphqlmongocluster-iaxgr.mongodb.net/test?retryWrites=true";

let app = express();

// allow cross origin requests
app.use(cors());

let mongoOptions = {
    useNewUrlParser: true
};
// let client = new MongoClient(uri, mongoOptions);
// client.connect((err) => {
//     console.log(err);
//     client.close();
// });
mongoose.connect(uri, mongoOptions);
mongoose.connection.once("open", () => {
    console.log("connection to mongodb instance successful");
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

let port = 4000;
app.listen(port, () => {
    console.log("Listening to requests on port 4000")
});



