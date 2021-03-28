const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
const ejs = require('ejs');
let db, dbConnectionStr = 'mongodb+srv://sid:7rY4MvluSglxsJQ9@cluster0.rhbsx.mongodb.net/bands?retryWrites=true&w=majority';
let dbName = 'bands';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', (req, res) => {
    db.collection('mybands').find().toArray()
    .then(data => {
        res.render('index.ejs', {info: data});
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/addBand', urlencodedParser, (req, response) => {
    db.collection('mybands').insertOne(req.body)
    .then(res => {
        console.log('Band has been added');
        response.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    })
});

app.delete('/delete', (req, response) => {
    db.collection('mybands').deleteOne({name: req.body.name})
    .then((result)=>{
        response.json({message: 'Band deleted'});
    })
    .catch(err => {
        console.log(err);
    })
});

app.listen(process.env.PORT || PORT, (e) => {
    if(e) console.log(e);
    else{
        console.log('PORT RUNNING AT ' + PORT);
    }
});