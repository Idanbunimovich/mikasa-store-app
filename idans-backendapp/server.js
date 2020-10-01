const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const shoppingCart = require('./Controllers/ShoppingCart');
const signin = require('./Controllers/Signin');
const register = require('./Controllers/Register');
const auth = require('./Controllers/Authorization')


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
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id',auth.requireAuth, (req, res) =>  signin.profile(req,res,db));
app.get('/allprofile/:id',auth.requireAuthAdmin, (req, res) =>  signin.allProfiles(req,res,db));
app.post('/shoppingcart',auth.requireAuth, (req, res) => shoppingCart.handleShoppingCart(req,res,db));
app.put('/shoppingcart1',auth.requireAuth, (req, res) => shoppingCart.handleShoppingCart2(req,res,db));


app.listen(3000, () => {
    console.log("apps running");
})
