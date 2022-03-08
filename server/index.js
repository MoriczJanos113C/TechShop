const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any product"})
        }
    });
});

app.post('/register', async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const hashedPass = await bcrypt.hashSync(password,10)
    console.log(req.body.password+'\n'+hashedPass)

    db.query("SELECT * FROM user WHERE username = ?", [username], (err, result)=>{
        if (err) return err;
            if(result.length === 0){
                db.query("INSERT INTO user (username, password, role) VALUES (?, ?, '')",[username, hashedPass, role], (err, result) => {
                    if (err) {
                        res.send({err: err})
                    }
                        res.send({result, message: "REGISTERED"});
                    }
                );
            }else{
                    res.send({message: "username is exist"});
                    }    
    })
});

app.post('/login', (req, res)=> {

    const {username, password} = req.body;

    db.query("SELECT * FROM user WHERE username = ?",
    [username], 
    (err, result) => {
        if(err){
            res.send({err: err});
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, function (err, Logresult) {
                if(err) throw err;
                if(Logresult){
                    res.send(result);
                }else{
                    res.send(result);
                }
            })
    }
        else{
            res.send({message: "Not good username"});
        }
    }
    );
});

app.put('/products/:id', async (req, res)=> {
    const {cost, name, description} = req.body;

    db.query(`UPDATE product SET cost = ?, name = ?, description = ? WHERE id = ${req.params.id}`, [cost, name, description], (err, result) => {
        if(err) throw err;
        if(result){
            console.log(result);
            res.send({message: "Saved"})
        }else{
            res.send({message: "Not saved"})
            }

        }
    );
});

app.get('/products/:id', (req, res)=> {
    db.query("SELECT * FROM product WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any product"})
        }
        
    });
});

app.delete('/deleteProduct/:id', (req, res) => {
    db.query(`DELETE FROM product WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send({message: "Not deleted any product"})
        }
    })
})

app.listen(8080, () => {
    console.log("running server");
});