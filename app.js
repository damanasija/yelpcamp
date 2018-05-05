const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost/yelp_camp_v3");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// salmonCreek.save((err, campground) => {
//     if(err)
//         console.log(err);
//     else
//         console.log(campground);
// });



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


app.listen(3000, () => {
    console.log(`YelpCamp Started!`);
});