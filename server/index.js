const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors());

//!!db szerkezet!!
//tábla                 (oszlopok())
//product - (cost(int), name(string), description(string))
//user    - (username(string), password(string))    
//
//
//

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"techshop",
});

//uj product felvevése (create product oldalhoz)
app.post('/products', (req, res)=> {

    const cost = req.body.cost;
    const name = req.body.name;
    const description = req.body.description;

    db.query("INSERT INTO product (cost, name, description)  VALUES (?, ?, ?) ", [cost, name, description], (err, result) => {
        if (err) throw err;
        console.log(req.body);//postmanben teszthez verifikálni, hogy tenyleg mukodik-e
        if(result){
        res.send(result);
        }
    });
});

app.get('/products', (req, res)=> {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) throw err;
        console.log(req.body);//postmanben teszthez verifikálni, hogy tenyleg mukodik-e
        if(result){
        res.send(result);
        }
    });
});

app.post('/register', (req, res)=> {

    const username = req.body.username
    const password = req.body.password


    db.query("INSERT INTO user (username, password) VALUES (?, ?)",[username,password], (err, result) => {
        if (err) throw err;
    });
});

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;


    db.query("SELECT * FROM users WHERE username = ? AND password = ?",[username,password], (err, result) => {
        if(err){
            res.send({err: err});
        }
        if (result.length > 0) {
            res.send(result);
        }
        else{
            res.send({message: "Rossz felhasználónév jelszó kombináció"});
        }
    }
    );
});




app.listen(8080, () => {
    console.log("running server");
});