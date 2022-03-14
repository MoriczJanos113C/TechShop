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
    const image = req.file?.filename;
    //image holding mikor nem valasztunk ki kepet akk maradjon ami vlt kellesz még + az adatok ami adott produktnak van azokat se jeleniti meg a frontend mikro szerkesztesre katt van
    db.query(`UPDATE product SET cost = ?, name = ?, description = ?, image = ? WHERE id = ${req.params.id}`, [cost, name, description, image], (err, result) => {
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


app.post('/checkout', (req, res) => {
    console.log(req.body);
    const contactInfo = req.body.contactInfo;
    const items = req.body.items;
    
    //array, object tárolás dbben kéne
    const data = JSON.stringify({contactInfo : contactInfo, items: items});
    db.query('INSERT INTO orders (contactInfo, items) VALUES (?, ?)', [contactInfo, items], (err, result) => {
        if (err) throw err;
        console.log(req.body);
        if(result){
            res.send(JSON.parse(data));
        }
    });
    
});

app.listen(8080, () => {
    console.log("running server");
});
