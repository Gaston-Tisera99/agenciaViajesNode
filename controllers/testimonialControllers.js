import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) =>{

    //validar...

    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){ 
        errores.push({mensaje: 'El Nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje esta vacio'});
    }

    if(errores.length > 0){
        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        //mostrar la vista con errores
        res.render('testimoniales',{
            pagina: 'testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        //almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}


export {
    guardarTestimonial
}