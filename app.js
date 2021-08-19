const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;
//Conexión a la base de datos;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.mfh9h.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

//Config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Middleware
app.use(express.static(__dirname + '/public'));

//Rutas Web
app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));
// Enviar una pagina 404
// app.use((req, res, next) => {
//     res.status(404).render('404', {
//         titulo: "404",
//     })
// })



app.listen(port, () => {
    console.log('Port on:' + port);
});
