const express = require("express");
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const db = new sqlite3.Database('dockerDemo.db');

const app = express();

app.post("/api/table", function (req,res){
    try {
        db.run("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL,country TEXT NOT NULL);")
        res.send(`DATABASE SUCCESFULLY CREATED`)
    }
    catch (err){
        console.log(err)
        res.send(`GOT AN ERROR - ${err}`)
    }
})

app.get("/api/users", function(req, res){

    try {
        db.all("SELECT * FROM users", (err, rows) => {
            if(err){
                return res.send(err)
            }
            return res.send(rows)
        })
    }catch (err){
        res.send(`GOT AN ERROR - ${err}`)
    }
});
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
    const id = req.params.id; // получаем id
    try {
        db.all(`SELECT * FROM users WHERE user_id = ${id}`, (err, rows) => {
            if(err){
                return res.send(err)
            }
            return res.send(rows)
        })
    }
    catch (err){
        res.send(`GOT AN ERROR - ${err}`)
    }
});
// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body){
        return res.sendStatus(400)}

    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPhone = req.body.phone;
    const userAddress = req.body.address;
    const userCountry = req.body.country;
    try {
        const stmt = db.prepare("INSERT INTO users (name, email, phone, address, country) VALUES(?, ?, ?, ?, ?)");
        stmt.run(userName, userEmail, userPhone, userAddress, userCountry);
        stmt.finalize();
        res.send("USER HAVE BEEN ADDED");
    }
    catch (err){
        console.log(err)
        res.send(`GOT AN ERROR - ${err}`)
    }
});
// удаление пользователя по id
app.delete("/api/users/:id", function(req, res){

    const id = req.params.id;
    try {
        db.run(`DELETE from users WHERE user_id = ${id}`)
        res.send('USER HAVE BEEN DELETED')
    }catch (err){
        res.send(`GOT AN ERROR - ${err}`)
    }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});