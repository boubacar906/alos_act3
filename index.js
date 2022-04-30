const express = require('express')
const app = express()
const db = require('./db.json')
const versionRouter = require('express-version-route')
var router  = express.Router()
const routesMap = new Map()
var jwt = require('jsonwebtoken')
// token qui expires au bout d'une heure
var token = jwt.sign({ 
    data: 'foobar'
}, 'secret',{expiresIn: '1h'})
//middleware
app.use(express.json)
//chemin db 
app.get('/db', (req,res)=>{
    res.status(200).json(db)
})
app.get('/db/:id', (req,res)=>{
    const id = parseInt(req.params._id)
    const personne =db.find(personne => personne.id === id)
    res.status(200).json(personne)
})


app.put('/db/:id', (req,res) => {
    const id = parseInt(req.params._id)
    let personne = db.find(personne => personne.id === id )
    personne.name = req.body.name,
    personne.city = req.body.city,
    personne.gender = req.body.gender
    res.status(200).json(db)
})

app.post('/db',(req,res) => {
    db.push(req.body)
    res.status(200).json(db)
})

app.delete('/db/:id', (req,res) => {
    const id = parseInt(req.params._id)
    let personne = db.find(personne => personne.id === id)
    db.splice(db.indexOf(personne),1)
    res.status(200).json(db)
})

app.listen(8080, ()=>{
    console.log('serveur en attente')
})

routesMap.set('1.0', (req, res, next) => {
    return res.status(200).json({'message': 'hello to you version 1.0'})
  })

router.get('/db', versionRouter.route(routesMap))
/*
import cors from "cors";
import passport from "passport";
import routes from "./api/route.js";
import dotenv from "dotenv";
import { applyPassportStrategy } from "./store/passport.js";


dotenv.config();
app.use(cors());
app.use(passport.initialize());
applyPassportStrategy(passport);

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/", routes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening to port");
});
export default app;*/