const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    required: true,
    type: String
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Comment", commentSchema);