const {Router} = require('express');
const router = Router();

//Route
router.get('/', (req, res) => {
    res.render('index', {
        titulo: "Mi titulo dinamico"
    });
})

router.get('/servicios', (req, res) => {
    res.render('servicios',{tituloServicio:"Este es un mensaje dinamico de servicio"})
})

module.exports = router;
