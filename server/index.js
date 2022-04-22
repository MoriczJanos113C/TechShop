const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const {nanoid} = require('nanoid');
const mime = require('mime-types');
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

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"techshop",
});


//PRODUCT operations
app.post('/products', upload.single('file'), (req, res)=> {

    const cost = req.body.cost;
    const category = req.body.category;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.filename;

    
    db.query(`INSERT INTO product (cost, category, name, description, image)  VALUES (?, ?, ?, ?, ?)`, [cost, category, name, description, image], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
            res.send(result, {message: "Added a product"});
        }
        else{
            res.send({result, message: "product not added"});
        }
    });
});

app.get('/products', (req, res)=> {
    
    db.query("SELECT * FROM product", (err, result) => {
        if (result){
            res.send(result, {message: "Found all the products"});
        }else{
            res.send({message: "Not found any product"})
        }
    });
});


app.put('/products/:id', upload.single('file'), async (req, res)=> {
    const cost= req.body.cost;
    const category= req.body.category;
    const name = req.body.name;
    const description = req.body.description;
    console.log(req)
    const image = req.body.file ? req.body.file : req.file.filename;
    

    
    db.query(`UPDATE product SET cost = ?, category = ?, name = ?, description = ?, image = ? WHERE id = ${req.params.id}`, [cost, category, name, description, image], (err, result) => {
         console.log(req.file)
        if(err) throw err;
       
        if(result){
            console.log(result);
            res.send(result, {message: "Saved"})
        }else{
            res.send({message: "Not saved"})
            }
            

        }
    );
});


app.get('/products/product/:id', (req, res)=> {
    db.query("SELECT * FROM product WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result, {message: "Found a product"});
        }else{
            res.send({message: "Not found any product"})
        }
        
    });
});

app.delete('/deleteProduct/:id', (req, res) => {
    db.query(`DELETE FROM product WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result, {message: "Deleted a product"});
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
            res.send(result, {result, message: "Review added"});
        }
        else{
            res.send({result, message: "Review not added"});
        }
    });
    
});

app.get('/productReviews/:id', (req, res)=> {
    db.query("SELECT * FROM reviews WHERE product_id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result, {message: "Found a review for the product"});
        }else{
            res.send({message: "Not found any review for this product"})
        }
        
    });
});

app.delete('/deleteReview/:id', (req, res) => {
    db.query(`DELETE FROM reviews WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result, {message: "Deleted a review"});
        }else{
            res.send({message: "Not deleted any review"})
        }
    })
})


//ENTRIES OPERATIONS
app.post('/entries', (req, res)=> {
    const user_id = req.body.user_id;
    const username = req.body.username;
    const title = req.body.title;
    const description = req.body.description;

    db.query(`INSERT INTO entries (user_id, username, title, description)  VALUES (?, ?, ?, ?)`, [user_id, username, title, description], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
        res.send(result, {message: "Entry added"});
        }
        else{
            res.send({result, message: "Entry not added"});
        }
    });
});


app.put('/entries/:id', async (req, res)=> {
    const title = req.body.title;
    const description = req.body.description;
    console.log(title)
    
    db.query(`UPDATE entries SET title = ?, description = ? WHERE id = ${req.params.id}`, [title, description], (err, result) => {
        if(err) throw err;
        
        if(result){
            console.log(result);
            res.send(result, {message: "Entry saved"})
        }else{
            res.send({message: "Entry not saved"})
            }
            

        }
    );
});

app.get('/entries', (req, res)=> {
    db.query("SELECT * FROM entries", (err, result) => {
        if (result){
            res.send(result, {message: "Found all the entry"});
        }else{
            res.send({message: "Not found any entries"})
        }
    });
});

app.get('/entries/:id', (req, res)=> {
    db.query("SELECT * FROM entries WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result, {message: "Found an entry"});
        }else{
            res.send({message: "Not found any entries"})
        }
        
    });
});





app.delete('/deleteEntries/:id', (req, res) => {
    db.query(`DELETE FROM entries WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send({message: "Deleted an entry"});
        }else{
            res.send({message: "Not deleted any entries"})
        }
    })
})


//USER OPERATIONS
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

app.post('/login', (req, res)=> {
    const {username, password, role} = req.body;

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
                res.send({message: "Rossz jelszo"})
                }       
            }else{
                res.send({message: "Rossz felhasználó"});
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
    const email = req.body.email;
    const totalCost = req.body.totalCost;
    const itemName = req.body.itemName;

    const products = JSON.stringify(items);
    const contactInfos = JSON.stringify(contactInfo);
    const itemsName = JSON.stringify(itemName);
    db.query('INSERT INTO orders (user_id, username, email, contactInfo, items, itemName, totalCost) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id, username, email, contactInfos, products, itemsName, totalCost], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
            res.send(result, {message: "Checkout confirmed"});
        }
        else{
            res.send({result, message: "Checkout failed"});
        }
    });
    
});

app.get('/orders', (req, res)=> {
    
    db.query("SELECT * FROM orders", (err, result) => {
        if (result){
            res.send(result, {message: "Orders found"});
        }else{
            res.send({message: "Not found any order"})
        }
    });
});

app.delete('/deleteOrder/:id', (req, res) => {
    db.query(`DELETE FROM orders WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send(result, {message: "Deleted an order"});
        }else{
            res.send(result, {message: "Not deleted any order"})
        }
    })
})



app.get('/users', (req, res)=> {
    
    db.query("SELECT * FROM user", (err, result) => {
        if (result){
            res.send(result, {message: "Users found"});
        }else{
            res.send({message: "Not found any user"})
        }
    });
});


app.get('/users/:id', (req, res)=> {
    db.query("SELECT * FROM user WHERE id = ?", req.params.id, (err, result) => {
        if (result){
            res.send(result, {message: "User found"});
        }else{
            res.send({message: "Not found the user"})
        }
        
    });
});

app.put('/users/:id', async (req, res)=> {
    const username= req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const hashedPass = bcrypt.hashSync(password,bcrypt.genSaltSync(10))

    db.query(`UPDATE user SET username = ?, password = ?, role = ? email = ? WHERE id = ${req.params.id}`, [username, hashedPass, role, email], (err, result) => {
        if(err) throw err;
        if(result){
            console.log(result);
            res.send({message: "User updated"})
        }else{
            res.send({message: "User not updated"})
            }

        }
    );
});

app.delete('/deleteUser/:id', (req, res) => {
    db.query(`DELETE FROM user WHERE id = ${req.params.id}`,(err, result) => {
        if(result){
            console.log(result)
            res.send({message: "Deleted a user"});
        }else{
            res.send({message: "Not deleted any user"})
        }
    })
})

app.get('/usersOrder/:id', (req, res)=> {
    db.query(`SELECT * FROM orders WHERE user_id = ${req.params.id}`, (err, result) => {
        if (result){
            console.log(result);
            res.send(result, {message: "Found an order for the user"});
        }else{
            console.log(err)
            res.send({message: "Not found any order for this user"})
        }
    });
});

app.listen(8080, () => {
    console.log("running server");
});
