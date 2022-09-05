// ----- DEPENDANCIES -----
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override")

// ----- DATA -----
const pokemons = require("./models/pokemon.js");

// ----- MIDDLEWARE -----
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


// ----- ROUTES -----
// redirfect to main page (Index page) on starting server
app.get('/', (req, res) => {
  res.redirect("/pokemons")
})


// INDEX
app.get("/pokemons/", (req, res) => {
  res.render("index_pokemon.ejs", {
    pokemon: pokemons,
    tabTitle: "Index"
  })
})

// NEW
app.get("/pokemons/new", (req, res) => {
  res.render("new_pokemon.ejs", {
    tabTitle: "New"
  })
})

// DELETE
app.delete("/pokemons/:idOfPokemon", (req, res) => {
  //remove the Pokemon object from the array
  pokemons.splice(req.params.idOfPokemon, 1),
    //redirect to the index page
    res.redirect("/pokemons")
})

// UPDATE
app.put("/pokemons/:idOfPokemon", (req, res) => {
  //:idOfPokemon is the index of our Pokemons array that we want to change
  //Set that element to the value of req.body (the input data)
  pokemons[req.params.idOfPokemon] = req.body;
  //update the nested array
  pokemons[req.params.idOfPokemon].type = [req.body.type0, req.body.type1, req.body.type2]
  //update the stats (nested object)
  pokemons[req.params.idOfPokemon].stats = {
    hp: req.body.hp,
    defense: req.body.defense,
    attack: req.body.attack
  }
  //redirect to the index page
  res.redirect("/pokemons") //redirect to the index page
})

// CREATE
app.post("/pokemons", (req, res) => {
  //create the nested object called stats
  req.body.stats = {
    hp: req.body.hp,
    defense: req.body.defense,
    attack: req.body.attack
  },
    //create the nested array called type
    req.body.type = [req.body.type0, req.body.type1, req.body.type2]
  //add the new pokemon to the array of pokemons
  pokemons.push(req.body)
  res.redirect("/pokemons")
})

// EDIT
app.get("/pokemons/:idOfPokemon/edit", (req, res) => {
  res.render("edit_pokemon.ejs",
    {
      //pass in an object that contains
      pokemon: pokemons[req.params.idOfPokemon], //the pokemon object
      index: req.params.idOfPokemon, //... and its index in the array
      stat: pokemons[req.params.idOfPokemon].stats,//the stats object
      tabTitle: "Edit"
    }
  )
})

// SHOW
app.get("/pokemons/:idPokemonIndex", (req, res) => {
  res.render("show_pokemon.ejs", {
    //pass the Pokemon object to the show page. This is for a specific index
    pokemon: pokemons[req.params.idPokemonIndex],
    //pass stat (which is the stats object) to the show page to display some stats
    stat: pokemons[req.params.idPokemonIndex].stats,
    tabTitle: "Show",
  })
})


// ----- Listener -----
app.listen(port, () => {
  console.log("listening...");
})