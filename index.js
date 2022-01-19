if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
/*
// Import the functions you need from the SDKs you need
var firebase = require("firebase/app");
require("firebase/firestore");

require("firebase/auth");
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCc0CP1kitkYn6uNxSuofaenJy3GMHs-q4",
    authDomain: "espectro-76402.firebaseapp.com",
    projectId: "espectro-76402",
    storageBucket: "espectro-76402.appspot.com",
    messagingSenderId: "264375045825",
    appId: "1:264375045825:web:4e9105a3c8f517eb99ce40",
    measurementId: "G-2HQMJ1FRXC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseConfig)
console.log(auth)

*/

var admin = require("firebase-admin");


var serviceAccount = require("./js/espectro-76402-firebase-adminsdk-gg8ey-142b3a60b1.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const script = require("./js/script.js");
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config');
//const { getAuth } = require('firebase/auth');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.render('login.ejs', {
        pagina: 'login',
        script: 'script',
    })
})


/**************SISTEMA DE CADASTRO**********/
app.get('/login', (req, res) => {
    res.render('login.ejs')
});

app.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/");
});

app.post('/login', async(req, res) => {
    try {
        console.log("Requisicao chamada : /login")
        res.redirect('/inicio')

    } catch (ex) {
        res.redirect('/login')
        throw ex;
    }
    //  successRedirect: '/inicio',
    // failureRedirect: '/login',
    // failureFlash: true
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs')
});

app.get('/recover', (req, res) => {
    res.render('recover.ejs')
});



app.post('/cadastro', function(req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let displayName = req.body.name;

    admin.auth().createUser({
            email,
            emailVerified: false,
            password,
            displayName
        })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid, userRecord.displayName, userRecord.email);
            res.redirect('/login')
        })
        .catch(function(error) {
            console.log('Error creating new user:', error);
            res.redirect('register')
        });
});
/********************************************/


app.get('/inicio', (req, res) => {
    console.log("Requisicao chamada : /inicio")
    res.render('layout.ejs', {

        name: "Teste",
        pagina: "inicio",
        script: "script",
    });
});

app.get('/calendario', (req, res) => {
    res.render('layout.ejs', {
        pagina: "calendario",
        script: "script",
    });
});

app.get('/tarefas', (req, res) => {
    // console.log(script.pegaTarefas());
    // console.log(req.body);
    let tarefas = {};

    fs.readFile('./tarefas.txt', "utf8", (err, data) => {
        if (err) {
            console.warn(err);
            throw err;
        }
        if (data) {
            tarefas = JSON.parse(data);
        }

        // console.log(tarefas);

        // console.log(req.body.id);


        // script.adicionaTarefa({...tarefas});
        // script.salvaTarefas();
        res.render('layout.ejs', {
            pagina: "tarefas",
            tarefas: tarefas,
            script: script,
        });
    });
});

app.get('/tarefa', (req, res) => {
    // console.log(req.originalUrl);

    const _id = req.originalUrl.split('id=')[1];
    fs.readFile('./tarefas.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        let _tarefas = JSON.parse(data);

        // console.log(_tarefas[_id]);
        res.render('layout.ejs', {
            pagina: "tarefas",
            tarefas: _tarefas,
            script: script,
            nomeModal: "tarefaEscolhida",
            tarefa: _tarefas[_id],
        });
    });
});

app.get('/novaTarefa', (req, res) => {
    res.render('layout.ejs', {
        pagina: "tarefas",
        nomeModal: "novaTarefa",
    });
})

app.get('/editaTarefa', (req, res) => {
    const _id = req.originalUrl.split('id=')[1];

    fs.readFile('./tarefas.txt', "utf8", (err, data) => {
        let _tarefas = {};
        if (err) {
            console.warn(err);
            throw err;
        }
        if (data) {
            tarefas = JSON.parse(data);
        }

        // console.log(tarefas[_id]);

        res.render('layout.ejs', {
            pagina: "tarefas",
            nomeModal: "editaTarefa",
            tarefa: tarefas[_id],
        });
    });
});

app.get('/removeTarefa', (req, res) => {
    const _id = req.originalUrl.split('id=')[1];

    fs.readFile('./tarefas.txt', "utf8", (err, data) => {
        let _tarefas = {};
        if (err) {
            console.warn(err);
            throw err;
        }

        tarefas = JSON.parse(data);

        delete tarefas[_id];

        const _txtTarefas = JSON.stringify(tarefas);

        fs.writeFile("./tarefas.txt", _txtTarefas, err => {
            if (err) {
                console.warn(err);
                throw err;
            }

            // console.log("Tarefas salvas");

            res.render('layout.ejs', {
                pagina: "tarefas",
                tarefas: tarefas,
                script: script,
            });
        });
    });
});

app.post('/criaTarefa', (req, res) => {
    fs.readFile('./tarefas.txt', "utf8", (err, data) => {
        let _tarefas = {};
        if (err) {
            console.warn(err);
            throw err;
        }
        if (data) {
            tarefas = JSON.parse(data);
        }
        // const tarefas = script.pegaTarefas();

        // console.log(req.body);
        _tarefas = script.adicionaTarefa({...req.body });
        script.salvaTarefas();

        res.render('layout.ejs', {
            pagina: "tarefas",
            tarefas: _tarefas,
            script: script,
        });
    });
})

app.post('/editaTarefa', (req, res) => {
    fs.readFile('./tarefas.txt', "utf8", (err, data) => {
        let _tarefas = {};
        if (err) {
            console.warn(err);
            throw err;
        }
        if (data) {
            _tarefas = JSON.parse(data);
        }
        // const tarefas = script.pegaTarefas();

        // console.log(req.body);
        console.log(_tarefas);

        console.log(req.body);
        _tarefas = script.alteraTarefa({...req.body }, _tarefas);
        script.salvaTarefas();

        res.render('layout.ejs', {
            pagina: "tarefas",
            tarefas: _tarefas,
            script: script,
        });
    });
});



app.listen(3000, () => {
    console.log('server started');
});