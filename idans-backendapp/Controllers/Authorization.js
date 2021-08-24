const {redisClient} = require('../server');

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('Unauthorized');
    }
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).send('Unauthorized');
        }

        return next();
    });
};
const requireAuthAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || (req.params.id.toString() !== '3')) {
        return res.status(401).send('Unauthorized');
    }
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).send('Unauthorized');
        }
        return next();
    });
};
module.exports = {
    requireAuth:requireAuth,
    requireAuthAdmin:requireAuthAdmin
}