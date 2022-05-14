const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db    = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err,client){
    console.log('Connected successfully to the server!');

    //database name
    const dbName = 'myproject';
    db = client.db(dbName);
});

    //Create new user
    function create(name,email,password){
        return new Promise((resolve,reject) => {
            const collection = db.collection('users');
            const doc = {name, email,password,balance:0};
                //insert into customer table
            collection.insertOne(doc,{w:1}, function(err, result){
                 err ? reject(err) : resolve(doc);
             });
        });
    }


// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $set: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

    //read from database all users
    function all(){
        return new Promise((resolve, reject) => {
            const customers = db
            .collection('users')
            .find({})
            .toArray(function(err,docs){
                err ? reject(err) : resolve(docs);

                //clean up
                //client.close();
            });
            
        });
    }
    
    module.exports = {create, findOne, find, update, all};