const checkOrigin = (req, res, next) => {
    console.log(req.headers);
    //aqui manejar la logica de la validacion de token
    
    next();
    }

    export default checkOrigin;