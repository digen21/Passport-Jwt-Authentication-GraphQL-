import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const uri = process.env.URL as string;

import { ApolloServer } from 'apollo-server-express';;
import { userTypes as typeDefs} from './graphql/typeDefs';
import {resolvers} from './graphql/resolvers'


//JWT Passport
import jwtPassportAuth from './middleware/passportAuth';


const PORT = process.env.PORT || 8080;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect(uri);               //Add Your Connection String
const db = mongoose.connection;

db.on("error", ()=> console.log("DB Connection Error"));
db.once("open", ()=>{console.log("DB Connected");
});


jwtPassportAuth(app);
app.use(passport.initialize());



async function startServer(){
    
    const server = new ApolloServer({typeDefs, resolvers});
    await server.start();
    server.applyMiddleware({app});
    app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}/graphql`)})
    
}

startServer();
