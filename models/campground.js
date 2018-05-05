// SCHEMA SETUP

const mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true
  },
  comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
  ]
});

module.exports = mongoose.model("Campground", campgroundSchema);