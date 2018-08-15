/**Dependances init  */

const express = require('express');
const _ = require('lodash');
const { SHA256 } = require('crypto-js');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { Ads } = require('./db/models/Ads');
const jwt = require('jsonwebtoken');
var { Users } = require('./db/models/User');
var { authenticate } = require('./middleware/authenticate');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


/**Dependances init End  */

/**Middleware And Some Config */


const app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 8000;
var server = http.createServer(app);
var publicPath = path.join(__dirname, '/public');
var io = socketIO(server);
app.use(express.static(publicPath));
app.set("view engine", "hbs");

const tokenPass = process.env.tokenPass || 'abc123';
const hashPass = process.env.hashPass || '@#someword';
var url = process.env.webUrl || 'http://localhost:8000';

/**Middleware And Some Config END */

/**All The Routes And Setting */

//SIGNUP PAGE + MONGODB
app.get('/signup', (req, res) => {
    res.render('signup.hbs', { url })
});
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'name']);
    var user = new Users(body);
    console.log('im here')
    body.password = SHA256(JSON.stringify(body.password) + hashPass).toString();

    // console.log(body);

    user.save().then(result => {
        if (!result) {
            return res.status(404).send('Some Went wrong')
        }
        //now pushing token in user body
        var access = 'auth';
        var token = jwt.sign({ _id: result._id.toHexString(), access }, tokenPass).toString();
        body.tokens = [];
        body.tokens.push({ access, token });
        body._id = result._id
        //updating user body
        Users.findByIdAndUpdate(body._id, { $set: body }, { new: true }).then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            var dataToSend = _.pick(result, ['email', '_id', 'name']);
            res.header('x-auth', token).send(dataToSend);
        }, err => {
            res.status(404).send();
        })
    }).catch(err => {
        res.status(404).send(err);
    })
});
//SIGNUP PAGE + MONGODB END

//To Get user info

app.get('/users/me', authenticate, (req, res) => {
    console.log('working');
    res.send(req.user);
    // res.send('hi there')
});
//To Get user info END



//SIGN IN PAGE + MONGODB
app.get('/signin', (req, res) => {
    res.render('signin.hbs', { url })
});
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    console.log(body);
    Users.findOne({ email: body.email }).then(result => {
        if (!result) {
            return res.status(401).send();
        }
        var reqPass = SHA256(JSON.stringify(body.password) + hashPass).toString();
        var userPass = result.password;
        if (reqPass !== userPass) {
            console.log("Something is Wrong");
            return res.status(401).send();
        }
        var access = 'auth';
        var token = jwt.sign({ _id: result._id.toHexString(), access }, tokenPass).toString();
        body = result
        body.tokens.push({ access, token });

        // updating user body
        Users.findByIdAndUpdate(body._id, { $set: body }, { new: true }).then((result) => {
            if (!result) {
                return res.status(404).send();
            }
            res.header('x-auth', token).send(result);
        }, err => {
            res.status(404).send();
        });
    }).catch(err => {
        res.status(401).send(err);

    });
});
//SIGN IN PAGE + MONGODB END

//Add Post PAGE + MONGODB
app.get('/postAd', (req, res) => {
    res.render('post-add.hbs', { url })
});
app.post('/postAd', authenticate, (req, res) => {
    var body = req.body;
    // console.log(body);

    var ad = new Ads(body);
    ad.save().then(doc => {
        console.log("Sucessfull :", doc);
        res.send(doc)
    }, err => {
        console.log("Something Went Wrong :", err);
        res.status(400).send(err);

    });
});

//Add Post PAGE + MONGODB END




// Retive Ads Main Page
app.get('/', (req, res) => {
    res.render('index.hbs', { url })
});
app.get('/data', (req, res) => {
    Ads.find({
    }).then((ads) => {
        res.send(ads)
    }, err => {
        res.send(err);
    });
});
//Retrive Ads Main Page END

// Retive Ads In Single Page
app.get('/addPage', (req, res) => {
    res.render('addPage.hbs', { url })
});
app.get('/addPage/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("id is Not Valid");
    }
    Ads.findOne({
        _id: id
    }).then((ads) => {
        res.send(ads)
    }, err => {
        res.send(err);
    });
});
//Retrive Ads In Single Page END

//category Page 
app.get('/category', (req, res) => {
    res.render('category.hbs', { url })
});
app.post('/category', (req, res) => {
    console.log(req.body);
    var category = req.body.categoryName;
    Ads.find({
        category: category
    }).then((ads) => {
        res.send(ads)
    }, err => {
        res.send(err);
    });
});
//catogry Page END



//Search bar using Index test 
app.get('/search', (req, res) => {
    res.render('search.hbs');
});
app.post('/search', (req, res) => {
    console.log(req.body);
    var item = req.body.item
    Ads.find({ $text: { $search: item } })
    .then(data => res.send(data));
    // res.render('search.hbs');
})


//Search bar using Index test END







server.listen(port, () => {
    console.log(`App Running On Port ${port}`);
});
/**All The Routes And Setting END */




