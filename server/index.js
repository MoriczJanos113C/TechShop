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
//product - (cost(int), name(string), description(string)), image(blob)
//user    - (username(string), password(string)), role((string))   
//news    - (title(string), thePost(string), someDescription(string))
//supplier - (name(string), (fromCountry(String), telephone(string), productsBrand(string))
//

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"techshop",
});


//PRODUCT operations
app.post('/products', (req, res)=> {

    const cost = req.body.cost;
    const name = req.body.name;
    const description = req.body.description;

    db.query("INSERT INTO product (cost, name, description)  VALUES (?, ?, ?) ", [cost, name, description], (err, result) => {
        if (err) throw err;
        console.log(req.body);
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

app.put('/products/:id', async (req, res)=> {
    const cost= req.body.cost;
    const name = req.body.name;
    const description = req.body.description;

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

app.get('/products/product/:id', (req, res)=> {
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
            console.log(result)
            res.send(result);
        }else{
            res.send({message: "Not deleted any product"})
        }
    })
})


//USER OPERATIONS
app.post('/register', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const hashedPass = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

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
    const {username, password, role} = req.body;

    db.query("SELECT * FROM user WHERE username = ?",
    [username], 
    (err, result) => {
        if(err){
            res.send({err: err});
        }
        
        if (result.length > 0) {
            const token = jwt.sign(username, "secret-password");
            if(bcrypt.compareSync(password, result[0].password)){
                res.send(JSON.stringify({token : token, user: result[0]}))
            }
            else{
                res.send("hiba")
                }       
            }
        else{
            res.send({message: "Not good username"});
        }
    }
    );
});

app.get('/users', (req, res)=> {
    
    db.query("SELECT * FROM user", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any user"})
        }
    });
});

app.get('/users/:id', (req, res)=> {
    db.query("SELECT * FROM user WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any user"})
        }
        
    });
});

app.put('/users/:id', async (req, res)=> {
    const username= req.body.username;
    const password = req.body.password;

    db.query(`UPDATE user SET username = ?, password = ?, role = ? WHERE id = ${req.params.id}`, [username, password], (err, result) => {
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

app.delete('/usersDelete/:id', (req, res) => {
    db.query(`DELETE FROM user WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send({message: "Not deleted any user"})
        }
    })
})

//ENTRIES operations
app.post('/news', (req, res)=> {

    const title = req.body.title;
    const thePost = req.body.thePost;
    const someDescription = req.body.someDescription;

    db.query("INSERT INTO news (title, thePost, someDescription)  VALUES (?, ?, ?) ", [title, thePost, someDescription], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
        res.send(result);
        }
    });
});

app.get('/news', (req, res)=> {
    
    db.query("SELECT * FROM news", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any news"})
        }
    });
});

app.put('/news/:id', async (req, res)=> {
    const title = req.body.title;
    const thePost = req.body.thePost;
    const someDescription = req.body.someDescription;

    db.query(`UPDATE news SET title = ?, thePost = ?, someDescription = ? WHERE id = ${req.params.id}`, [title, thePost, someDescription], (err, result) => {
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

app.get('/news/:id', (req, res)=> {
    db.query("SELECT * FROM news WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any news"})
        }
        
    });
});

app.delete('/deleteNews/:id', (req, res) => {
    db.query(`DELETE FROM news WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send({message: "Not deleted any news"})
        }
    })
})


//Suppliers operations
app.post('/suppliers', (req, res)=> {

    const name = req.body.name;
    const telephone = req.body.telephone;
    const fromCountry = req.body.fromCountry;
    const productsBrand = req.body.productsBrand;

    db.query("INSERT INTO suppliers (name, telephone, fromCountry, productsBrand)  VALUES (?, ?, ?, ?) ", [name, telephone, fromCountry, productsBrand], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
        res.send(result);
        }
    });
});

app.get('/suppliers', (req, res)=> {
    
    db.query("SELECT * FROM suppliers", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any supplier"})
        }
    });
});

app.put('/suppliers/:id', async (req, res)=> {
    const name = req.body.name;
    const telephone = req.body.telephone;
    const fromCountry = req.body.fromCountry;
    const productsBrand = req.body.productsBrand;

    db.query(`UPDATE suppliers SET name = ?, telephone = ?, fromCountry = ?, productsBrand = ? WHERE id = ${req.params.id}`, [name, telephone, fromCountry, productsBrand], (err, result) => {
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

app.get('/suppliers/:id', (req, res)=> {
    db.query("SELECT * FROM suppliers WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any supplier"})
        }
        
    });
});

app.delete('/deleteSupplier/:id', (req, res) => {
    db.query(`DELETE FROM suppliers WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send({message: "Not deleted any supplier"})
        }
    })
})


//Orders operations MINTA, még nem tervezett tábla
app.post('/orders', (req, res)=> {

    const name = req.body.name;
    const telephone = req.body.telephone;
    const fromCountry = req.body.fromCountry;
    const productsBrand = req.body.productsBrand;

    db.query("INSERT INTO suppliers (name, telephone, fromCountry, productsBrand)  VALUES (?, ?, ?, ?) ", [name, telephone, fromCountry, productsBrand], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
        res.send(result);
        }
    });
});

app.get('/orders', (req, res)=> {
    
    db.query("SELECT * FROM suppliers", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any supplier"})
        }
    });
});

app.put('/orders/:id', async (req, res)=> {
    const name = req.body.name;
    const telephone = req.body.telephone;
    const fromCountry = req.body.fromCountry;
    const productsBrand = req.body.productsBrand;

    db.query(`UPDATE suppliers SET name = ?, telephone = ?, fromCountry = ?, productsBrand = ? WHERE id = ${req.params.id}`, [name, telephone, fromCountry, productsBrand], (err, result) => {
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

app.get('/orders/:id', (req, res)=> {
    db.query("SELECT * FROM suppliers WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any supplier"})
        }
        
    });
});

app.delete('/deleteOrders/:id', (req, res) => {
    db.query(`DELETE FROM suppliers WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send({message: "Not deleted any supplier"})
        }
    })
})

app.listen(8080, () => {
    console.log("running server");
});
