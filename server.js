// ----- DEPENDANCIES -----
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override")

// ----- DATA -----
const ***** = require("./models/*****.js");

// ----- MIDDLEWARE -----
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


// ----- ROUTES -----
// redirfect to main page (Index page) on starting server
app.get('/', (req, res) => {
  res.redirect("/*****")
})


// INDEX
app.get("/*****/", (req, res) => {
  res.render("*****.ejs", {
    ***** : *****,
    tabTitle: "*****"
  })
})

// NEW
app.get("/*****/new", (req, res) => {
  res.render("*****.ejs", {
    tabTitle: "New"
  })
})

// DELETE
app.delete("/*****/:id", (req, res) => {
  //remove the ***** object from the array
  *****.splice(req.params.id, 1),
    //redirect to the index page
    res.redirect("/*****")
})

// UPDATE
app.put("/*****/:id", (req, res) => {
  //:id is the index of our ***** array that we want to change
  //Set that element to the value of req.body (the input data)
  ***** [req.params.id] = req.body;
  //update the nested array
  ***** [req.params.idO].type =[req.body.type0, req.body.type1, req.body.type2]
    //update the stats (nested object)
    ***** [req.params.id].stats = {
    hp: req.body.hp,
      defense: req.body.defense,
        attack: req.body.attack
  }
  //redirect to the index page
  res.redirect("/*****") //redirect to the index page
})

// CREATE
app.post("/*****", (req, res) => {
  //create the nested object called stats
  req.body.stats = {
    hp: req.body.hp,
    defense: req.body.defense,
    attack: req.body.attack
  },
    //create the nested array called type
    req.body.type = [req.body.type0, req.body.type1, req.body.type2]
    //add the new ***** to the array of *****
    *****.push(req.body)
  res.redirect("/*****")
})

// EDIT
app.get("/*****/:id/edit", (req, res) => {
  res.render("*****.ejs",
    {
      //pass in an object that contains
      ***** : ***** [req.params.id], //the pokemon object
    index: req.params.id, //... and its index in the array
    stat: ***** [req.params.id].stats,//the stats object
    tabTitle: "Edit"
    }
)
})

// SHOW
app.get("/*****/:id", (req, res) => {
  res.render("*****.ejs", {
    //pass the ***** object to the show page. This is for a specific index
    ***** : ***** [req.params.id],
    //pass stat (which is the stats object) to the show page to display some stats
    stat: ***** [req.params.id].stats,
    tabTitle: "Show",
  })
})


// ----- Listener -----
app.listen(port, () => {
  console.log("listening...");
})