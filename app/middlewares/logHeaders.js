// filepath: /home/jmro/Documentos/repositorios/secretary-backend/app/middlewares/logHeaders.js
const logHeaders = (req, res, next) => {
  console.log(req.headers);
  next();
};

export default logHeaders;