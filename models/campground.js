// SCHEMA SETUP

const mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  image:{
      type: String,
      required: true,
  }
});

module.exports = mongoose.model("Campground", campgroundSchema);