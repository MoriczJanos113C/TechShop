const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const {nanoid} = require('nanoid');
const mime = require('mime-types');
const { isAdmin } = require('./middlewares/isAdmin');
app.use(express.json());
app.use(cors());


app.use(express.static('./images'))
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null, './images')
    },
    filename: function (req, file, cb){
        let id = nanoid();
        let ext = mime.extension(file.mimetype);
        cb(null, `${id}.${ext}`);
    }
})
const upload = multer({ storage: storage })


//!!db szerkezet!!
//tábla                 (oszlopok())
//product - (cost(int), name(string), description(string)), image(blob)
//order - (contactInfo(object), (items(array))))
//user    - (username(string), password(string)), role((string))   


const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"techshop",
});


//PRODUCT operations
app.post('/products', /*isAdmin,*/  upload.single('file'), (req, res)=> {

    const cost = req.body.cost;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.filename;

    db.query(`INSERT INTO product (cost, name, description, image)  VALUES (?, ?, ?, ?)`, [cost, name, description, image], (err, result) => {
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

app.put('/products/:id',/*isAdmin,*/  upload.single('file'), async (req, res)=> {
    const cost= req.body.cost;
    const name = req.body.name;
    const description = req.body.description;
    //image holding mikor nem valasztunk ki kepet akk maradjon ami vlt kellesz még + az adatok ami adott produktnak van azokat se jeleniti meg a frontend mikro szerkesztesre katt van
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

app.delete('/deleteProduct/:id', /*isAdmin,*/ (req, res) => {
    db.query(`DELETE FROM product WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result);
        }else{
            res.send({message: "Not deleted any product"})
        }
    })
})

app.post('/review', async (req, res) => {

    
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    const description = req.body.description;
    const rating = req.body.rating;
    const username = req.body.username;

    db.query('INSERT INTO reviews (user_id, product_id, description, rating, username) VALUES (?, ?, ?, ?, ?)', [user_id, product_id, description, rating,username], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
            res.send({result, message: "REVIEW ADDED"});
        }
    });
    
});

app.get('/productReviews/:id', (req, res)=> {
    db.query("SELECT * FROM reviews WHERE product_id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any review for this product"})
        }
        
    });
});

app.delete('/deleteReview/:id', /*isAdmin,*/ (req, res) => {
    db.query(`DELETE FROM reviews WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result);
        }else{
            res.send({message: "Not deleted any review"})
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
                db.query("INSERT INTO user (username, password, role) VALUES (?, ?, 'normal')",[username, hashedPass, role], (err, result) => {
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


app.post('/checkout', async (req, res) => {
    console.log(req.body);
    const contactInfo = req.body.contactInfo;
    const items = req.body.items;
    const user_id = req.body.user_id;
    const username = req.body.username;
    
    //array, object tárolás dbben kéne
    const products = JSON.stringify({ products: items});
    const contactInfos = JSON.stringify({ contactInfos: contactInfo});
    db.query('INSERT INTO orders (user_id, username, contactInfo, items) VALUES (?, ?, ?, ?)', [user_id, username, contactInfos, products], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
            res.send(JSON.parse(products));
        }
    });
    
});

app.get('/orders', (req, res)=> {
    
    db.query("SELECT * FROM orders", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any orders"})
        }
    });
});

app.delete('/deleteOrder/:id', /*isAdmin,*/ (req, res) => {
    db.query(`DELETE FROM orders WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result);
        }else{
            res.send({message: "Not deleted any order"})
        }
    })
})



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

app.put('/users/:id',/*isAdmin,*/  upload.single('file'), async (req, res)=> {
    const username= req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const hashedPass = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

    db.query(`UPDATE user SET username = ?, password = ?, role = ? WHERE id = ${req.params.id}`, [username, hashedPass, role], (err, result) => {
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
app.delete('/deleteUser/:id', /*isAdmin,*/ (req, res) => {
    db.query(`DELETE FROM user WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result);
        }else{
            res.send({message: "Not deleted any user"})
        }
    })
})

app.get('/userOrders/:id', (req, res)=> {
    db.query("SELECT * FROM orders WHERE user_id = ?", req.params.id, (err, result) => {     
        if (result){
            console.log(result);
            res.send(result);
        }else{
            console.log(err)
            res.send({message: "Not found any order for this user"})
        }
        
    });
});

app.listen(8080, () => {
    console.log("running server");
});
