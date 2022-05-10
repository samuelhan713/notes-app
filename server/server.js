const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');
const MongoStore = require('connect-mongo'); // MongoDB session store
const session = require('express-session');
const {isLoggedIn, isAgent} = require('./middleware/auth');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

var dbURL = process.env.MONGO_URL || 'mongodb+srv://samuelhan:BON28qGBTQL8ZKfK@cluster0.iln76.mongodb.net/test'; 
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const sessionSecret = 'make a secret string';

const store = MongoStore.create({
    mongoUrl: dbURL,
    secret: sessionSecret,
    touchAfter: 24 * 60 * 60
})

// Setup to use the express-session package
const sessionConfig = {
    store,
    name: 'session',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.use(session(sessionConfig));


function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.post('/authors/:id/file', upload.single('image'), wrapAsync(async function (req, res) {
    console.log("File uploaded of length: " + req.file.size);
    console.dir(req.file);
    res.json("File uploaded successfully");
}));

//NOTES ---------------------
//get all notes
app.get('/api/notes', isLoggedIn, wrapAsync(async function (req,res) {
    const notes = await Note.find({"agent": req.session.userId});
    res.json(notes);
}));

app.get('/api/notes/:userId', isLoggedIn, isAgent, wrapAsync(async function (req, res) {
    let userId = req.params.userId;
    const notes = await Note.find({agent: userId});
    res.json(notes);
}))

//get note with specific ID
app.get('/api/notes/:id', isAgent, isLoggedIn, wrapAsync(async function (req,res, next) {
    let id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
        const note = await Note.findById(id);
        if (note) {
            res.json(note);
            return;
        } else {
            throw new Error('Note Not Found');
        }
    } else {
        throw new Error('Invalid Note Id');
    }
}));

//create a new note
app.post('/api/notes', isLoggedIn, wrapAsync(async function(req, res) { 
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        const newNote = new Note({
            text: req.body.text,
            lastUpdatedDate: req.body.lastUpdatedDate,
            agent: req.session.userId,
        })
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400).send(error.message);
    }
}));

//delete a note
app.delete('/api/notes/:id', isLoggedIn, wrapAsync(async function (req,res) {
    const id = req.params.id;
    Note.findByIdAndDelete(id,
        null,
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                console.log("Deleted successfully: " + result);
                res.json(result);
            }
        });
}));

//update a note
app.put('/api/notes/:id', isLoggedIn, wrapAsync(async function (req,res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    Note.findByIdAndUpdate(id,
        {'text': req.body.text, 'lastUpdatedDate': req.body.lastUpdatedDate, 'noteTags': req.body.noteTags},
        console.log("middle of updating note on server"),
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                res.sendStatus(204);
            }
        }, {runValidators: true});
    console.log("end of the updating note on server");
}));




//USERS ---------------
app.post('/api/register', wrapAsync(async function (req, res) {
    const {password, email, name, profileImageUrl, colorScheme} = req.body;
    const user = new User({email, password, name, profileImageUrl, colorScheme})
    await user.save();
    req.session.userId = user._id;
    res.json(user);
}));

app.post('/api/login', wrapAsync(async function (req, res) {
    const {password, email} = req.body;
    const user = await User.findAndValidate(email, password);
    if (user) {
        console.log("login success");
        req.session.userId = user._id;
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
}));

app.post('/api/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
}));

//get all users
app.get('/api/users', async function (req, res) {
    const users = await User.find({"_id": req.session.userId});
    console.log("user in sever.js: ");
    console.dir(users);
    res.json(users);
})

app.get('/api/users/:id', async function (req,res) {
    let id = req.params.id;
    if( mongoose.isValidObjectId(id) ) {
        const user = await User.findById(id);
        if( user ) {
            res.json(user);
            return;
        }
    }

    console.log("No user with id: " + id);
    res.status(404);
    res.send("No user with id: " + id);
});

//create new user
app.post('/api/users', isAgent, isLoggedIn, wrapAsync(async function (req,res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profileImageUrl: req.body.profileImageUrl,
            colorScheme: req.body.colorScheme,
        })
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400).send(error.message);
    }
}));

//update user info
app.put('/api/users/:id', isLoggedIn, wrapAsync(async function (req,res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    User.findByIdAndUpdate(id,
        {'name': req.body.name, 'email': req.body.email, 'password': req.body.password, 'profileImageUrl': req.body.profileImageUrl, 'colorScheme': req.body.colorScheme},
        console.log("middle of updating user on server"),
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                res.sendStatus(204);
            }
        }, {runValidators: true});
    console.log("end of the updating user on server");
}));

//delete a user
app.delete('/api/users/:id', isAgent, isLoggedIn, wrapAsync(async function (req,res) {
    const id = req.params.id;
    User.findByIdAndDelete(id,
        null,
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                console.log("Deleted successfully: " + result);
                res.json(result);
            }
        });
}));

app.use((err, req, res, next) => {
    console.log("Error handling called " + err);
    res.statusMessage = err.message;

    if (err.name === 'ValidationError') {
        res.status(400).end();
    } else {
        res.status(500).end();
    }
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})