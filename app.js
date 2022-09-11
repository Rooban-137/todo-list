const express = require("express");
const bodyParser = require("body-parser");

const app = express(); 

let items = ["Buy Food","Cook Food","Eat Food","Again repeat"];
var workItems = {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine','ejs');

app.get("/",function(req,res)
{
    let today = new Date();
    let current = today.getDay();
    
    var day = "";

    let options = {
        weekday: "long",
        day: "numeric",
        month:"long",
    };

     day = today.toLocaleDateString("en-US",options);

    res.render("list", {listTitle : day, newListItems: items});
}
);
 app.post("/",function(req,res){

    
    let item = req.body.newItem;

    if (req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
        }
    else{
        items.push(item);
        res.redirect("/");
    }
 });

 app.get("/work",function(req,res){
    res.render("list",{listTitle: "work List", newListItems: workItems});
 });

app.listen(3000,function()
{
    console.log("Server is running on port 3000");
});