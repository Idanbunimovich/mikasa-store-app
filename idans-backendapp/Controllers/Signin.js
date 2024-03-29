const jwt = require('jsonwebtoken');

// Redis Setup
const {redisClient} = require('../server')
console.log(redisClient)

const signToken = (username) => {
    const jwtPayload = { username };
    return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const delToken = (key) => Promise.resolve(redisClient.del(key));

const createSession = async (user) => {
    const { email, id } = user;
    const token = signToken(email);
    console.log(token)
    await setToken(token, id)
    return { success: 'true', userId: id, token, user }
};

const handleSignin = (db, bcrypt, req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                return Promise.reject('wrong credentials');
            }
        })
        .catch(err => err)
}

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).send('Unauthorized');
        }

        return res.json({id: reply})
    });
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const {authorization} = req.headers;
    console.log(authorization)
    if (authorization !== null && authorization !== undefined) {
        getAuthTokenId(req, res)

    } else {
        handleSignin(db, bcrypt, req, res)
            .then(data => {
                    console.log({id: data.id, email: data.email})
                    if (data.id && data.email) {
                        console.log('hi')
                        createSession(data).then(session => {
                            console.log({session})
                            res.json(session)
                        })

                    }
                }
            ).catch(err => res.status(400).json(err));
    }
}


const handleProfile = (req,res,db) => {
const { id } = req.params;
db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}
const signedin = (req,res,db) => {
    const {id } = req.body;
    db('users')
        .where({id: id})
        .update({isloggedin: true})
        .then(() => {
            console.log("hi")
            res.json("success");
        }).catch(err => res.status(400).json('unable to get entries'))
}
const signout = (req,res,db) => {
    const {id} = req.body;
    const { authorization } = req.headers;
    delToken(authorization).then(()=> { db('users')
        .where({id: id})
        .update({isloggedin: false})
        .then(() => {
            res.json("success");
        })
}).catch(err => res.status(400).json('unable to get entries'))
}
const handleAllProfile = (req,res,db) => {
    db.select().from('users')
        .then(user => {
            if (user.length) {
                res.json(user)
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    profile: handleProfile,
    allProfiles:handleAllProfile,
    signinAuthentication: signinAuthentication,

    signout:signout,
    signedin:signedin
}
