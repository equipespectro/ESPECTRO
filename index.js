if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const script = require("./js/script.js");
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
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
app.use(express.urlencoded({ extended: false})) 
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

app.post('/login', passport.authenticate('local', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/cadastro', (req, res) => {
  res.render('cadastro.ejs')
});

app.post('/cadastro', async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch{ 
    res.redirect('register')
  }
  console.log(users)
});

/********************************************/


app.get('/inicio',(req, res) => {
  res.render('layout.ejs',{
    name: req.user.name,
    pagina:"inicio",
    script:"script",
  });
});

app.get('/calendario',(req, res) => {
  res.render('layout.ejs',{ 
    pagina: "calendario",
    script:"script",
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
      pagina:"tarefas",
      tarefas:tarefas,
      script:script,
    });
  });
});

app.get('/tarefa', (req, res) => {
  // console.log(req.originalUrl);

  const _id = req.originalUrl.split('id=')[1];
  fs.readFile('./tarefas.txt', 'utf8', (err, data) => {
    if(err){
      throw err;
    }

    let _tarefas = JSON.parse(data);

    // console.log(_tarefas[_id]);
    res.render('layout.ejs',{
      pagina:"tarefas",
      tarefas:_tarefas,
      script:script,
      nomeModal:"tarefaEscolhida",
      tarefa:_tarefas[_id],
    });
  });
});

app.get('/novaTarefa', (req, res) =>{
  res.render('layout.ejs',{
    pagina:"tarefas",
    nomeModal:"novaTarefa",
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

    res.render('layout.ejs',{
      pagina:"tarefas",
      nomeModal:"editaTarefa",
      tarefa:tarefas[_id],
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

      res.render('layout.ejs',{
        pagina:"tarefas",
        tarefas:tarefas,
        script:script,
      });
    });
  });
});

app.post('/criaTarefa', (req, res) =>{
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
  _tarefas = script.adicionaTarefa({...req.body});
  script.salvaTarefas();

    res.render('layout.ejs',{
      pagina:"tarefas",
      tarefas:_tarefas,
      script:script,
    });
  });
})

app.post('/editaTarefa', (req, res) =>{
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
  _tarefas = script.alteraTarefa({...req.body}, _tarefas);
  script.salvaTarefas();

    res.render('layout.ejs',{
      pagina:"tarefas",
      tarefas:_tarefas,
      script:script,
    });
  });
});


app.listen(3000, () => {
  console.log('server started');
});