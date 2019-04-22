let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model("Book", bookSchema);