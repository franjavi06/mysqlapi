const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    //user-token
    if (!req.headers['authorization']) {
        return res.json({error: 'Necesitas incluir Authorization en la cabecera'});
    }

    const userToken = req.headers['authorization'].split(" ")[1];
    console.log(req.headers['authorization']);
    console.log(userToken);
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'frase secreta');
    } catch (err) {
        return res.json({error: 'El token es incorrecto'});
    }

    if (payload.expiredAt < moment().unix()) {
        return res.json({error: 'El token ha expirado'});
    }

    req.usuarioId = payload.usuarioId;

    next();
}

module.exports = {
    checkToken: checkToken
}