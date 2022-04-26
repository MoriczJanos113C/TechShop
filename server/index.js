//modules
const express = require('express');//express
const app = express(); //express variable
const cors = require('cors');//react connection
const mysql = require('mysql');//database connection
const jwt = require('jsonwebtoken');//giving a token to the user
const bcrypt = require('bcryptjs');//crypting a password for example
const multer = require('multer'); //for handling multipart/form-data
const {nanoid} = require('nanoid'); //a tiny, secure, URL-friendly, unique string ID generator for JavaScript
const mime = require('mime-types'); //javascript content-type utility

//It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//enable the express server to respond to preflight requests
app.use(cors());

//setting up where to upload the files
app.use(express.static('./images'));

//image storage
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

//creating database connection
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"techshop",
});


//will create a product in multipart form data
app.post('/products', upload.single('file'), (req, res)=> {

    const cost = req.body.cost;
    const category = req.body.category;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.filename;

    
    db.query(`INSERT INTO product (cost, category, name, description, image)  VALUES (?, ?, ?, ?, ?)`, [cost, category, name, description, image], (err, result) => {
        if (err) throw err;
        if(result){
            res.send(result)
        }else{
            res.send({message: "Not added a product"})
            }
    });
});

//will giving all the products
app.get('/products', (req, res)=> {
    
    db.query("SELECT * FROM product", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any product"})
        }
    });
});

//will update a product in multi part form data
app.put('/products/:id', upload.single('file'), async (req, res)=> {
    const cost= req.body.cost;
    const category= req.body.category;
    const name = req.body.name;
    const description = req.body.description;
    console.log(req)
    const image = req.body.file ? req.body.file : req.file.filename;
    

    
    db.query(`UPDATE product SET cost = ?, category = ?, name = ?, description = ?, image = ? WHERE id = ${req.params.id}`, [cost, category, name, description, image], (err, result) => {
        if(err) throw err;
       
        if(result){
            res.send({message: "Product updated"})
        }else{
            res.send({message: "Product not updated"})
            }
            

        }
    );
});

//will giving one product
app.get('/products/product/:id', (req, res)=> {
    db.query("SELECT * FROM product WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any product"})
        }
        
    });
});

//will delete one product
app.delete('/deleteProduct/:id', (req, res) => {
    db.query(`DELETE FROM product WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send({message: "Deleted a product"});
        }else{
            res.send({message: "Not deleted any product"})
        }
    })
})

//will create a review
app.post('/review', async (req, res) => {

    
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    const description = req.body.description;
    const rating = req.body.rating;
    const username = req.body.username;

    db.query('INSERT INTO reviews (user_id, product_id, description, rating, username) VALUES (?, ?, ?, ?, ?)', [user_id, product_id, description, rating,username], (err, result) => {
        if (err) throw err;
        if(result){
            res.send({message: "Review added"});
        }
        else{
            res.send({message: "Review not added"});
        }
    });
    
});

//will give a review/reviews for a product
app.get('/productReviews/:id', (req, res)=> {
    db.query("SELECT * FROM reviews WHERE product_id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any review for this product"})
        }
        
    });
});

//will delete a review
app.delete('/deleteReview/:id', (req, res) => {
    db.query(`DELETE FROM reviews WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send({message: "Deleted a review"});
        }else{
            res.send({message: "Not deleted any review"})
        }
    });
});

//will create an entry
app.post('/entries', (req, res)=> {
    const user_id = req.body.user_id;
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;

    db.query(`INSERT INTO entries (user_id, username, title, description)  VALUES (?, ?, ?, ?)`, [user_id, username, title, description], (err, result) => {
        if (err) throw err;
        if(result){
        res.send({message: "Entry added"});
        }
        else{
            res.send({message: "Entry not added"});
        }
    });
});

//will update an entry
app.put('/entries/:id', async (req, res)=> {
    const title = req.body.title;
    const description = req.body.description;
    
    db.query(`UPDATE entries SET title = ?, description = ? WHERE id = ${req.params.id}`, [title, description], (err, result) => {
        if(err) throw err;
        
        if(result){
            res.send({message: "Entry updated"})
        }else{
            res.send({message: "Entry not updated"})
            }
            

        }
    );
});

