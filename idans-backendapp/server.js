const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
    redisClient
}

const shoppingCart = require('./Controllers/ShoppingCart');
const signin = require('./Controllers/Signin');
const register = require('./Controllers/Register');
const auth = require('./Controllers/Authorization')

// You will want to update your host to the proper address in production



const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'qwerasdf',
        database : 'ex3'
    }
});

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.put('/signin', auth.requireAuth, (req, res) =>  signin.signedin(req,res,db));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) =>  signin.profile(req,res,db));
app.get('/allprofile/:id',auth.requireAuthAdmin, (req, res) =>  signin.allProfiles(req,res,db));
app.post('/shoppingcart',auth.requireAuth, (req, res) => shoppingCart.handleShoppingCart(req,res,db));
app.put('/shoppingcart1',auth.requireAuth, (req, res) => shoppingCart.handleShoppingCart2(req,res,db));
app.post('/signout',auth.requireAuth, (req, res) => signin.signout(req,res,db));


app.listen(3000, () => {
    console.log("apps running");
})
