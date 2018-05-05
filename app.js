const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
seedDB();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("landing");
});

app.post("/campgrounds", (req, res) => {
    let newCampground = { name: req.body.name, image: req.body.image};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err)
            console.log(err);
        else
            res.redirect("/campgrounds");
        
    })
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) =>{
        if(err)
            console.log(err);
        else
        res.render("campgrounds", {campgrounds: allCampgrounds});
    })
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

// SHOW - shows more info about a campground
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || foundCampground == null){
            res.send(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log(`YelpCamp Started!`);
});