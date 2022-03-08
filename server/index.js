const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


const { Users } = require("./models");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
app.use(cookieParser());

app.use(express.json());
app.use(cors());



//!!db szerkezet!!
//tábla                 (oszlopok())
//product - (cost(int), name(string), description(string))
//user    - (username(string), password(string)), role((string))   
//
//
//

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"techshop",
});

//new product (create product page)
app.post('/products', (req, res)=> {

    const cost = req.body.cost;
    const name = req.body.name;
    const description = req.body.description;

    

    db.query("INSERT INTO product (cost, name, description)  VALUES (?, ?, ?)", [cost, name, description], (err, result) => {
        
        const authorization = req.headers.authorization;
        const token = authorization.substring(7);
        try{
            const user = jwt.verify(token, "my-super-secret-password");
            if(user.role !== "admin") {
                return res.status(403).send('author error');
            }
        } catch{
            res.status(403).send('author error');
        }
    });
});
//getting all prod 
app.get('/products', (req, res)=> {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) throw err;
        //console.log(req.body); //postmanben teszthez verifikálni, hogy tenyleg mukodik-e
        if(result){
        res.send(result);
        }
    });
});

app.post('/register', (req, res)=> {

    const { username, password } = req.body;
    bcrypt.hash(password, 12, function(err,hash){
    Users.create({
      username: username,
      password: hash,
    })
      .then(() => {
        res.json("USER REGISTERED");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  
    const dbPassword = user.password;
    console.log(dbPassword);
    bcrypt.compare(password, dbPassword, function(err, match) {
        console.log(match)
        console.log(err)
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });
  
        res.json("LOGGED IN");
      }
    });
  });


//updating prod
app.put('/products/:id', (req, res)=> {
    const {cost, name, description, id} = req.body;

    db.query("UPDATE product SET cost = ?, name = ?, description = ? WHERE id = ?", [cost, name, description, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("affected rows"+result.affectedRows);
        }
    }
    );
});
//deleting prod
app.delete('/products/:id', (req, res) => {
    db.query("DELETE FROM product WHERE id=?", req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//getting 1 prod with id
app.get('/products/:id', (req, res)=> {
    db.query("SELECT * FROM product WHERE id = ?", req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(8080, () => {
    console.log("running server");
});