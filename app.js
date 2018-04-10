const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let campgrounds = [
    {name: "Salmon Creek", image: "http://2.bp.blogspot.com/-8IMFY3VssyM/TtmFysK1WeI/AAAAAAABnTg/586HsIGY_To/s1600/Camping-in-Wilderness.jpg"},
    {name: "Granite Hill", image: "http://www.indiatravelblog.com/attachments/Resources/3818-7-Best-Camping-Places-in-India.jpg"},
    {name: "Mountaiin Goat's Rest", image: "https://indiahikes.com/wp-content/uploads/2016/09/Deoriatal-Chandrashila-trek_AjitHota_BhrujgaliCampSite-Indiahikes.jpg"},
    {name: "Salmon Creek", image: "http://2.bp.blogspot.com/-8IMFY3VssyM/TtmFysK1WeI/AAAAAAABnTg/586HsIGY_To/s1600/Camping-in-Wilderness.jpg"},
    {name: "Granite Hill", image: "http://www.indiatravelblog.com/attachments/Resources/3818-7-Best-Camping-Places-in-India.jpg"},
    {name: "Mountaiin Goat's Rest", image: "https://indiahikes.com/wp-content/uploads/2016/09/Deoriatal-Chandrashila-trek_AjitHota_BhrujgaliCampSite-Indiahikes.jpg"},
    {name: "Salmon Creek", image: "http://2.bp.blogspot.com/-8IMFY3VssyM/TtmFysK1WeI/AAAAAAABnTg/586HsIGY_To/s1600/Camping-in-Wilderness.jpg"},
    {name: "Granite Hill", image: "http://www.indiatravelblog.com/attachments/Resources/3818-7-Best-Camping-Places-in-India.jpg"},
    {name: "Mountaiin Goat's Rest", image: "https://indiahikes.com/wp-content/uploads/2016/09/Deoriatal-Chandrashila-trek_AjitHota_BhrujgaliCampSite-Indiahikes.jpg"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.post("/campgrounds", (req, res) => {
    let newCampground = { name: req.body.name, image: req.body.image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds", (req, res) => {
   
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});


app.listen(3000, () => {
    console.log(`YelpCamp Started!`);
});