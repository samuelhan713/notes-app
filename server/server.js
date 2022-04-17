const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('./models/notes');
const User = require('./models/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

/* const bodyParser = require('body-parser');
app.use(bodyParser.json()); */

var dbURL = process.env.MONGO_URL || 'mongodb://localhost:27017/Notes'; // insert your database URL here
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

//NOTES
//get all notes
app.get('/api/notes', async function (req,res) {
    const notes = await Note.find({});
    res.json(notes);
});

//get notes with specific ID
app.get('/api/notes/:id', wrapAsync(async function (req,res, next) {
    let id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
        const note = await Note.findById(id);
        if (note) {
            res.json(note);
            return;
        } else {
            // The thrown error will be handled by the error handling middleware
            throw new Error('Note Not Found');
        }
    } else {
        throw new Error('Invalid Note Id');
    }
}));

//create a new note
app.post('/api/notes', async function(req, res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        const newNote = new Note({
            text: req.body.text,
            lastUpdatedDate: req.body.lastUpdatedDate ,
        })
        // Calling save is needed to save it to the database given we aren't using a special method like the update above
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400).send(error.message);
    }
})

//delete a note
app.delete('/api/notes/:id', async function (req,res) {
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
});

//update a note
app.put('/api/notes/:id', async function (req,res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    Note.findByIdAndUpdate(id,
        {'text': req.body.text},
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                // Status 204 represents success with no content
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
                res.sendStatus(204);
            }
        });
});


//USERS ---------------
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

app.post('/api/users', async function (req,res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        const newUser = new User({
            name: /* req.body.name */"Sam",
            email: req.body.email,
            colorScheme: req.body.colorScheme,
        })
        // Calling save is needed to save it to the database given we aren't using a special method like the update above
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400).send(error.message);
    }
});

app.put('/api/users/:id', async function (req,res) {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    User.findByIdAndUpdate(id,
        {'name': req.body.name, "email": req.body.email},
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                // Status 204 represents success with no content
                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
                res.sendStatus(204);
            }
        });
});

app.delete('/api/users/:id', async function (req,res) {
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
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})