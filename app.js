const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
seedDB();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("landing");
});

// NEW ROUTE - shows form for new template
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) =>{
        if(err)
            console.log(err);
        else
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
    })
});

// SHOW - shows more info about a campground
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || foundCampground == null){
            res.send(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});




// CREATE ROUTE
app.post("/campgrounds", (req, res) => {
    let newCampground = { name: req.body.name, image: req.body.image, description: req.body.description};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err)
            console.log(err);
        else
            res.redirect("/campgrounds");
        
    })
});


//===============================
//      COMMENTS ROUTES
//===============================

// CREATE - Shows form to submit comment
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || foundCampground == null){
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            Comment.create(req.body.comment, (err, savedComment) => {
                if(err){
                    console.log(err);
                } else {
                    foundCampground.comments.push(savedComment);
                    foundCampground.save((err) => {
                        if(err){
                            console.log(err);
                        } else {
                            res.redirect("/campgrounds/"+ foundCampground._id);
                        }
                    });
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log(`YelpCamp Started!`);
});