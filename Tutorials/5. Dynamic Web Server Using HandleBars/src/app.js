const path = require('path')
const express = require("express");
const hbs = require("hbs");

const PORT = 3000;

const app = express();

const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath))

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)

hbs.registerPartials(partialsDirPath)


app.get("/", (req, res) => {
  res.render('index', {
    title: 'Index',
    name: 'Saleem'
  });
});

app.get("/about", (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Saleem'
  });
});

app.get("/help", (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Saleem'
  });
});


app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is forecast today.",
    location: "Karachi.",
  });
});

app.get("/help/*", (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Saleem'
  })
});


app.get("*", (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Saleem'
  })
});

app.listen(PORT, () =>
  console.log(`Listen at ${PORT}. http://localhost:${PORT}`)
);
