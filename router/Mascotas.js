const { Router } = require('express');
const router = Router();
const Mascota = require('../models/mascota');

router.get('/', async (req, res) => {
    try {
        const arrayMascotas = await Mascota.find();
        res.render('mascotas', {
            arrayMascotas
        });
    } catch (error) {
        console.log(error);
    }
})

router.get('/crear', (req, res) => {
    res.render('crear');
})

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        // const mascotaDB = new Mascota(body);
        // await mascotaDB.save();
        await Mascota.create(body);

        res.redirect('/mascotas')

    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({ _id: id });
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        });

    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: "No se encuentra el id seleccionado"
        });

    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id });

        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: 'eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'fallo al eliminar!'
            })
        }

    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id,body,{usefindAndModify:false});
        console.log(mascotaDB);
        
        res.json({
            estado: true,
            mensaje: 'Editado'
        })


    } catch (error) {
        
        res.json({
            estado: false,
            mensaje: 'Fallamos!'
        })

    }
});





module.exports = router;