const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require("postman-request")
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



const app = express()
console.log(__dirname)
console.log(__filename)



console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewaPath = path.join(__dirname, '../templates/views')

const partialPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewaPath)
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Santiago'
    })
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About app',
        name: 'Santiago'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Santiago',
        message: 'Hi this is the help pages, you`re welcome'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })

})
app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You did`t provide an address"
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {

            // return res.render('404', {
            //     title: '404 Weather',
            //     name: 'Santiago',
            //     message: error
            // })
            return res.send({
                title: '404 Weather',
                name: 'Santiago',
                message: error,
                error: error
            })
        } else {
            forecast.forecast(latitude, longitude, (error, forecastdata) => {
                if (!error) {

                    res.send({
                        forecast: forecastdata,
                        location: location,
                        address: req.query.address
                    })
                }
                else {
                    // return res.render('404', {
                    //     title: '404 Weather',
                    //     name: 'Santiago',
                    //     message: error
                    // }) 
                    return res.send({
                        title: '404 Weather',
                        name: 'Santiago',
                        message: error,
                        error: error
                    })
                }
            })
        }
    })



})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Santiago',
        message: 'Help page not found '
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santiago',
        message: 'Page cannot be found'
    })
})

//app.com
//app.com/help
//app.com/about


app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Santiago',
//         age: 26
//     },
//     {
//         name: 'Ikaris',
//         age: 70038
//     }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>about page with H2</h2>')
// })



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

 