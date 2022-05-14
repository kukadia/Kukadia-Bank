var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve satic files from public directory
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function(req,res){
    dal.create(req.params.name,req.params.email,req.params.password)
    .then((user) => {
        console.log(user);
        res.send(user);
    }); 
});

//login user
app.get('/account/login/:email/:password', function(req,res){
    dal.find(req.params.email).then((usr)=>{
        console.log("usr", usr);
            res.send(usr);
        });
});

//deposit
app.get('/deposit/:email/:depositAmt', function(req,res){

    // var newBal=0;
   dal.findOne(req.params.email).then((usr)=>{
    //    console.log("FindOne (usr)", usr);
    //     newBal=Number(usr.balance)+Number(req.params.depositAmt);
    //     // console.log(`User: ${usr.name} and new balance is: ${newBal+Number(req.params.depositAmt)}`)
    //     console.log(`newBal: ${req.params.email}, ${newBal}`)
    var bal = Number(usr.balance)+Number(req.params.depositAmt);

    dal.update(usr.email,bal)
    .then((user) => {
        
        res.send(user);
        
    }); 
    console.log(`Final update:`, usr);
    });

   
    // res.send({
    //     email: req.params.email,
    //     balance: req.params.depositAmt,
    // });
});

//withdraw
app.get('/withdraw/:email/:withdrawAmt', function(req,res){
    dal.findOne(req.params.email).then((usr)=>{
        //    console.log("FindOne (usr)", usr);
        //     newBal=Number(usr.balance)+Number(req.params.depositAmt);
        //     // console.log(`User: ${usr.name} and new balance is: ${newBal+Number(req.params.depositAmt)}`)
        //     console.log(`newBal: ${req.params.email}, ${newBal}`)

        var bal = Number(usr.balance)-Number(req.params.withdrawAmt);
        console.log(`bal: ${bal}`);
        dal.update(usr.email,bal)
        .then((user) => {
            
            res.send(user);
            
        }); 
        console.log(`Final update:`, usr);
        });
});

// balance
app.get('/account/:email', function(req,res){
    dal.findOne(req.params.email).then((usr)=>{
        //    console.log("FindOne (usr)", usr);
        //     newBal=Number(usr.balance)+Number(req.params.depositAmt);
        //     // console.log(`User: ${usr.name} and new balance is: ${newBal+Number(req.params.depositAmt)}`)
        //     console.log(`newBal: ${req.params.email}, ${newBal}`)
            res.send(usr);
        });
});

//all accounts
app.get('/account/all', function(req,res){
    dal.all().then((docs)=>{
        console.log(docs);
        res.send(docs);
    }) 
});

var port =3000;
app.listen(port);
console.log('Running on port:' + port);