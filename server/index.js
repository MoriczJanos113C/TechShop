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
        if (err) throw err;
        console.log(req.body);//postmanben teszthez verifikálni, hogy tenyleg mukodik-e
        if(result){
        res.send(result);
        }
    });
});
//getting all prod 
app.get('/products', (req, res)=> {

    /*const authorization = req.headers.authorization;
    console.log(authorization);
    const token = authorization.substring(7);
    console.log(token);
    try{
        const user = jwt.verify(token, "my-super-secret-password");
        console.log("user", user);
        if(user.role !== 'admin'){
            return res.status(403).send("authorization error");
        }
    }catch(err){
        res.status(403).send("authorization error");
    }*/
    
    

    db.query("SELECT * FROM product", (err, result) => {
        if (err) throw err;
        //console.log(req.body); //postmanben teszthez verifikálni, hogy tenyleg mukodik-e
        if(result){
        res.send(result);
        }
    });
});

app.post('/register', (req, res)=> {

    const username = req.body.username
    const password = req.body.password
    const role = req.body.role;

    db.query("INSERT INTO user (username, password, role) VALUES (?, ?, 'user')",[username,password, role], (err, result) => {
        if (err) throw err;
    });
});

app.post('/login', (req, res)=> {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM user WHERE username = ? AND password = ?",[username,password], (err, result) => {
        if(err) throw err;
        const token = jwt.sign(username, "my-super-secret-password");
        res.json({
            token,
            user: username
        
    }); 
}) 
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