//will give all the entries
app.get('/entries', (req, res)=> {
    db.query("SELECT * FROM entries", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any entries"})
        }
    });
});

//will give one entry
app.get('/entries/:id', (req, res)=> {
    db.query("SELECT * FROM entries WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any entries"})
        }
        
    });
});

//will delete an entry
app.delete('/deleteEntries/:id', (req, res) => {
    db.query(`DELETE FROM entries WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send({message: "Deleted an entry"});
        }else{
            res.send({message: "Not deleted any entry"})
        }
    })
})


//will register a user with hashed password
//will check if the username or email is already taken
app.post('/register',async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const hashedPass = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

    db.query("SELECT * FROM user WHERE username = ? OR email = ?", [username, email], (err, result)=>{
        if (err) throw err;
               
        if(result.length === 0){
            db.query("INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, 'normal')",[username, email, hashedPass, role], (err, Rresult) => {
                if (err) throw err
                res.status(201).send();
            });
            
        }else{
            res.send({message: "Felhasználónév vagy email foglalt"});
        }    
    })
});

//will login in a user
//will check if the password or username is correct
app.post('/login', (req, res)=> {
    const {username, password} = req.body;

    db.query("SELECT * FROM user WHERE username = ?",
    [username], 
    (err, result) => {
        if (err) throw err;
        
        
        if (result.length > 0) {
            const token = jwt.sign(username, "secret-password");
            if(bcrypt.compareSync(password, result[0].password)){
                res.send(JSON.stringify({token : token, user: result[0]}))
            }
            else{
                res.send({message: "Rossz jelszó"})
                }       
            }else{
                res.send({message: "Rossz felhasználónév"});
            }
        
    }
    );
});

//will create an order what the user did
app.post('/checkout', async (req, res) => {
    
    const contactInfo = req.body.contactInfo;
    const items = req.body.items;
    const user_id = req.body.user_id;
    const username = req.body.username;
    const email = req.body.email;
    const totalCost = req.body.totalCost;
    const itemName = req.body.itemName;

    const products = JSON.stringify(items);
    const contactInfos = JSON.stringify(contactInfo);
    const itemsName = JSON.stringify(itemName);
    db.query('INSERT INTO orders (user_id, username, email, contactInfo, items, itemName, totalCost) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id, username, email, contactInfos, products, itemsName, totalCost], (err, result) => {
        if (err) throw err;
        
        if(result){
            res.send({message: "Checkout confirmed"});
        }
        else{
            res.send({message: "Checkout failed"});
        }
    });
    
});

//will give all the orders
app.get('/orders', (req, res)=> {
    db.query("SELECT * FROM orders", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any order"})
        }
    });
});

//will delete an order
app.delete('/deleteOrder/:id', (req, res) => {
    db.query(`DELETE FROM orders WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send({message: "Deleted an order"});
        }else{
            res.send({message: "Not deleted any order"})
        }
    });
});

//will give all the users
app.get('/users', (req, res)=> {
    
    db.query("SELECT * FROM user", (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any user"})
        }
    });
});

//will give one user
app.get('/users/:id', (req, res)=> {
    db.query("SELECT * FROM user WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found the user"})
        }
        
    });
});

//will update one user
app.put('/users/:id', async (req, res)=> {
    const username= req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const hashedPass = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

    db.query(`UPDATE user SET username = ?, password = ?,email = ?, role = ?  WHERE id = ${req.params.id}`, [username, hashedPass,email, role ], (err, result) => {
        if(err) throw err;
        if(result){
            res.send({message: "User updated"})
        }else{
            res.send({message: "User not updated"})
            }

        }
    );
});

//will delete one user
app.delete('/deleteUser/:id', (req, res) => {
    db.query(`DELETE FROM user WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            res.send({message: "Deleted a user"});
        }else{
            res.send({message: "Not deleted any user"})
        }
    });
});

//will give the user's orders
app.get('/usersOrder/:id', (req, res)=> {
    db.query(`SELECT * FROM orders WHERE user_id = ${req.params.id}`, (err, result) => {
        if (result){
            res.send(result);
        }else{
            res.send({message: "Not found any order for this user"})
        }
    });
});

app.listen(8080, () => {
    console.log("running server");
});