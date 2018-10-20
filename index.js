const mongodb = require("mongodb");
const express = require("express");
const bp = require("body-parser");

const app = express();
app.set("view engine", 'ejs');
app.use(bp.json());
app.use(bp.urlencoded({extended: false}))
const url = "mongodb://localhost:27017/";

const client = new mongodb.MongoClient(url);


function initApp(db){

    const todos = db.collection("todos");

    app.get("/",(req,res) => {
        todos.find({}).toArray((err,todoArr) => {
            res.render('index',{todos: todoArr});
        });
    })

    app.get("/change/:id/:done", (req,res) => {
        todos.updateOne({'_id' : new mongodb.ObjectId(req.params.id)}, {$set: {done: req.params.done === "false"}}, (err, obj) => {
            res.redirect("/");
        })
    })

    app.get("/delete/:id", (req,res) => {
        console.log(req.params.id);
        todos.deleteOne({_id: new mongodb.ObjectId(req.params.id) }, (err, obj) => {
            res.redirect("/");
        })
    })
    app.post("/new", (req, res) => {
        todos.insertOne({ text: req.body.text, done: !!req.body.done }, (err, result) => {
            res.redirect("/");
        })
    });
    app.listen(3000);
    

}

client.connect((err, db) => {
    initApp(db.db("todo-list"));
});