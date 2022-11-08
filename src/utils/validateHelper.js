import { validationResult } from 'express-validator';

const validateResult = (req,res,next) =>{
    try{
        validationResult(req).throw();
        return next();
    }
    catch( err ){
        const data = err.array().map( err => {
            return {
                    message : err.msg,
                    parameter : err.param,
                    value : err.value
            }
        })

        res.status(403).send({
            status : "error",
            message : "Validation's error",
            playload : { data : data } 
        })
    }
}

export default validateResult;



// 200 “OK” – La respuesta para una solicitud HTTP exitosa. El resultado dependerá del tipo de solicitud.
// 201 “Created” – La solicitud se cumplió y el servidor creó un nuevo recurso.
// 204 “No Content” – El servidor cumplió con la solicitud pero no devolverá ningún contenido.

// 400 “Bad Request” – El servidor no puede devolver una respuesta válida debido a un error del lado del cliente. Las causas comunes son URL solicitadas con formato incorrecto, enrutamiento de solicitud engañoso, tamaño de archivo grande, etc.
// 403 “Forbidden” – El error indica que el servidor deniega el acceso a un usuario que no tiene permiso para acceder a los recursos. Este error es similar al código HTTP 401, pero la diferencia es que en este caso, se conoce la identidad del usuario.
// 409 “Conflict” – Este error ocurre cuando una solicitud no se puede procesar debido a un conflicto en el estado actual del recurso en el servidor. Un ejemplo de este error es cuando se envían múltiples ediciones del mismo archivo al servidor, y las ediciones entran en conflicto entre sí.
// 422 “Unprocessable Entity” – La solicitud del cliente está bien formada pero contiene errores semánticos que impiden que el servidor procese una respuesta.