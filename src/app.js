const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');


const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));

// handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anmol Khatri',
        role: 'Front End Web Developer'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Anmol Khatri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Anmol Khatri'
    })
})
app.get('/weather', (req, res) => {
    // console.log(req.query.address);
    if(!req.query.address) {
        return res.send({
            response: 'Pls provide an address.'
        })
    }
    
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })      
        })
    })
    // res.send({
    //     forecast:,
    //     address: response.body.features[0].place_name
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            response: 'Pls provide a search term'
        })
    }
    // console.log(req.query)
    // console.log(req.query.role);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('unfound', {
        section: 'help article',
        title: 'check the link'
    })
})
app.get('*', (req, res) => {
    res.render('unfound', {
        section:'',
        title: 'check the link'

    })
})

app.listen(3000, () => {
    console.log('Server has been started on Port 3000');
})

console.log('nodemon is now restarting automatically');